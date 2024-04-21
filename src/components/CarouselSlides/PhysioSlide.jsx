import { useEffect, useState } from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ReferenceLine, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import axios from "axios";

const PhysioSlide = ({ emblaApi, client, id }) => {

  const [physioData, setPhysioData] = useState(null); // État pour stocker les détails du client
  const [isPhysioLoading, setisPhysioLoading] = useState(false);
  const [isPhysioError, setisPhysioError] = useState(false);

  useEffect(() => {
   if (emblaApi) emblaApi.reInit();
  }, [physioData])

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
      console.log(error)
      setisPhysioError(true);
      setisPhysioLoading(false);
     }
   }

   loadPhysioData();

  }, []);

  return (
   <>
     <h3 className='details-title-section'>Données Physiologiques</h3>
     {isPhysioLoading && <div className="loader" />}
     {isPhysioError && <p>Une erreur s'est produite</p>}
     {physioData &&
      <div className="recharts-graph">
        <ResponsiveContainer width="90%" height={200} >
          <LineChart data={physioData}>
          <XAxis dataKey="date" domain={['auto', 'auto']} />
          <YAxis domain={['auto', 'auto']} label={{ value: "Poids (en kg)", angle: -90 }} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" vertical={false} />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          <ReferenceLine y={client.weightGoal} label="Objectif" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>}
   </>
  )
}

export default PhysioSlide;
