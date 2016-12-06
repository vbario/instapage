var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


// Include your React components like this:
import App from './components/app';
import PageList from './components/page_list';
import EditPage from './components/edit_page';
import ShowPage from './components/show_page';

var page = {};
// routes that were used before
/*<Route path='page' component={ EditPage } />
<Route path=':id' component={ ShowPage } /> */
ReactDOM.render(<Router history={browserHistory}>
  <Route path='/' component={ App } page={ page }>
    <IndexRoute component={ EditPage } />
    <Route path='mypages' component={ PageList } />    
    <Route path='edit/:id' component={ EditPage } />    
  </Route>
  <Route path='/:id' component={ App } />
</Router>, document.getElementById("placeholder"));
