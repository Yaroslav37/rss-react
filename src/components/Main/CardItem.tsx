import { Card } from '../../types/types';
import { useLocation, useNavigate } from 'react-router';

const CardItem: React.FC<Card> = ({
  url,
  name,
  gender,
  height,
  mass,
}: Card) => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailsId = location.pathname.split('/').pop();
  const id = url.split('/').slice(-2, -1)[0];

  const handleClick = () => {
    if (detailsId === id) {
      navigate(`/rss-react${location.search}`);
    } else {
      navigate(`/rss-react/details/${id}${location.search}`);
    }
  };

  return (
    <div onClick={handleClick} className="card-block">
      <div className="card-name">{name}</div>
      <div className="card-item">Gender: {gender}</div>
      <div className="card-item">Height: {height} cm</div>
      <div className="card-item">Mass: {mass} kg</div>
    </div>
  );
};

export default CardItem;
