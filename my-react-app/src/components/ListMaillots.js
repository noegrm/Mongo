import React, { useState } from 'react';

const ListMaillots = ({ maillots, updateMaillot, deleteClick }) => {
  const [editedMaillots, setEditedMaillots] = useState({}); // État local pour suivre les maillots en cours d'édition
  const [searchTerm, setSearchTerm] = useState('');

  const style = {
    padding: '10px',
  };

  const top = {
    paddingTop: '10px',
    marginBottom: '20px', // Ajout d'une marge en bas
  };

  const handleUpdate = (maillot) => {
    setEditedMaillots({ ...editedMaillots, [maillot._id]: { ...maillot } });
  };

  const handleSave = (maillotId) => {
    const editedMaillot = editedMaillots[maillotId];
    updateMaillot(maillotId, editedMaillot);
    setEditedMaillots({ ...editedMaillots, [maillotId]: null }); // Réinitialisation de l'état d'édition
  };

  const handleCancel = (maillotId) => {
    const updatedEditedMaillots = { ...editedMaillots };
    delete updatedEditedMaillots[maillotId];
    setEditedMaillots(updatedEditedMaillots);
  };

  const handleInputChange = (maillotId, field, value) => {
    setEditedMaillots({
      ...editedMaillots,
      [maillotId]: {
        ...editedMaillots[maillotId],
        [field]: value,
      },
    });
  };

  const filteredMaillots = maillots.filter((maillot) =>
    maillot.club.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={top}>
      <h3>Liste des Maillots</h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par club..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Club</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Reference</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaillots.map((maillot) => (
              <tr key={maillot._id}>
                <td>
                  {editedMaillots[maillot._id] ? (
                    <input
                      type="text"
                      value={editedMaillots[maillot._id].club}
                      onChange={(e) => handleInputChange(maillot._id, 'club', e.target.value)}
                    />
                  ) : (
                    maillot.club
                  )}
                </td>
                <td>
                  {editedMaillots[maillot._id] ? (
                    <input
                      type="text"
                      value={editedMaillots[maillot._id].quantite}
                      onChange={(e) => handleInputChange(maillot._id, 'quantite', e.target.value)}
                    />
                  ) : (
                    maillot.quantite
                  )}
                </td>
                <td>
                  {editedMaillots[maillot._id] ? (
                    <input
                      type="text"
                      value={editedMaillots[maillot._id].prix}
                      onChange={(e) => handleInputChange(maillot._id, 'prix', e.target.value)}
                    />
                  ) : (
                    maillot.prix
                  )}
                </td>
                <td>
                  {editedMaillots[maillot._id] ? (
                    <input
                      type="text"
                      value={editedMaillots[maillot._id].reference}
                      onChange={(e) => handleInputChange(maillot._id, 'reference', e.target.value)}
                    />
                  ) : (
                    maillot.reference
                  )}
                </td>
                <td>
                  {editedMaillots[maillot._id] ? (
                    <div>
                      <button onClick={() => handleSave(maillot._id)} className="btn btn-success mr-2">
                        Enregistrer
                      </button>
                      <button onClick={() => handleCancel(maillot._id)} className="btn btn-secondary">
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => handleUpdate(maillot)} className="btn btn-secondary mr-2">
                        Editer
                      </button>
                      <button onClick={() => deleteClick(maillot._id)} className="btn btn-danger">
                        Supprimer
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListMaillots;
