function ActivityCard({ activity }) {

  //chaque div de la card aura un style particulier
  return (
    <div className="activity-card">
        
        <h2>{activity.type}</h2>
        <div>Durée: {activity.duration}</div>
        <div>Pas: {activity.numberOfSteps}</div>
        <div>Calories: {activity.consumedCalories}</div>
        {activity.date}
      
    </div>
    
  );
}

export default ActivityCard;
