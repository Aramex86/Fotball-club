import React from 'react';
import Feature from './Feature/Feature';
import { MatchesHome } from './Matches/MatchesHome';
import MeetPlayers from '../Home/MeetPlayers/MeetPlayer';
import Promotion from  './Promotion/Promotion';
const Home = (props) => {
  return (
    <section className="bck_blue">
      <Feature />
      <MatchesHome/>
      <MeetPlayers/>
      <Promotion/>
    </section>
  );
};
export default Home;
