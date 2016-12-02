import React from 'react';
import styles from './header.scss';
import { Link } from 'react-router';

var Header = React.createClass({
  render: function() {
    return  <div>
      <div className={ styles.header } >
        <div className={ styles.brand }>
          <Link to='/'>Instant Pages</Link>
        </div>
        <div className={ styles.actions }>
          <Link to='/page'>Create new Page</Link>
        </div>
      </div>

    </div>
  }
});

module.exports = Header;
