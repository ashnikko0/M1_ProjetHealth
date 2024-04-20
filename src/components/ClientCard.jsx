import { useNavigate } from 'react-router-dom';

import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";
import tropheegold from "../assets/tropheegold.png";
import tropheesilver from "../assets/tropheesilver.png";
import tropheebronze from "../assets/tropheebronze.png";
import ruler from "../assets/ruler.svg";
import goal from "../assets/goal.svg";
import current from "../assets/current.svg";
import profilepic from "../assets/profilepic.svg";

function ClientCard({ client }) {

  const navigate = useNavigate();

  //chaque div de la card aura un style particulier
  return (
    <div className="client-card" onClick={() => navigate('/client/' + client.id, {state:{client}})}>
        
        <div className="name-card">
        <img src={profilepic} alt="ProfilePic" className="icon" />
        {client.firstname} {client.lastname}
        </div>
       
        <div className="content-card">
          <div className="inside-card">
            <img src={ruler} alt="Ruler" className="icon" />
            <p>{Math.floor(client.height/100)}.{client.height%100} m</p>
          </div>
        
        {client.sex === 1 ? <div className="inside-card"><img src={maleIcon} alt="maleIcon" className="icon"/>Homme</div>
                          : <div className="inside-card"><img src={femaleIcon} alt="femaleIcon" className="icon"/>Femme</div>}
        </div>
        
      <div className="content-card">
        <div className="inside-card">
          <img src={current} alt="CurrentWeight" className="icon" />
          <p>{client.weightStart} kg</p>

        </div>

        {client.weightStart === client.weightGoal ? (
          <img src={tropheegold} alt="Gold Trophy" className="icon-trophy" />
        ) : client.weightStart - client.weightGoal >= -3 && client.weightStart - client.weightGoal <= 3 ? (
          <img src={tropheesilver} alt="Silver Trophy" className="icon-trophy" />
        ) : client.weightStart - client.weightGoal >= -5 && client.weightStart - client.weightGoal <= 5 ? (
          <img src={tropheebronze} alt="Bronze Trophy" className="icon-trophy" />
        ) : (
          <span></span>
        )}

        <div className="inside-card">
          <img src={goal} alt="GoalWeight" className="icon  " />
          <p> {client.weightGoal} kg</p> 
        </div>
        
        </div>
      
    </div>
    
  );
}

export default ClientCard;
