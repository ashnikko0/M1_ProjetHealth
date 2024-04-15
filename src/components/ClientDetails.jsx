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
import trophy from "../assets/trophy.png";


function ClientDetails() {

  const { id } = useParams(); // Récupérer l'ID du client depuis l'URL

  const [physioData, setPhysioData] = useState(null); // État pour stocker les détails du client
  const [isPhysioLoading, setisPhysioLoading] = useState(false);
  const [isPhysioError, setisPhysioError] = useState(false);

  const [activityData, setActivityData] = useState(null); // État pour stocker les détails du client
  const [isActivityLoading, setisActivityLoading] = useState(false);
  const [isActivityError, setisActivityError] = useState(false);

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

        setisPhysioLoading(true);
        setisPhysioError(false);

        const response = await axios.get(api);

        const data = await response.data.data;

        setPhysioData(data);
        setisPhysioLoading(false);
        setisPhysioError(false);

      } catch (error) {
        setisPhysioError(true);
        setisPhysioLoading(false);
      }
    }

    async function loadActivityData() {

      const api = "https://health.shrp.dev/items/physicalActivities?filter[people_id][_eq]=" + id;

      try {

        setisActivityLoading(true);
        setisActivityError(false);

        const response = await axios.get(api);

        const data = await response.data.data;

        setActivityData(data);
        setisActivityLoading(false);
        setisActivityError(false);

      } catch (error) {
        setisActivityError(true);
        setisActivityLoading(false);
      }
    }

    loadPhysioData();
    loadActivityData();

  }, []);

  // Si les détails du client sont en cours de chargement, afficher un indicateur de chargement
  return (
    <div>

      <button onClick={() => navigate(-1)}><img src={back} alt="back"className='sexIcon'/></button>
      <h1>{client.firstname} {client.lastname}</h1>

      <Slider {...slider_settings} className='slider'>

        <div className='slide'>
          <h2>Détails</h2>
          {client.sex === 1 ? <img src={maleIcon} alt="maleIcon" className="sexIcon"/> : <img src={femaleIcon} alt="femaleIcon" className="sexIcon"/>}
          <p>Année de naissance : {client.birthyear }</p>
          <p>Taille : {client.height}</p>
          <p>IMC de départ : {client.bmiStart}</p>
          <p>objectif IMC : {client.bmiGoal}</p>
          <p>Poids de départ : {client.weightStart}</p>
          <p>Objectif poids : {client.weightGoal}</p>
          {client.weightStart === client.weightStart ? <img src={trophy} alt="trophy" className="sexIcon"></img> : <p></p>}

          <p>Type de profil : {client.activityProfile}</p>
        </div>

        <div className='slide'>
          <h2>Données physiologiques</h2>
          {isPhysioLoading && <div className="loader"/>}
          {isPhysioError && <p>Une erreur s'est produite</p>}
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
          <h2>Activités Physiques</h2>
          {isActivityLoading && <div className="loader"/>}
          {isActivityError && <p>Une erreur s'est produite</p>}
          {activityData && activityData.map((activity) => (
            <div key={activity.id}>{activity.type}</div>
          ))}
        </div>

      </Slider>

    </div>
  );
}

export default ClientDetails;
