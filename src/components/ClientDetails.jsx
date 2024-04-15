import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ReferenceLine, ResponsiveContainer } from 'recharts';
import Slider from 'react-slick';
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ClientDetails.css";

import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";
import back from "../assets/back.svg";

function ClientDetails() {

  const { id } = useParams(); // Récupérer l'ID du client depuis l'URL
  const [physioData, setPhysioData] = useState(null); // État pour stocker les détails du client
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const slider_settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

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
      <h1>{client.firstname} {client.lastname}</h1>
      <Slider {...slider_settings} className='slider'>
        <div className='slide'>
          <h3>Détails</h3>
          {client.sex === 1 ? <img src={maleIcon} alt="maleIcon" className="sexIcon"/> : <img src={femaleIcon} alt="femaleIcon" className="sexIcon"/>}
          <p>Année de naissance : {client.birthyear }</p>
          <p>Taille : {client.height}</p>
          <p>IMC de départ : {client.bmiStart}</p>
          <p>objectif IMC : {client.bmiGoal}</p>
          <p>Poids de départ : {client.weightStart}</p>
          <p>Objectif poids : {client.weightGoal}</p>
          <p>Type de profil : {client.activityProfile}</p>
        </div>
        <div className='slide'>
          <h3>Données physiologiques</h3>
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
        <div className='slide'>
          <h3>Activités Physiques</h3>
          TODO
        </div>
      </Slider>
    </div>
  );
}

export default ClientDetails;
