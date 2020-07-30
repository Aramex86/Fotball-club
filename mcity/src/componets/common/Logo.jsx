import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/images/logos/manchester_city_logo.png';


const Logo =(props)=> {
    const tempalte = <div
     className='img_cover'
      style={{width:props.width,
        height:props.height,
        background:`url(${logo}) no-repeat`
      }}></div>

    if(props.link){
    return<Link to={props.linkTo} className="link_logo">{tempalte}</Link>
        
    }else{
        return tempalte
    }
}
export default Logo;