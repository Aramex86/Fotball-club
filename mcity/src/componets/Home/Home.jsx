import React from 'react';
import Feature from './Feature/Feature';
import { MatchesHome } from './Matches/MatchesHome';

const Home = (props) => {
  return (
    <section className="bck_blue">
      <Feature />
      <MatchesHome/>
    </section>
  );
};
export default Home;
