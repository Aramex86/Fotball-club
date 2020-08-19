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
	const [playedFilter, setPlayerFilter] = useState('All');
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

		setFilterMatches(played==='All'?matches:list);
		setPlayerFilter(played);
		setResultFilter('All');
	}
	const showResult=(result)=>{
		const list = matches.filter((match)=>{
			return match.result === result
		});
		setFilterMatches(result==='All'?matches:list);
		setPlayerFilter('All');
		setResultFilter(result);
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
								<div className={`option ${playedFilter ==='All'?'active':''}`} onClick={()=>
									showPlayed('All')
								}>
									All
								</div>
								<div className={`option ${playedFilter ==='Yes'?'active':''}`} onClick={()=>
									showPlayed('Yes')
								}>
									Played
								</div>
								<div className={`option ${playedFilter ==='No'?'active':''}`} onClick={()=>
									showPlayed('No')
								}>
									Not Played
								</div>
							</div>
						</div>
                        <div className="match_filters_box">
							<div className="tag">
								Results game
							</div>
							<div className="cont">
								<div className={`option ${resultFilter ==='All'?'active':''}`} onClick={()=>
									showResult('All')
								}>
									All
								</div>
								<div className={`option ${resultFilter ==='W'?'active':''}`} onClick={()=>
									showResult('W')
								}>
									W
								</div>
								<div className={`option ${resultFilter ==='L'?'active':''}`} onClick={()=>
									showResult('L')
								}>
									L
								</div>
								<div className={`option ${resultFilter ==='D'?'active':''}`} onClick={()=>
									showResult('D')
								}>
									D
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
