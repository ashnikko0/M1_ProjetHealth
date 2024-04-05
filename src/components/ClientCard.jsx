import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";

function ClientCard({ client }) {

  return (
    <div className="client-card">
      <h2>{client.firstname} {client.lastname}</h2>
      <p>Taille : {client.height}</p>
      <p>Poids de départ : {client.weightStart}</p>
      <p>Objectif poids : {client.weightGoal}</p>
      {client.sex === 1 ? <img src={maleIcon} alt="maleIcon" className="sexIcon"/> : <img src={femaleIcon} alt="femaleIcon" className="sexIcon"/>}
      
    </div>
  );
}

export default ClientCard;

/*faire un beau découpage pour avoir des belles cartes

-afficher un icone si l'objectif poids est atteint */
