// Apropos.js
import React from 'react';
import work from '../assets/work-digital.png';

const Apropos = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center'  
  };

  const imageStyle = {
    width: '200px', 
    marginRight: '20px'  
  };

  return (
    <div>
      <h2>À propos de nous</h2>
      <div style={containerStyle}>
        <img src={work} alt="Description de l'image" style={imageStyle} />
        <p>Société : Nono Business<br /><br />
          Email : nono.business@masociete.com</p>
      </div>
    </div>
  );
};

export default Apropos;
