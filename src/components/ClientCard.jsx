import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";
import trophy from "../assets/trophy.png";
import ruler from "../assets/ruler.svg";
import goal from "../assets/goal.svg";
import current from "../assets/current.svg";
import { Link, useNavigate } from 'react-router-dom';

function ClientCard({ client }) {

  const navigate = useNavigate();

  //chaque div de la card aura un style particulier
  return (
    <div className="client-card" onClick={() => navigate('/client/' + client.id, {state:{client}})}>
        
        <div>
        <h2>{client.firstname} {client.lastname}</h2>
        </div>

<<<<<<< HEAD
        <div className="mid-part-card">
        <img src={ruler} alt="Ruler" className="icon" />
        <p>Taille : {client.height}</p>
        {client.sex === 1 ? <img src={maleIcon} alt="maleIcon" className="icon"/> : <img src={femaleIcon} alt="femaleIcon" className="icon"/>}
        </div>
        
        <div className="bottom-part-card">
        <p>{client.weightStart}</p>
        <img src={current} alt="CurrentWeight" className="icon" />
        <img src={goal} alt="GoalWeight" className="icon" />
        <p> {client.weightGoal}</p> 
        {client.weightStart === client.weightGoal ? <img src={trophy} alt="trophy" className="icon"></img> :<span></span>}
=======
        <div className="content-card">

          <div className="inside-card">
            <img src={ruler} alt="Ruler" className="sexIcon" />
            <p>{client.height}</p>
          </div>
        
        {client.sex === 1 ? <img src={maleIcon} alt="maleIcon" className="sexIcon"/> : <img src={femaleIcon} alt="femaleIcon" className="sexIcon"/>}
        </div>
        
        <div className="content-card">
          <div className="inside-card">
          <img src={current} alt="CurrentWeight" className="sexIcon" />
          <p>{client.weightStart}</p>
        
        </div>

        <div className="inside-card">
          <img src={goal} alt="GoalWeight" className="sexIcon" />
          <p> {client.weightGoal}</p> 
          {client.weightStart === client.weightGoal ? <img src={trophy} alt="trophy" className="sexIcon"></img> :<span></span>}
        </div>

>>>>>>> 84263b18a2d291e1ac9993828b300eae5a297db7
        </div>
      
    </div>
    
  );
}

export default ClientCard;
