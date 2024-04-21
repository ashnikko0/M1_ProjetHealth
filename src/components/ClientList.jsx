import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ClientCard from './ClientCard';

function ClientList({ searchQuery }) {

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
   async function loadClients() {

     let api = "";

     api = "https://health.shrp.dev/items/people";

     try {

      setIsLoading(true);
      setIsError(false);

      const response = await axios.get(api);

      const data = await response.data.data;

      setClients(data);
      setFilteredClients(data);
      setIsLoading(false);
      setIsError(false);

     } catch (error) {
      setIsError(true);
      setIsLoading(false);
     }
   }

   loadClients();

  }, []);

  useEffect(() => {
   setFilteredClients(clients.filter(client => {
     return `${client.firstname.toLowerCase()} ${client.lastname.toLowerCase()}`.includes(searchQuery);
   }));
  }, [searchQuery])

  return (
   <div className="client-list">
     {isLoading && <div className="loader" />}
     {isError && <p>Une erreur s'est produite</p>}
     {filteredClients.map((client) => (
      <ClientCard key={client.id} client={client} />
     ))}
   </div>
  );
}

export default ClientList;
