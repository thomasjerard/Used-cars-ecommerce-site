import React from 'react';
import '../css/FrontImage.css';
import backgroundImage from '../images/carScenery2.jpg';

function FrontImage() {
  const divStyle = {
    backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0)
      ),url(${backgroundImage})`,
    backgroundSize: 'cover',
    // add more CSS properties as needed
  };

  return (
    <div className='outercontainer'>
    <div style={divStyle} className='imageContainer'>
    <div className='write-up'>
      <h1>Unveiling the Finest</h1>
      <p>Choose from the Best-in-Class Selection of Used Cars for Your Ultimate Driving Pleasure</p>
    </div>
    </div>
    </div>
  );
}

export default FrontImage;
