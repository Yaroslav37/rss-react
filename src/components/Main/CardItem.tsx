import './Main.css';
import { Card } from '../../types/types';
import { Link } from 'react-router';

const CardItem: React.FC<Card> = ({ id, name, gender, height, mass }: Card) => {
  return (
    <Link to={`/rss-react/people/${id}`} key={id} className="card-block">
      <div className="card-name">{name}</div>
      <div className="card-item">Gender: {gender}</div>
      <div className="card-item">Height: {height} cm</div>
      <div className="card-item">Mass: {mass} kg </div>
    </Link>
  );
};

export default CardItem;
