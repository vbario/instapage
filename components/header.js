import React from 'react';
import styles from './header.scss';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

var Header = React.createClass({
  render: function() {
    return  <div>
      <div className={ styles.header } >
        <div className={ styles.brand }>
          { this.props.user !== null ? <div onClick={ ()=>this.createNewPage('/mypages') }>Instant Pages</div> : <div onClick={ () => this.props.noSignUpSwitch(true) }>Instant Pages</div> }          
          
        </div>
        <div className={ styles.actions }>
          { this.props.user !== null ? <div onClick={ ()=>this.createNewPage('/') }>Create New Page</div> : <div onClick={ () => this.props.noSignUpSwitch(true) }>Create New Page</div> }          
          <br />
          { this.props.user !== null ? <Link to='/mypages'>My Pages</Link> : <div onClick={ () => this.props.noSignUpSwitch(false) }>Login</div>}
        </div>
      </div>

    </div>
  },

  createNewPage: function(nextPage) {
    this.props.setCurrentPage(null);
    browserHistory.push(nextPage);
  }


});

module.exports = Header;
/* <Link to='/page'>Create new Page</Link> */