import React from 'react';
import Header from './header';
import styles from './app.scss';
import $ from 'jquery';
import Login from './login';
import ShowPage from './show_page'

var App = React.createClass({
  getInitialState: function() {
    return {
      pages: [],
      user: null,
      currentPage: null
    }
  },

  render: function() {
    if (this.props.params.id) {
      return <ShowPage page={ this.state.currentPage } id={ this.props.params.id } />
    } else if (this.state.user !== null) {
      return  <div>
        <Header />
        { React.cloneElement(this.props.children, {
          pages: this.state.pages,
          onRefresh: this.refresh
        })}
      </div>
    } else{
      return <Login onLogin={this.userLoggedIn } />
    }

    
  },

  userLoggedIn: function(user) {
    this.setState({ user: user }, this.refresh);
  },

  refresh: function() {
    $.get('/api/pages', (data) => this.setState({pages: data}));
  },

  componentDidMount: function() {

    $.getJSON('/api/me', (user) => {
      this.userLoggedIn(user);      
    });
    // if (this.props.params.id) {
    //   this.refresh();
    //   var page = this.props.pages.find((page) => page._id == this.props.params.id);
    //   this.setState({currentPage: page});
    // }
  }
});

module.exports = App;
