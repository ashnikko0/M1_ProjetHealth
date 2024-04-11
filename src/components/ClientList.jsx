import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ClientCard from './ClientCard';

function ClientList() {

  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
   
  useEffect(() => {
    async function loadClients() {

      const api = "https://health.shrp.dev/items/people";

      try {

        setIsLoading(true);
        setIsError(false);

        const response = await axios.get(api);

        const data = await response.data.data;


        setClients(data);
        setIsLoading(false);
        setIsError(false);

      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    loadClients();

  }, []);

  return (
    <div className="client-list">
      {isLoading && <div class="loader"></div>}
      {isError && <p>Une erreur s'est produite</p>}
      {clients.map((client) => (
        <ClientCard key={client.id} client={client}/>
      ))}
    </div>
  );
}

export default ClientList;
