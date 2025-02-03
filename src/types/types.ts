import { ReactNode } from 'react';

export interface Card {
  name: string;
  gender: string;
  height: string;
  mass: string;
}

export interface SearchPageState {
  searchValue: string;
  results: Card[];
  errorMessage: string | null;
  isLoading: boolean;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorButtonProps {
  onClick: () => void;
}

export interface HeaderProps {
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchButtonProps {
  onClick: () => void;
}

export interface CardListProps {
  results: Card[];
}
