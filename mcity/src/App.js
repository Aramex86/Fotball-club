import React from 'react';
import { Switch } from 'react-router-dom';
import Layout from './HOC/Layout';

import Home from './componets/Home/Home';
import SingIn from './componets/SingIn/SingIn';
import Dashboard from './componets/Admin/Dashboard';
import AdminMatches from './componets/Admin/Matches/Admin_matches';
import AddEditMatch from './componets/Admin/Matches/AddEditMatch';
import AdminPlayers from './componets/Admin/Players/AdminPlayers';
import AddEditPlayers from './componets/Admin/Players/AddEditPlayers';
import TheTeam from './componets/The-team/TheTeam';
import TheMatches from './componets/The_Matches/TheMatches';
import Notfound from './componets/NotFound/Notfound';


import PrivateRoute from './componets/AuthRoutes/PrivateRouts';
import PublicRoutes from './componets/AuthRoutes/PublicRoutes';

const App = (props) => {
	return (
		<Layout>
			<Switch>
				<PrivateRoute {...props} path="/admin_players" exact component={AdminPlayers} />
				<PrivateRoute {...props} path="/admin_players/add_players" exact component={AddEditPlayers} />
				<PrivateRoute {...props} path="/admin_players/add_players/:id" exact component={AddEditPlayers} />
				<PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
				<PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches} />

				<PrivateRoute {...props} path="/admin_matches/edit_match" exact component={AddEditMatch} />
				<PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch} />

				{/* <Route exact component={Dashboard} path='/dashboard'/> */}
				{/* <Route exact component={SingIn} path="/sign-in" /> */}
				<PublicRoutes {...props} restricted={true} path="/sign-in" exact component={SingIn} />
				<PublicRoutes {...props} restricted={false} path="/the_team" exact component={TheTeam} />
				<PublicRoutes {...props} restricted={false} path="/the_matches" exact component={TheMatches} />

				<PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
				<PublicRoutes {...props} restricted={false}  component={Notfound} />

				{/* <Route exact component={Home} path="/" /> */}
			</Switch>
		</Layout>
	); 
};
export default App;
