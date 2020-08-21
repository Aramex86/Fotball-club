import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../HOC/AdminLayout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { dataPlayers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../common/ConvertFunction';

class AdminPlayers extends Component {
	state = {
		isLoading: true,
		players: [],
	};

	componentDidMount() {
		dataPlayers.once('value').then((snapshot) => {
			const players = firebaseLooper(snapshot);

			this.setState({
				isLoading: false,
				players: reverseArray(players),
			});
		});
	}
	render() {
		return (
			<AdminLayout>
				<div>
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell className="table_cell">First name</TableCell>
									<TableCell className="table_cell">Last name</TableCell>
									<TableCell className="table_cell">Number</TableCell>
									<TableCell className="table_cell">Position</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.players
									? this.state.players.map((player, i) => (
											<TableRow key={i}>
												<TableCell className="table_cell">
													<Link to={`/admin_players/add_players/${player.id}`}>
														{player.name}
													</Link>
												</TableCell>
												<TableCell className="table_cell">
													<Link to={`/admin_players/add_players/${player.id}`}>
														{player.lastname}
													</Link>
												</TableCell>
												<TableCell className="table_cell">{player.number}</TableCell>
												<TableCell className="table_cell">{player.position}</TableCell>
											</TableRow>
									  ))
									: null}
							</TableBody>
						</Table>
					</Paper>

					<div className="admin_progress">
						{this.state.isLoading ? <CircularProgress thickness={7} style={{ color: '#98c5e9' }} /> : ''}
					</div>
				</div>
			</AdminLayout>
		);
	}
}

export default AdminPlayers;
