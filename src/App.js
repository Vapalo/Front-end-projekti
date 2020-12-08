import './App.css';
import Appbar from '@material-ui/core/AppBar'
import {BrowserRouter as Router,
Switch,
Route,
Link
} from 'react-router-dom'
import Home from './components/Home';
import Customerlist from './components/Customerlist';
import Trainings from './components/Trainings';

function App() {
  return (
    <div>
      <Router>
      <div className="topbar">
        <Appbar color="default" position="sticky">
      <h1>Personal rainer</h1>
      <Link to='/'>Home</Link>{' '}
      <Link to='/customerlist'>Customers</Link> {' '}
      <Link to='/trainings'>Trainings</Link> {' '}
     
      </Appbar>
      </div>
      <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/customerlist" component={Customerlist} />
        <Route path="/trainings" component={Trainings} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
      </div>
      </Router>
    </div>
  );
}

export default App;
