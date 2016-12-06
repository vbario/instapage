import React from 'react';
import $ from 'jquery';
import styles from './edit_page.scss'
import { browserHistory } from 'react-router';
import Field from './field.js';

var EditPage = React.createClass({
  getInitialState: function() {
    console.log("Edit Page Params: ",this.props.params.id);
    if (typeof this.props.params.id !== 'undefined') {
      // console.log("Params: ",this.props.params.id);
      // var page = this.props.pages.find((page) => page._id == this.props.params.id);
      // this.props.setCurrentPage(this.props.pages.find((page) => page._id == this.props.params.id));
      return {
        isEditing: true,        
        errors: {},
        login: this.genEmptyLogin()
      }
    } else {
      return {
        isEditing: false,        
        errors: {},
        login: this.genEmptyLogin()
      }
    }

  },

  // genEmptyPage: function() {
  //   var emptyPage = {
  //     title: '',
  //     //location: '',
  //     user: '',
  //     description: '',
  //     image: '',
  //     imageLink: '',
  //     buttonText: '',
  //     buttonLink: ''
  //   };
  //   return emptyPage;
  // },

  genEmptyLogin: function() {
    var emptyLogin = {
      mode: 'signup',
      email: '',
      password: '',
      name: ''
    };
    return emptyLogin;
  },

  render: function() {
    // console.log("Current Page: ", this.props.currentPage);
    return  <div className={ styles.editor }>
      { this.props.user == null ? <Field label="Email" value={ this.state.login.email } name='email' onChange={ this.updateLoginField } error={ this.state.errors.email } /> : null }
      <Field label="Title" value={ this.props.currentPage.title } name='title' onChange={ this.updateField } error={ this.state.errors.title } />
      <Field label="Description" value={ this.props.currentPage.description } name='description' onChange={ this.updateField } error={ this.state.errors.description } />
      <Field label="Image URL" value={ this.props.currentPage.image } name='image' onChange={ this.updateField } error={ this.state.errors.image } />
      <Field label="Image Link" value={ this.props.currentPage.imageLink } name='imageLink' onChange={ this.updateField } error={ this.state.errors.imageLink } />
      <Field label="Button" value={ this.props.currentPage.buttonText } name='buttonText' onChange={ this.updateField } error={ this.state.errors.buttonText } />
      <Field label="Button Link" value={ this.props.currentPage.buttonLink } name='buttonLink' onChange={ this.updateField } error={ this.state.errors.buttonLink } />
      <button onClick={ this.save }>Save</button>
    </div>
  },

  save: function() {
    
    if (this.props.user) {
      this.createPage();
    } else {
      this.signupAndCreate();
    }     
    
  },

  signupAndCreate: function() {
    var url = "/api/signup";
    var newUser = null;
    var login = this.state.login;
    login.name = login.email;
    //implement random password of some sort here
    login.password = "RANDOMPASSWORD";

    $.ajax({
      method: 'POST',
      url: url,
      data: JSON.stringify(this.state.login),
      contentType: "application/json; charset=utf-8",
      success: (user) => {        
        console.log("User Sign Up: ", user);        
        this.props.onLogin(user);
        this.createPage();       
      },
      error: (err) => {
        console.log("We couldn't log you in with those credentials.");
        this.setState({ error: "We couldn't log you in with those credentials." });                        
      }
    })
    

  },

  createPage: function() {
    if (this.state.isEditing) {
      console.log("Is editing this: ", this.props.params.id);
      var url = '/api/pages/' + this.props.params.id;
      var method = 'PUT';
    } else {
      var url = '/api/pages';
      var method = 'POST';
    }

    $.ajax({
      method: method,
      url: url,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(this.props.currentPage),
      success: () => {
        this.props.setCurrentPage(null);
        this.setState({isEditing: false, login: this.genEmptyLogin() });
        this.props.onRefresh();
        browserHistory.push('/mypages');
      },
      error: (err) => {
        this.setState({ errors: err.responseJSON.errors });        
      }
    });
  },

  updateField: function(evt) {
    var page = this.props.currentPage;
    page[evt.target.name] = evt.target.value;
    this.setState({page: page});
  },
  updateLoginField: function(evt) {
    var login = this.state.login;
    login[evt.target.name] = evt.target.value;
    this.setState({login: login});
  },

  componentDidMount: function() {
    var id = '';
    if (typeof this.props.params.id !== 'undefined') {
      id = this.props.params.id;
      $.get('/api/pages/'+ id, (data) => this.props.setCurrentPage(data));
    } else if(typeof this.props.id !== 'undefined') {
      id = this.props.id;
      $.get('/api/pages/'+ id, (data) => this.props.setCurrentPage(data));
    };    
    this.props.noSignUpSwitch(true);
  },
  componentWillMount: function() {
    if (typeof this.props.params.id !== 'undefined') {      
      this.props.setCurrentPage(this.props.pages.find((page) => page._id == this.props.params.id));
    }
  }

});

module.exports = EditPage;
