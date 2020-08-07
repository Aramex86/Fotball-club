import React from "react";
import Layout from "./HOC/Layout";
import Home from "./componets/Home/Home";
import SingIn from "./componets/SingIn/SingIn";
import Dashboard from "./componets/Admin/Dashboard";
import { Switch } from "react-router-dom";
import PrivateRoute from "./componets/AuthRoutes/PrivateRouts";
import PublicRoutes from './componets/AuthRoutes/PublicRoutes';

const App = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />

        {/* <Route exact component={Dashboard} path='/dashboard'/> */}
        {/* <Route exact component={SingIn} path="/sign-in" /> */}
        <PublicRoutes {...props} restricted={true} path="/sign-in" exact component={SingIn}/>
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home}/>
        {/* <Route exact component={Home} path="/" /> */}
      </Switch>
    </Layout>
  );
};
export default App;
