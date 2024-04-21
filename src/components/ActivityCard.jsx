function ActivityCard({ activity }) {

  return (
   <div className="activity-card">
     <h2>{activity.type}</h2>
     <div>
      <p>Durée : {activity.duration}</p>
      {activity.numberOfSteps === 0 ? null : <p>Nombre de pas : {activity.numberOfSteps}</p>}
      <p>Calories : {activity.consumedCalories}</p>
      <p>Date : {activity.date}</p>
     </div>
   </div>
  );
}

export default ActivityCard;
