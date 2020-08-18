import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from './Table';
import MatchesList from './MatchesList';

import { dataBaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../common/ConvertFunction';

const TheMatches = (props) => {
	const [loading, setLoading] = useState(true);
	const [matches, setMatches] = useState([]);
	const [filterMatches, setFilterMatches] = useState([]);
	const [playerFilter, setPlayerFilter] = useState('All');
	const [resultFilter, setResultFilter] = useState('All');

	useEffect(() => {
		getMatches();
	}, []);
	const getMatches = () => {
		dataBaseMatches.once('value').then((snapshot) => {
			const matches = firebaseLooper(snapshot);

			setLoading(false);
			setMatches(reverseArray(matches));
			setFilterMatches(reverseArray(matches));
		});
	};

	return (
		<div className="the_matches_container">
			<div className="the_matches_wrapper">
				<div className="left">
					<div className="match_filters">
                        
                    </div>
                    <MatchesList matches={filterMatches}/>
				</div>
				<div className="right">
					<Table />
				</div>
			</div>
		</div>
	);
};

export default TheMatches;
