import React, { Component } from 'react';
import {dataBaseMatches} from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../common/ConvertFunction';
import MatchesBlock from '../../common/MatchesBlock';
import Slide from 'react-reveal/Slide'; 

 class MatchesBlocks extends Component {

    state={
        matches:[]
    }

    componentDidMount(){
        dataBaseMatches.limitToLast(6).once('value').then((snapshot)=>{
           const matches = firebaseLooper(snapshot);

           this.setState({
                matches: reverseArray(matches)
           });

        });
    }

    showMatches =(matches)=>(
        matches? matches.map((match)=>(
            <Slide bottom key={match.id}>
            <div className='item' >
                <div className='wrapper'>
                    <MatchesBlock  match={match}/>
                </div>
            </div>
            </Slide>
        )):''
    )


    render() {

        return (
            <div className='home_matches'>
                {this.showMatches(this.state.matches)}
            </div>
        )
    }
}


export default MatchesBlocks;