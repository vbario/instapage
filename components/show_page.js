import React from 'react';
import $ from 'jquery';
import styles from './show_page.scss';
import { browserHistory } from 'react-router';

var ShowPage = React.createClass({
  getInitialState: function() {
    console.log("Page: ", this.props.page);
    var emptyPage = {
      title: '',
      //location: '',
      user: '',
      description: '',
      image: '',
      imageLink: '',
      buttonText: '',
      buttonLink: ''
    }
    //if (this.props.params.id) {      
      //console.log("ID: ", this.props.params.id);
      // console.log("Pages: ", this.props.pages);
      // var page = this.props.pages.find((page) => page._id == this.props.params.id);
      var page = this.props.page;
      console.log("Page: ", page);
      return {        

        page: page || emptyPage,
        errors: {}
      }
    // } else {
    //   return {        
    //     page: emptyPage,
    //     errors: {}
    //   }
    // }
  },

  render: function() {
    return  <div className={ styles.showPage }>
        <h1 className={ styles.title }>{ this.state.page.title }</h1>        
        <div className={ styles.image }><a href={ this.state.page.imageLink }><img src={ this.state.page.image } /></a></div>
        <div className={ styles.description}>{ this.state.page.description }</div>
        <div className={ styles.button } ><a href={ this.state.page.buttonLink }>{ this.state.page.buttonText }</a></div>
        
    </div>
  },

  componentDidMount: function() {    
    console.log("ID: ", this.props.id);
    $.get('/api/pages/'+ this.props.id, (data) => this.setState({page: data}));
    
  }
});

module.exports = ShowPage;
