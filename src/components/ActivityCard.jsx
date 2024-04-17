import { format } from 'date-fns';


function ActivityCard({ activity }) {
  const formattedDate = format(new Date(activity.date), 'dd/MM/yyyy');
  
  return (
    <div className="activity-card">
      <h2>{activity.type}</h2>
      <div>
        <p>Durée : {activity.duration}</p>
        {activity.numberOfSteps === 0 ? null : <p>Nombre de pas : {activity.numberOfSteps}</p>}
        <p>Calories : {activity.consumedCalories}</p>
        <p>Date : {formattedDate}</p>
      </div>
    </div>
  );
}

export default ActivityCard;
