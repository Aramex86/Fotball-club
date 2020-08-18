import React, { useState, useEffect } from 'react';
import PlayerCard from '../common/PlayerCard';
import Fade from 'react-reveal/Fade';

import Stripes from '../../images/stripes.png';
import { dataPlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../common/ConvertFunction';
import { Promise } from 'core-js';

const Theteam = (props) => {
	const [loading, setLoading] = useState(true);
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		getPlayers();
	}, []);

	const getPlayers = () => {
		dataPlayers.once('value').then((snapshot) => {
			const players = firebaseLooper(snapshot);
			let promises = [];

			for (let key in players) {
				promises.push(
					new Promise((resolve, reject) => {
						firebase
							.storage()
							.ref('players')
							.child(players[key].image)
							.getDownloadURL()
							.then((url) => {
								players[key].url = url;
								resolve();
							});
					})
				);
			}

			Promise.all(promises).then(() => {
                setLoading(false);
                setPlayers(players);
                
			});
		});
    };
    
   const showplayersByCategory = (category) => (
        players?players.map((player,i)=>{
                return player.position === category ?
                    <Fade left delay={i*20} key={i}>
                        <div className="item">
                            <PlayerCard
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                                bck={player.url}
                            />
                        </div>
                    </Fade>
                :null
            })
        :null
    )

	return (
		<div
			className="the_team_container"
			style={{
				background: `url(${Stripes}) repeat`,
			}}
		>
			{!loading ? (
				<div>
					<div className="team_category_wrapper">
						<div className="title">Keepers</div>
						<div className="team_cards">{showplayersByCategory('Keeper')}</div>
					</div>

					<div className="team_category_wrapper">
						<div className="title">Defence</div>
						<div className="team_cards">{showplayersByCategory('Defence')}</div>
					</div>

					<div className="team_category_wrapper">
						<div className="title">Midfield</div>
						<div className="team_cards">{showplayersByCategory('Midfield')}</div>
					</div>

					<div className="team_category_wrapper">
						<div className="title">Strikers</div>
						<div className="team_cards">{showplayersByCategory('Striker')}</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Theteam;
