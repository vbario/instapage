import React from 'react';
import $ from 'jquery';
import styles from './edit_page.scss'
import { browserHistory } from 'react-router';
import Field from './field.js';

var EditPage = React.createClass({
  getInitialState: function() {
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
    if (this.props.params.id) {
      var page = this.props.pages.find((page) => page._id == this.props.params.id);
      return {
        isEditing: true,
        page: page || emptyPage,
        errors: {}
      }
    } else {
      return {
        isEditing: false,
        page: emptyPage,
        errors: {}
      }
    }
  },

  render: function() {
    return  <div className={ styles.editor }>
      <Field label="Title" value={ this.state.page.title } name='title' onChange={ this.updateField } error={ this.state.errors.title } />
      <Field label="Description" value={ this.state.page.description } name='description' onChange={ this.updateField } error={ this.state.errors.description } />
      <Field label="Image URL" value={ this.state.page.image } name='image' onChange={ this.updateField } error={ this.state.errors.image } />
      <Field label="Image Link" value={ this.state.page.imageLink } name='imageLink' onChange={ this.updateField } error={ this.state.errors.imageLink } />
      <Field label="Button" value={ this.state.page.buttonText } name='buttonText' onChange={ this.updateField } error={ this.state.errors.buttonText } />
      <Field label="Button Link" value={ this.state.page.buttonLink } name='buttonLink' onChange={ this.updateField } error={ this.state.errors.buttonLink } />
      <button onClick={ this.save }>Save</button>
    </div>
  },

  save: function() {
    if (this.state.isEditing) {
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
      data: JSON.stringify(this.state.page),
      success: () => {
        this.props.onRefresh();
        browserHistory.push('/');
      },
      error: (err) => {
        this.setState({ errors: err.responseJSON.errors });
      }
    });
  },

  updateField: function(evt) {
    var page = this.state.page;
    page[evt.target.name] = evt.target.value;
    this.setState({page: page});
  }
});

module.exports = EditPage;
