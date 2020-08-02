import React, { Component } from 'react';
import {dataBaseMatches} from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../common/ConvertFunction';

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

    showMatches =()=>{
       return <div>
            match
        </div>
    }


    render() {

        console.log(this.state);
        return (
            <div className='home_matches'>
                {this.showMatches(this.state.matches)}
            </div>
        )
    }
}


export default MatchesBlocks;