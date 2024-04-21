function translateActivityType(activityType) { //Pour faire la trad des bmi
  const translations = {
     "walking": "Marche à pied",
     "swimming": "Natation",
     "footing": "Course à pied",
     "bike": "Cyclisme",
  };
  return translations[activityType] || activityType;
}

function ActivityCard({ activity }) {

  return (
   <div className="activity-card">
     <h4 className="activity-card-title">{translateActivityType(activity.type)}</h4>
     <div>
      <p>Durée : {Math.floor(activity.duration / 60)} h {(activity.duration % 60).toLocaleString('fr-FR', {minimumIntegerDigits: 2})} m </p>
      {activity.numberOfSteps === 0 ? null : <p>Nombre de pas : {activity.numberOfSteps} pas</p>}
      <p>Calories : {activity.consumedCalories} cal</p>
      <p>Date : {activity.date}</p>
     </div>
   </div>
  );
}

export default ActivityCard;
