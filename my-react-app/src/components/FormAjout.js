// FormAjout.js
import React, { useState } from 'react';

const FormAjout = ({ onAdd }) => {
  const [newClub, setNewClub] = useState('');
  const [newQuantite, setNewQuantite] = useState('');
  const [newPrix, setNewPrix] = useState('');
  const [newReference, setReference] = useState('');

  const handleAjouter = () => {
    if (newClub.trim() !== '' && newQuantite.trim() !== '' && newPrix.trim() !== '' && newReference.trim() !== '') {
      onAdd({ club: newClub, quantite: newQuantite, prix: newPrix, reference: newReference });
      // Réinitialiser les champs après l'ajout
      setNewClub('');
      setNewQuantite('');
      setNewPrix('');
      setReference('');
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  const style = {
    margin: '5px',
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Club"
        value={newClub}
        onChange={(e) => setNewClub(e.target.value)}
      />
      <input
        type="text"
        placeholder="Quantité"
        value={newQuantite}
        onChange={(e) => setNewQuantite(e.target.value)}
      />
      <input
        type="text"
        placeholder="Prix"
        value={newPrix}
        onChange={(e) => setNewPrix(e.target.value)}
      />
      <input
        type="text"
        placeholder="Reference"
        value={newReference}
        onChange={(e) => setReference(e.target.value)}
      />
      <button onClick={handleAjouter} className="btn btn-success" style={style}>Ajouter un maillot</button>
    </div>
  );
};

export default FormAjout;
