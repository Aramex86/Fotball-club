import React,{useState, useEffect} from 'react';

const AuthHint = () => {
    const[showHint,setShowHint]=useState(false);

    console.log(showHint);

    const openHint=()=>{
        setShowHint(true);
    }

    useEffect(() => {
        setTimeout(() => {
            setShowHint(false);
        }, 5000);
      });

    return (
        <div className='authhint-wrapper'>
            <span onClick={()=>{openHint()}}>Hint</span>
            {showHint?
            <div className="loginform" >
            <div><span>Login:</span>usertest@gmail.com</div>
            <div><span>Pass:</span>123456789</div>
        </div>
        :
         ""   
        }
            
        </div>
    )
}

export default AuthHint
