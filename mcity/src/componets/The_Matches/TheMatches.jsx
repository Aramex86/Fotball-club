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

	const showPlayed=(played)=>{
		const list = matches.filter((match)=>{
			return match.final === played
		});

		setFilterMatches(played==='All'?matches:list,);
		setPlayerFilter(played);
		setResultFilter('All');


	}

	return (
		<div className="the_matches_container">
			<div className="the_matches_wrapper">
				<div className="left">
					<div className="match_filters">
                        <div className="match_filters_box">
							<div className="tag">
								Show Match
							</div>
							<div className="cont">
								<div className={`option`} onClick={()=>
									showPlayed('All')
								}>
									All
								</div>
								<div className={`option`} onClick={()=>
									showPlayed('Yes')
								}>
									Played
								</div>
								<div className={`option`} onClick={()=>
									showPlayed('No')
								}>
									Not Played
								</div>
							</div>
						</div>
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
