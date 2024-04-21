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
      "underweight": "Sous-poids",
      "normal": "Normal",
      "overweight": "Surpoids",
      "moderate obesity": "Obésité modéré",
      "severe obesity": "Obésité sévère",
      "morbid obesity": "Obésité morbide"
   };
   return translations[bmi] || bmi;
}

function translateActivityProfile(activityProfile) { //Pour faire la trad des activités 
   const translations = {
      "sedentary": "Sédentaire",
      "low active": "Peu actif",
      "somewhat active": "Activité légère",
      "active": "Actif",
      "highly active": "Grandement actif"
   };
   return translations[activityProfile] || activityProfile;
}

const DetailsSlide = ({ emblaApi, client }) => {

   return (
      <>
         <h3 className='details-title-section'>Détails du patient</h3>
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
               <p>Age : {(new Date()).getFullYear() - client.birthyear} ans</p>
            </div>

            <div className="inside-card-details">
               <div className="icon-container">
                  <img src={ruler} alt="Height" className="icon" />
               </div>
               <p>Taille : {Math.floor(client.height / 100)}.{client.height % 100} m</p>
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

         <div style={{fontFamily:'Inter'}}>
            *IMC = Indice de masse corporelle.<br />
            Calcul : Poids / Taille x Taille
         </div>
        
      </>
   )
}

export default DetailsSlide;
