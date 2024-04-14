import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ClientDetails() {
  
  const { id } = useParams(); // Récupérer l'ID du client depuis l'URL
  const [client, setClient] = useState(null); // État pour stocker les détails du client
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadClients() {

      const api = "https://health.shrp.dev/items/people/" + id;

      try {

        setIsLoading(true);
        setIsError(false);

        const response = await axios.get(api);

        const data = await response.data.data;

        setClient(data);
        setIsLoading(false);
        setIsError(false);

      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    loadClients();

  }, []);

  // Si les détails du client sont en cours de chargement, afficher un indicateur de chargement
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      {isLoading && <div className="loader"/>}
      {isError && <p>Une erreur s'est produite</p>}
      {client && <div>
        <h1>Détails du client</h1>
        <p>Nom: {client.firstname} {client.lastname}</p>
        <p>Taille: {client.height}</p>
        <p>Poids de départ: {client.weightStart}</p>
        <p>Objectif poids: {client.weightGoal}</p>
      </div>}    
    </div>
  );
}

export default ClientDetails;
