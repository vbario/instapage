import React from 'react';
import Header from './header';
import styles from './app.scss';
import $ from 'jquery';
import Login from './login';
import ShowPage from './show_page';

var App = React.createClass({
  getInitialState: function() {
    return {
      pages: [],
      user: null,
      // currentPage: null
      noSignUp: true,
      currentPage: {
        title: '',
        //location: '',
        user: '',
        description: '',
        image: '',
        imageLink: '',
        buttonText: '',
        buttonLink: ''
      }
    }
  },

  render: function() {
    console.log("Current User: ", this.state.user);
    console.log("this.props.params: ", this.props.params);
    console.log("this.props.params.id: ", this.props.params.id);
    console.log("this.props.children: ", this.props.children);
    if ((typeof this.props.params.id !== 'undefined') && (this.props.children == null)) {
      return <ShowPage page={ this.state.currentPage } id={ this.props.params.id } />;    
    } else {      
      return <div>
        <Header user={ this.state.user }
                noSignUpSwitch={ this.noSignUpSwitch }
                setCurrentPage={ this.setCurrentPage } 
                />
       
        { (!this.state.noSignUp) ? <Login onLogin={ this.userLoggedIn } /> :  <div className={ styles.container } >
        { React.cloneElement(this.props.children, {
          pages: this.state.pages,
          onRefresh: this.refresh,
          user: this.state.user,
          noSignUpSwitch: this.noSignUpSwitch,
          onLogin: this.userLoggedIn,
          setCurrentPage: this.setCurrentPage,
          currentPage: this.state.currentPage
        })}</div>}
        
        
      </div>    
    }

    
  },
  setCurrentPage: function(page) {
    if (page == null) {
      page = {
        title: '',
        //location: '',
        user: '',
        description: '',
        image: '',
        imageLink: '',
        buttonText: '',
        buttonLink: ''
      };
    }
    this.setState({currentPage: page});
  },
  noSignUpSwitch: function(what) {    
    this.setState({noSignUp: what});    
  },

  userLoggedIn: function(user) {
    if (this.state.noSignUp) {
      this.setState({ user: user });  
    } else {
      this.setState({ user: user, noSignUp: true }, this.refresh);
    }    
  },

  refresh: function() {
    $.get('/api/pages', (data) => this.setState({pages: data, noSignUp: true}));
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
