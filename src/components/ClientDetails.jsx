import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ReferenceLine, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react'

import ActivityCard from './ActivityCard';

import "./ClientDetails.css";

import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";
import back from "../assets/back.svg";
import trophy from "../assets/trophy.png";


function ClientDetails() {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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

  const navigate = useNavigate();
  const location = useLocation();

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

      const api = "https://health.shrp.dev/items/physicalActivities?sort=-date&filter[people_id][_eq]=" + id;

      try {

        setisActivityLoading(true);
        setisActivityError(false);

        const response = await axios.get(api);

        const data = await response.data.data;

        var sum = 0;
        data.forEach(activity => {
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

    loadPhysioData();
    loadActivityData();

  }, []);

  // Si les détails du client sont en cours de chargement, afficher un indicateur de chargement
  return (
    <div className='client-details'>

      <button onClick={() => navigate(-1)}><img src={back} alt="back"className='icon'/></button>
      <h1>{client.firstname} {client.lastname}</h1>

      <div className="embla__buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>

      <div className="embla" ref={emblaRef}>  
        
        <div className="embla__container">

          <div className="embla__slide">
            <h2>Détails</h2>
            {client.sex === 1 ? <img src={maleIcon} alt="maleIcon" className="icon"/> : <img src={femaleIcon} alt="femaleIcon" className="icon"/>}
            <p>Année de naissance : {client.birthyear }</p>
            <p>Taille : {client.height}</p>
            <p>IMC de départ : {client.bmiStart}</p>
            <p>objectif IMC : {client.bmiGoal}</p>
            <p>Poids de départ : {client.weightStart}</p>
            <p>Objectif poids : {client.weightGoal}</p>
            {client.weightStart === client.weightStart ? <img src={trophy} alt="trophy" className="icon"></img> : <p></p>}
            <p>Type de profil : {client.activityProfile}</p>
          </div>

          <div className="embla__slide">
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

          <div className="embla__slide">
            <h2>Activités Physiques</h2>
            {isActivityLoading && <div className="loader"/>}
            {isActivityError && <p>Une erreur s'est produite</p>}
            {activityData && <>
              <p>{caloriesData}</p>
              <ResponsiveContainer width="100%" height={200} >
                <LineChart data={activityData}>
                  <XAxis dataKey="date"/>
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']}/>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                  <Line type="monotone" dataKey="consumedCalories" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
              {activityData.slice(0, 10).map((activity) => ( // "Voir plus" ?
                <ActivityCard key={activity.id} activity={activity}/>
              ))
            }
            </>}
          </div>

        </div>
      </div>

    </div>
  );
}

export default ClientDetails;

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--prev"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--next"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        />
      </svg>
      {children}
    </button>
  )
}