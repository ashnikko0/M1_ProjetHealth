import maleIcon from "../../assets/maleIcon.svg";
import femaleIcon from "../../assets/femaleIcon.svg";
import tropheegold from "../../assets/tropheegold.png";
import tropheesilver from "../../assets/tropheesilver.png";
import tropheebronze from "../../assets/tropheebronze.png";
import ruler from "../../assets/ruler.svg";
import goal from "../../assets/goal.svg";
import current from "../../assets/current.svg";
import profilepic from "../../assets/profilepic.svg";


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

const DetailsSlide = ({ emblaApi, client }) => {

    return (
      <>
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
      </>
    )
  }
  
  export default DetailsSlide;
  