import React from 'react';
import styles from './edit_page.scss'

var Field = ({ label, value, onChange, name, error, type }) => <div className={ styles.field }>
  <label>{ label }</label>
  <input type={ type } value={ value } name={ name } onChange={ onChange } />
  { error ? <div className={ styles.error }>{ error.message }</div> : null }
</div>

export default Field;
