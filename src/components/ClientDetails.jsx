import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ReferenceLine, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";

function ClientDetails() {

  const { id } = useParams(); // Récupérer l'ID du client depuis l'URL
  const [physioData, setPhysioData] = useState(null); // État pour stocker les détails du client
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const client = location.state.client;

  useEffect(() => {
    async function loadPhysioData() {

      const api = "https://health.shrp.dev/items/physiologicalData?filter[people_id][_eq]=" + id;

      try {

        setIsLoading(true);
        setIsError(false);

        const response = await axios.get(api);

        const data = await response.data.data;

        setPhysioData(data);
        setIsLoading(false);
        setIsError(false);

      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    loadPhysioData();

  }, []);

  // Si les détails du client sont en cours de chargement, afficher un indicateur de chargement
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <div>
        <h1>{client.firstname} {client.lastname}</h1>
        {client.sex === 1 ? <img src={maleIcon} alt="maleIcon" className="sexIcon"/> : <img src={femaleIcon} alt="femaleIcon" className="sexIcon"/>}
        <p>Année de naissance : {client.birthyear }</p>
        <p>Taille : {client.height}</p>
        <p>IMC de départ : {client.bmiStart}</p>
        <p>objectif IMC : {client.bmiGoal}</p>
        <p>Poids de départ : {client.weightStart}</p>
        <p>Objectif poids : {client.weightGoal}</p>
        <p>Type de profil : {client.activityProfile}</p>
      </div>
      {isLoading && <div className="loader"/>}
      {isError && <p>Une erreur s'est produite</p>}
      {physioData && 
        <ResponsiveContainer width="100%" height={200} >
          <LineChart data={physioData}>
            <XAxis dataKey="date"/>
            <YAxis domain={['dataMin - 1', 'dataMax + 1']}/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            <ReferenceLine y={client.weightGoal} label="Goal" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>}
    </div>
  );
}

export default ClientDetails;
