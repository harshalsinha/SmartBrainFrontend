import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './Brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 170, width: 250 }} >
                <div className="Tilt-inner"> 
                    <img style={{paddingTop: '5px', height:150, width: 200}} alt='logo' src={brain}></img> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;