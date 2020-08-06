import React from 'react'
import Layout from './HOC/Layout';
import Home from './componets/Home/Home';
import SingIn from './componets/SingIn/SingIn';
import Dashboard from './componets/Admin/Dashboard';
import {Switch , Route} from 'react-router-dom';

const App=(props)=> {
  return (
   <Layout>
     <Switch>
     <Route exact component={Dashboard} path='/dashboard'/>
        <Route exact component={SingIn} path='/sign-in'/>
        <Route exact component={Home} path='/'/>
     </Switch>
  </Layout>
  )
}
export default App;