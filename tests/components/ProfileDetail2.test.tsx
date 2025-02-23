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
import ProfileDetail from '../../src/components/ProfileDetail/ProfileDetail';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { ThemeProvider } from '../../src/components/contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
const mockLocation = { search: '?page=1' };

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
    useParams: () => ({ id: '111' }),
  };
});

const server = setupServer(
  http.get('https://swapi.dev/api/people/111', () => {
    return new HttpResponse(null, { status: 404 });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());

describe('ProfileDetail', () => {
  it('should show error message if API returns an error', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <ProfileDetail />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/not found/i)).toBeInTheDocument()
    );
  });
});
