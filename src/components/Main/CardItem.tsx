import './Main.css';
import { Card } from '../../types/types';

const CardItem: React.FC<Card> = ({ name, gender, height, mass }: Card) => {
  return (
    <div className="card-block">
      <div className="card-name">{name}</div>
      <div className="card-item">Gender: {gender}</div>
      <div className="card-item">Height: {height} cm</div>
      <div className="card-item">Mass: {mass} kg </div>
    </div>
  );
};

export default CardItem;
