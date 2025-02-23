import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterEach,
  afterAll,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import ProfileDetail from '../../src/components/ProfileDetail/ProfileDetail';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { ThemeProvider } from '../../src/components/contexts/ThemeContext';

const mockNavigate = vi.fn();
const mockLocation = { search: '?page=1' };

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
    useParams: () => ({ id: '1' }),
  };
});

const server = setupServer(
  http.get('https://swapi.dev/api/people/:id', () => {
    return HttpResponse.json({
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      hair_color: 'blond',
      eye_color: 'blue',
      height: '172',
      mass: '77',
      skin_color: 'fair',
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());

describe('ProfileDetail', () => {
  it('should render person details after fetching data', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ProfileDetail />
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair Color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Skin Color: fair/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
  });

  it('should navigate to main page when close button is clicked', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ProfileDetail />
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument()
    );

    const closeButton = screen.getByRole('button', { name: /Close/i });
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/rss-react?page=1');
  });
});
