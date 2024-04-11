import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";
import { Link } from 'react-router-dom';
import ClientDetails from "./ClientDetails";

function ClientCard({ client }) {

  //chaque div de la card aura un style particulier
  return (
    <div className="client-card">
       <Link to={ClientDetails}>
        
        <div>
        <h2>{client.firstname} {client.lastname}</h2>
        </div>

        <div>
        {client.sex === 1 ? <img src={maleIcon} alt="maleIcon" className="sexIcon"/> : <img src={femaleIcon} alt="femaleIcon" className="sexIcon"/>}
        <p>Taille : {client.height}</p>
        </div>

        <div>
        <p>Poids de départ : {client.weightStart}</p>
        <p>Objectif poids : {client.weightGoal}</p>
        </div>
      
      </Link>
    </div>
    
  );
}

export default ClientCard;

/*faire un beau découpage pour avoir des belles cartes

-afficher un icone si l'objectif poids est atteint 
-ajouter des photos/image de gens ? */
