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

interface Hero {
  name: string;
  gender: string;
  height: string;
  mass: string;
  url: string;
}

const convertHeroToCard = (hero: Hero): Card => {
  return {
    name: hero.name,
    gender: hero.gender,
    height: hero.height,
    mass: hero.mass,
    id: Number(hero.url.split('/').slice(-2, -1)[0]),
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
    getHeroes: builder.query<
      { results: Card[]; count: number },
      { searchQuery: string; page: number }
    >({
      query: ({ searchQuery, page }) => {
        const trimmedSearchValue = searchQuery.trim();
        const params = new URLSearchParams();

        if (page > 1) params.append('page', page.toString());
        if (trimmedSearchValue) params.append('search', trimmedSearchValue);
        return `people?${params.toString()}`;
      },
      transformResponse: (response: { results: Hero[]; count: number }) => {
        const peopleList: Card[] = response.results.map(convertHeroToCard);
        return { results: peopleList, count: response.count };
      },
    }),
  }),
});

export const { useGetHeroByIdQuery, useGetHeroesQuery } = swApi;
