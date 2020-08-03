import React from 'react';
import Tag from '../../common/Tag';
import MatchesBlocks from './MatchesBlocks';

export const MatchesHome = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="conatainer">
        <Tag bck="#0e1731" size="50px" color="#ffffff">
          Matches
        </Tag>
        
        <MatchesBlocks/>
        <Tag
        bck="#ffffff"
        size="22px"
        color="#0e1731"
        link={true}
        linkto="/the_team"
        >
See more matches
        </Tag>
      </div>
    </div>
  );
};
