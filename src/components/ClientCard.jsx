import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";
import trophy from "../assets/trophy.png";
import { Link, useNavigate } from 'react-router-dom';

function ClientCard({ client }) {

  const navigate = useNavigate();

  //chaque div de la card aura un style particulier
  return (
    <div className="client-card" onClick={() => navigate('/client/' + client.id, {state:{client}})}>
        
        <div>
        <h2>{client.firstname} {client.lastname}</h2>
        </div>

        <div className="mid-part-card">
        <p>Taille : {client.height}</p>
        {client.sex === 1 ? <img src={maleIcon} alt="maleIcon" className="sexIcon"/> : <img src={femaleIcon} alt="femaleIcon" className="sexIcon"/>}
        </div>
        
        <div className="bottom-part-card">
        <p>Poids de départ : {client.weightStart}</p>
        <p>Objectif poids : {client.weightGoal}</p>
        {client.weightStart === client.weightStart ? <img src={trophy} alt="trophy" className="sexIcon"></img> : <p>NO</p>}
        </div>
      
    </div>
    
  );
}

export default ClientCard;
