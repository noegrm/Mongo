import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap
// Importation des composant 
import Accueil from './components/Accueil';
import Apropos from './components/Apropos';
import FormAjout from './components/FormAjout';
import ListMaillots from './components/ListMaillots'; 
import logo from './assets/logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maillots: [] // Ajouter l'état pour les maillots
    };

    // Liez la méthode updateMaillot 
    this.updateMaillot = this.updateMaillot.bind(this);
  }

  API_URL = "http://localhost:5038/"; //API pour récupérer les données de la base Mongo

  componentDidMount() {
    this.refreshMaillots(); // Appeler la fonction pour obtenir la liste des maillots
  }

  //Récupération des maillots
  async refreshMaillots() {
    fetch(this.API_URL + "api/GetMaillots")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ maillots: data });
      });
  }

  //ajout des maillots
  async AddMaillot(newMaillot) {
    const data = new FormData();
    data.append("club", newMaillot.club);
    data.append("quantite", newMaillot.quantite);
    data.append("prix", newMaillot.prix);
    data.append("reference", newMaillot.reference);

    fetch(this.API_URL + "api/AddMaillot", {
      method: "POST",
      body: data
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshMaillots();
      });
  }

  //Supression d'un maillot
  async deleteMaillot(id) {
    fetch(this.API_URL + "api/DeleteMaillot?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshMaillots();
      });
  }

  //Edit un maillot 
  async updateMaillot(id, updatedMaillot) {
    const data = new FormData();
    data.append("id", id);
    data.append("club", updatedMaillot.club);
    data.append("quantite", updatedMaillot.quantite);
    data.append("prix", updatedMaillot.prix);
    data.append("reference", updatedMaillot.reference);

    fetch(this.API_URL + "api/UpdateMaillot", {
        method: "PUT",
        body: data
    })
    .then((res) => res.json())
    .then((result) => {
        alert(result);
        this.refreshMaillots();
    });
}


  render() {
    const { notes, maillots } = this.state;
    const imageStyle = {
      width: '70px',
      marginRight: '20px'
    };
    return (
      <Router>
        <div>
          {/* Barre de navigation Bootstrap */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/home">
              <img src={logo} alt="Description de l'image" style={imageStyle} />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Accueil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/apropos">A propos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/formajout">Ajouter un maillot</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/listmaillots">Liste des maillots</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/apropos" element={<Apropos />} />
            <Route
              path="/formajout"
              element={<FormAjout onAdd={(newMaillot) => this.AddMaillot(newMaillot)} />}
            />
            <Route
              path="/listmaillots"
              element={
                <ListMaillots
                  maillots={maillots}
                  updateMaillot={(id, updatedMaillot) => this.updateMaillot(id, updatedMaillot)} // Utilisez updateMaillot au lieu de updateClick
                  deleteClick={(id) => this.deleteMaillot(id)}
                />
              }
            />
            <Route
              path="/home"
              element={
                <div>
                  <Accueil />
                  <Apropos />
                  <FormAjout onAdd={(newMaillot) => this.AddMaillot(newMaillot)} />
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
