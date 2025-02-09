import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import spinner from '../../assets/spinner.svg';
import { ProfileDetails } from '../../types/types';

export default function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<ProfileDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        const profileData: ProfileDetails = {
          name: data.name,
          height: data.height,
          mass: data.mass,
          hairColor: data.hair_color,
          skinColor: data.skin_color,
          eyeColor: data.eye_color,
          birthYear: data.birth_year,
          gender: data.gender,
        };
        console.log(data);
        setProfile(profileData);
      } catch (e) {
        setError((e as Error).message);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search);
    navigate(`/rss-react?${searchParams.toString()}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="details">
        <img style={{ width: '50px' }} src={spinner} alt="Loading" />
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
      <button style={{ backgroundColor: 'orange' }} onClick={handleClose}>
        Close
      </button>
    </div>
  );
}
