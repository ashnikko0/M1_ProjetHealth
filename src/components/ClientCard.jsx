import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClientCard({ client }) {
  return (
    <div className="client-card">
      <h2>{client.firstname} {client.lastname}</h2>
      <p>Height: {client.height}</p>
      <p>Weight Start: {client.weightStart}</p>
      <p>Weight Goal: {client.weightGoal}</p>
      <p>Sex: {client.sex === 1 ? 'Male' : 'Female'}</p> 
    </div>
  );
}
/*penser à ajouter un affichage d'icone dynamique en fonction du sexe
On pourrait aussi ajouter un petit icone (genre un trophée) si poids goal atteint ?? */

function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const api = "https://health.shrp.dev/items/people";

    axios.get(api)
      .then(response => {
        setClients(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  return (
    <div className="client-list">
      {clients.map(client => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
}

export default ClientList;
