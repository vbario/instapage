import React from 'react';
import Field from './field';
import styles from './login.scss';
import $ from 'jquery';

var Login = React.createClass({
  getInitialState: function() {
    return {
      login: {
        mode: 'login',
        email: '',
        password: '',
        name: ''
      }
    }
  },

  render: function() {
    return <div className={ styles.container }>
      <div className={ styles.mode }>
        <label>
          <input type='radio' name='mode' value='login' onChange={ this.updateField } checked={ this.state.login.mode == 'login'} />
          Login
        </label>
        <label>
          <input type='radio' name='mode' value='signup' onChange={ this.updateField } checked={ this.state.login.mode == 'signup'} />
          Sign-up
        </label>
      </div>

      { this.state.login.mode == 'signup' ?
          <Field label="Name" name="name" value={ this.state.login.name } onChange={ this.updateField } /> : null
      }
      <Field label="E-mail" name="email" value={ this.state.login.email } onChange={ this.updateField } />
      <Field label="Password" type="password" name="password" value={ this.state.login.password } onChange={ this.updateField } />

      { this.state.error ? <div className={ styles.error }>{ this.state.error }</div> : null }

      <button onClick={ this.login }>Login</button>
    </div>
  },

  login: function() {
    var url;
    if (this.state.login.mode == 'login') {
      url = "/api/login";
    } else {
      url = "/api/signup";
    }

    $.ajax({
      method: 'POST',
      url: url,
      data: JSON.stringify(this.state.login),
      contentType: "application/json; charset=utf-8",
      success: (user) => {
        this.props.onLogin(user);
      },
      error: (err) => {
        this.setState({ error: "We couldn't log you in with those credentials." });
      }
    })
  },

  updateField: function(evt) {
    var login = this.state.login;
    login[evt.target.name] = evt.target.value;
    this.setState({login: login});
  }
})

module.exports = Login;
