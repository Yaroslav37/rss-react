import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Card, ProfileDetails } from '../types/types';

interface ApiProfileDetails {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

const convertToCamelCase = (data: ApiProfileDetails): ProfileDetails => {
  return {
    name: data.name,
    height: data.height,
    mass: data.mass,
    hairColor: data.hair_color,
    skinColor: data.skin_color,
    eyeColor: data.eye_color,
    birthYear: data.birth_year,
    gender: data.gender,
  };
};

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getHeroById: builder.query<ProfileDetails, string>({
      query: (id) => `people/${id}`,
      transformResponse: (response: ApiProfileDetails) =>
        convertToCamelCase(response),
    }),
    getHeroes: builder.query<Card[], undefined>({
      query: () => `people`,
    }),
  }),
});

export const { useGetHeroByIdQuery, useGetHeroesQuery } = swApi;
