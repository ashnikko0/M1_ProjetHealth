import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';


import { Carousel } from './Carousel';
import ScrollUp from './ScrollUp';

import back from "../assets/back.svg";

function ClientDetails() {

  const { id } = useParams(); // Récupérer l'ID du client depuis l'URL

  const navigate = useNavigate();
  const location = useLocation();

  const client = location.state.client;

  useEffect(() => {
   window.scrollTo(0, 0);
  }, []);

  // Si les détails du client sont en cours de chargement, afficher un indicateur de chargement
  return (
   <div className='client-details'>

     <div className='back-menu'>
      <button onClick={() => navigate(-1)}><img src={back} alt="back" className='back-icon' />Retour à la liste</button>
     </div>

     <h1>{client.firstname} {client.lastname}</h1>

     <Carousel client={client} id={id} />

     <ScrollUp />

   </div>
  );
}

export default ClientDetails;