import { useEffect, useState } from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import axios from "axios";

import ActivityCard from "../ActivityCard";

const ActivitySlide = ({ emblaApi, id }) => {

   const [activityData, setActivityData] = useState(null); // État pour stocker les détails du client
   const [caloriesData, setCaloriesData] = useState(null);
   const [isActivityLoading, setisActivityLoading] = useState(false);
   const [isActivityError, setisActivityError] = useState(false);

   const [visibleActivities, setVisibleActivities] = useState(10); // Initial value

   useEffect(() => {
      if (emblaApi) emblaApi.reInit();
   }, [visibleActivities, activityData])

   useEffect(() => {
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

      loadActivityData();

   }, []);

   return (
      <>
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
      </>
   )
}

export default ActivitySlide;
