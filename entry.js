var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


// Include your React components like this:
import App from './components/app';
import PageList from './components/page_list';
import EditPage from './components/edit_page';
import ShowPage from './components/show_page';

ReactDOM.render(<Router history={browserHistory}>
  <Route path='/' component={ App }>
    <IndexRoute component={ PageList } />
    <Route path='page' component={ EditPage } />    
    <Route path='edit/:id' component={ EditPage } />
    /*<Route path=':id' component={ ShowPage } />*/
  </Route>
  <Route path='/:id' component={ App } />
</Router>, document.getElementById("placeholder"));
