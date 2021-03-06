import React from 'react';
import Logo from '../common/Logo';

const Footer=(props)=> {
    return (
        <footer className='bck_blue'>
            <div className='footer_logo'>
            <Logo 
                link={true}
                linkTo='/'
                width='70px'
                height='70px'
               />
            </div>
            <div className='footer_discl'>
                Manchester City 2020. All rights reserved.
            </div>
        </footer>
    )
}
export default Footer;