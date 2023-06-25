import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';
const Logo = ()=>{
    return(
    <div className=' ma4, mt0'style={ {display: 'flex',justifyContent:'flex-start'}}>
        <Tilt className='Tilt br2 shadow-2 'options={{max:55}} style={{height:100,width:100}}>
         <div className='Tilt-inner pa1'><img  alt='logo' src={brain}/>
           
        </div>
       </Tilt>
    </div>
    );
}
export default Logo;