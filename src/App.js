import './App.css';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import { history } from './models/history';
import { lazy, Suspense } from 'react';
import jwt from 'jsonwebtoken'
import { deleteToken } from './actions/courseAction';
const UserRoutesCompnent = lazy(() => {
  return import('./Routes/UserRoutesComponent')
})
const AdminRoutesComponent = lazy(() => {
  return import('./Routes/AdminRouteComponent')
})
function App() {
  //react Lazy load
  return (
    <Router history={history}>
      <Suspense fallback={""}>
        <Switch>
          <Route path='/admin' component={AdminRoutesComponent} />
          <Route path='/' component={UserRoutesCompnent}/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
