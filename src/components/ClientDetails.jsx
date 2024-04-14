import { useNavigate, useParams, useLocation } from 'react-router-dom';

function ClientDetails() {

  const { id } = useParams(); // Récupérer l'ID du client depuis l'URL
  const navigate = useNavigate();
  const location = useLocation();

  const client = location.state.client;

  // Si les détails du client sont en cours de chargement, afficher un indicateur de chargement
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <div>
        <h1>Détails du client</h1>
        <p>Nom: {client.firstname} {client.lastname}</p>
        <p>Taille: {client.height}</p>
        <p>Poids de départ: {client.weightStart}</p>
        <p>Objectif poids: {client.weightGoal}</p>
      </div>   
    </div>
  );
}

export default ClientDetails;
