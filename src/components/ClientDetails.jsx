import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ReferenceLine, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import useEmblaCarousel from 'embla-carousel-react'
import axios from 'axios';

import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarousel';
import AutoHeight from 'embla-carousel-auto-height'
import ActivityCard from './ActivityCard';
import ScrollUp from './ScrollUp';

import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";
import back from "../assets/back.svg";
import tropheegold from "../assets/tropheegold.png";
import tropheesilver from "../assets/tropheesilver.png";
import tropheebronze from "../assets/tropheebronze.png";
import ruler from "../assets/ruler.svg";
import goal from "../assets/goal.svg";
import current from "../assets/current.svg";
import profilepic from "../assets/profilepic.svg";

function translateBmi(bmi) { //Pour faire la trad des bmi
  const translations = {
    "underweight": "sous-poids",
    "normal": "normal",
    "overweight": "surpoids",
    "moderate obesity" : "obésité modéré",
    "severe obesity" : "obésité sévère",
    "morbid obesity" : "obésité morbide"
  };
  return translations[bmi] || bmi;
}

function translateActivityProfile(activityProfile) { //Pour faire la trad des activités 
  const translations = {
    "sedentary" : "sédentaire",
    "low active" : "peu actif",
    "somewhat active" : "activité légère",
    "active" : "actif",
    "highly active" : "grandement actif"
  };
  return translations[activityProfile] || activityProfile;
}


function ClientDetails() {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoHeight()]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  const { id } = useParams(); // Récupérer l'ID du client depuis l'URL

  const [physioData, setPhysioData] = useState(null); // État pour stocker les détails du client
  const [isPhysioLoading, setisPhysioLoading] = useState(false);
  const [isPhysioError, setisPhysioError] = useState(false);

  const [activityData, setActivityData] = useState(null); // État pour stocker les détails du client
  const [caloriesData, setCaloriesData] = useState(null);
  const [isActivityLoading, setisActivityLoading] = useState(false);
  const [isActivityError, setisActivityError] = useState(false);

  const [visibleActivities, setVisibleActivities] = useState(10); // Initial value

  useEffect(() => {
    if(emblaApi) emblaApi.reInit();
  }, [visibleActivities, physioData, activityData])

  const navigate = useNavigate();
  const location = useLocation();

  const client = location.state.client;

  useEffect(() => {
    async function loadPhysioData() {

      const api = "https://health.shrp.dev/items/physiologicalData?sort=date&filter[people_id][_eq]=" + id;

      try {

        setisPhysioLoading(true);
        setisPhysioError(false);

        const response = await axios.get(api);

        const data = await response.data.data;
        data.forEach(physio => {
          physio.date = format(new Date(physio.date), 'dd/MM/yyyy');;
        });

        setPhysioData(data);
        setisPhysioLoading(false);
        setisPhysioError(false);

      } catch (error) {
        setisPhysioError(true);
        setisPhysioLoading(false);
      }
    }

    async function loadActivityData() {

      const api = "https://health.shrp.dev/items/physicalActivities?sort=-date&filter[people_id][_eq]=" + id;

      try {

        setisActivityLoading(true);
        setisActivityError(false);

        const response = await axios.get(api);

        const data = await response.data.data;

        var sum = 0;
        data.forEach(activity => {
          activity.date = format(new Date(activity.date), 'dd/MM/yyyy');;
          sum += parseFloat(activity.consumedCalories);
        });
        setCaloriesData(sum);

        setActivityData(data);
        setisActivityLoading(false);
        setisActivityError(false);

      } catch (error) {
        setisActivityError(true);
        setisActivityLoading(false);
      }
    }

    window.scrollTo(0, 0);

    loadPhysioData();
    loadActivityData();

  }, []);

  // Si les détails du client sont en cours de chargement, afficher un indicateur de chargement
  return (
    <div className='client-details'>

      <div className='back-menu'>
        <button onClick={() => navigate(-1)}><img src={back} alt="back" className='back-icon' /> Retour à la liste</button>
      </div>

      <h1>{client.firstname} {client.lastname}</h1>

      <div className="embla__buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>

      <div className="embla" ref={emblaRef}>

        <div className="embla__container">

          <div className="embla__slide">
            <div className='details-title-section'>Détails du patient</div>
            <div className='details-content'>




              <div className="inside-card-details">
                <div className="icon-container">
                  <img src={client.sex === 1 ? maleIcon : femaleIcon} alt="SexIcon" className="icon" />
                </div>
                <p>Sexe : {client.sex === 1 ? 'Homme' : 'Femme'}</p>
              </div>
              <div className="inside-card-details">
                <div className="icon-container">
                  <img src={profilepic} alt="profilepic" className="icon" />
                </div>
                <p>Année de naissance : {client.birthyear}</p>
              </div>
              <div className="inside-card-details">
                <div className="icon-container">
                  <img src={ruler} alt="Height" className="icon" />
                </div>
                <p>Taille : {client.height} cm</p>
              </div>
              <div className="inside-card-details">
                <div className="icon-container">
                  <img src={current} alt="current" className="icon" />
                </div>
                <p>IMC* de départ : {translateBmi(client.bmiStart)}
                </p>
              </div>
              <div className="inside-card-details">
                <div className="icon-container">
                  <img src={goal} alt="goal.svg" className="icon" />
                </div>
                <p>Objectif IMC* : {translateBmi(client.bmiGoal)}</p>
              </div>
              <div className="inside-card-details">
                <div className="icon-container">
                  <img src={current} alt="current.svg" className="icon" />
                </div>
                <p>Poids de départ : {client.weightStart} kg</p>
              </div>
              <div className="inside-card-details">
                <div className="icon-container">
                  {client.weightStart === client.weightGoal ? (
                    <img src={tropheegold} alt="TropheeGold" className="icon-trophy" />
                  ) : client.weightStart - client.weightGoal >= -3 && client.weightStart - client.weightGoal <= 3 ? (
                    <img src={tropheesilver} alt="TropheeSilver" className="icon-trophy" />
                  ) : client.weightStart - client.weightGoal >= -5 && client.weightStart - client.weightGoal <= 5 ? (
                    <img src={tropheebronze} alt="TropheeBronze" className="icon-trophy" />
                  ) : (
                    <span></span>
                  )}
                </div>
                <p>Objectif poids : {client.weightGoal} kg</p>
              </div>


    <div className="inside-card-details">
    <div className="icon-container">
      <img src={profilepic} alt="ActivityProfileIcon" className="icon" />
    </div>
      <p>Type de profil : {translateActivityProfile(client.activityProfile)}</p>
    </div>

              
            </div>
            <p>*IMC = Indice de masse corporelle. </p>
            <p>Calcul : Poids / Taille x Taille</p>
          </div>

          <div className="embla__slide">
            <div className='details-title-section'>Données Physiologiques</div>
            {isPhysioLoading && <div className="loader" />}
            {isPhysioError && <p>Une erreur s'est produite</p>}
            {physioData &&
              <ResponsiveContainer width="90%" height={200} >
                <LineChart data={physioData}>
                  <XAxis dataKey="date" domain={['auto', 'auto']}/>
                  <YAxis domain={['auto', 'auto']} label={{ value: "Poids (en kg)", angle: -90, position: "insideLeft" }}/>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" vertical={false}/>
                  <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                  <ReferenceLine y={client.weightGoal} label="Objectif" stroke="#82ca9d"/>
                </LineChart>
              </ResponsiveContainer>}
          </div>

          <div className="embla__slide">
            <div className='details-title-section'>Activités Physiques</div>
            {isActivityLoading && <div className="loader" />}
            {isActivityError && <p>Une erreur s'est produite</p>}
            {activityData && <>
              <p>{caloriesData}</p>
              <ResponsiveContainer width="90%" height={200} >
                <LineChart data={activityData}>
                  <XAxis dataKey="date" reversed={true} interval="preserveEnd" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="consumedCalories" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>

              <div>
                <div className='details-title-section'>Historique des activités</div>
                {activityData.slice(0, visibleActivities).map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
                {activityData.length > visibleActivities && (
                  <button onClick={() => setVisibleActivities(visibleActivities + 10)}>
                    Voir plus
                  </button>
                )}
              </div>
            </>}
          </div>

        </div>
      </div>

      <ScrollUp />

    </div>
  );
}

export default ClientDetails;