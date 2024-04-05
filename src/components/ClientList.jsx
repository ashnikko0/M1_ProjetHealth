import React, { useState } from 'react';
import ClientCard from './ClientCard';

function ClientList() {
  const [clients, setClients] = useState([]);

   
   useEffect(() => {
     axios.get('https://votre-api.com/clients')
       .then(response => {
         setClients(response.data);
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
