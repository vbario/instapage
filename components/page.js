import React from 'react';
import styles from './page.scss';
import { Link } from 'react-router';

var Page = React.createClass({
  render: function() {
    return  <div className={ styles.column } >
      <div className={ styles.page }>
        <div className={ styles.title }>{ this.props.title }</div>        
        <div className={ styles.image }><a href={ this.props.imageLink }><img src={ this.props.image } /></a></div>
        <div className={ styles.description}>{ this.props.description }</div>
        <div className={ styles.button } ><a href={ this.props.buttonLink }>{ this.props.buttonText }</a></div>
        <div className={ styles.actions }>
          <Link to={ '/edit/' + this.props.id }>Edit |</Link>
          <a href={ this.props.id }> View |</a>
        </div>
      </div>
    </div>
  }
});

module.exports = Page;
