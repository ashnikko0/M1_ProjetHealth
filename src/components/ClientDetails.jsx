import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ClientDetails() {
  const { id } = useParams(); // Récupérer l'ID du client depuis l'URL
  const [client, setClient] = useState(null); // État pour stocker les détails du client

  useEffect(() => {
    async function loadClients() {

      const api = "https://health.shrp.dev/items/people/${id}";

      try {

        setIsLoading(true);
        setIsError(false);

        const response = await axios.get(api);

        const data = await response.data.data;


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
  if (!client) {
    return <div class="loader"></div>;
  }

  return (
    <div>
      <h1>Détails du client</h1>
      <p>Nom: {client.firstname} {client.lastname}</p>
      <p>Taille: {client.height}</p>
      <p>Poids de départ: {client.weightStart}</p>
      <p>Objectif poids: {client.weightGoal}</p>
    </div>
  );
}

export default ClientDetails;
