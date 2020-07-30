import React from 'react'
import Layout from './HOC/Layout';
import Home from './componets/Home/Home';
import {Switch , Route} from 'react-router-dom';


const App=(props)=> {
  return (
   <Layout>
     <Switch>
        <Route exact component={Home} path='/'/>
     </Switch>
  </Layout>
  )
}
export default App;