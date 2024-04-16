import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";
import trophy from "../assets/trophy.png";
import ruler from "../assets/ruler.svg";
import goal from "../assets/goal.svg";
import current from "../assets/current.svg";
import profilepic from "../assets/profilepic.svg"
import { Link, useNavigate } from 'react-router-dom';

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
        
        {client.sex === 1 ? <div className="inside-card"><img src={maleIcon} alt="maleIcon" className="icon"/>Male</div>
                          : <div className="inside-card"><img src={femaleIcon} alt="femaleIcon" className="icon"/>Female</div>}
        </div>
        
        <div className="content-card">
          <div className="inside-card">
          <img src={current} alt="CurrentWeight" className="icon" />
          <p>{client.weightStart} kg</p>
        
        </div>

        {client.weightStart === client.weightGoal ? <img src={trophy} alt="trophy" className="icon"></img> :<span></span>}
        
        <div className="inside-card">
          <img src={goal} alt="GoalWeight" className="icon  " />
          <p> {client.weightGoal} kg</p> 
        </div>
        
        </div>
      
    </div>
    
  );
}

export default ClientCard;
