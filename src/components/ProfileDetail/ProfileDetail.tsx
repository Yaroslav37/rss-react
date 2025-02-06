import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import spinner from '../../assets/spinner.svg';

interface ProfileDetails {
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
}

export default function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
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
        setProfile(profileData);
      } catch (e) {
        setError((e as Error).message);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <img style={{ width: '50px' }} src={spinner} alt="Loading..." />;
  }

  return (
    <div>
      <div>Name: {profile.name}</div>
      <div>Height: {profile.height}</div>
      <div>Mass: {profile.mass}</div>
      <div>Hair Color: {profile.hairColor}</div>
      <div>Skin Color: {profile.skinColor}</div>
      <div>Eye Color: {profile.eyeColor}</div>
      <div>Birth Year: {profile.birthYear}</div>
      <div>Gender: {profile.gender}</div>
    </div>
  );
}
