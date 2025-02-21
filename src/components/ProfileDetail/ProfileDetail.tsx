import { useParams, useNavigate, useLocation } from 'react-router';
import { useGetHeroByIdQuery } from '../../services/starwars';
import Spinner from '../common/Spinner';

export default function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: profile, error, isFetching } = useGetHeroByIdQuery(id || '');

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search);
    navigate(`/rss-react?${searchParams.toString()}`);
  };

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (isFetching) {
    return (
      <div className="details">
        <Spinner />
      </div>
    );
  }
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details">
      <div>Name: {profile.name}</div>
      <div>Height: {profile.height}</div>
      <div>Mass: {profile.mass}</div>
      <div>Hair Color: {profile.hairColor}</div>
      <div>Skin Color: {profile.skinColor}</div>
      <div>Eye Color: {profile.eyeColor}</div>
      <div>Birth Year: {profile.birthYear}</div>
      <div>Gender: {profile.gender}</div>
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
}
