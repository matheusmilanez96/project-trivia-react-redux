import App from '../App';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testa as funcionalidades do componente Login', () => {
  it('A rota para esta página deve ser /', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });

  it('Deve ter dois inputs renderizados na tela e dois botões', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    expect(inputName).toBeInTheDocument();
    
    const inputEmail = screen.getByTestId("input-gravatar-email");
    expect(inputEmail).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('Botão Configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonConfig = screen.getByRole('button', { name: /Configurações/i });
    expect(buttonConfig).toBeInTheDocument();

    userEvent.click(buttonConfig);
    expect(history.location.pathname).toBe('/settings');
  });

  it('Botão Entrar', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const token = jest.fn();
    expect(token).toHaveBeenCalledTimes(0);

    const buttonEnter = screen.getByRole('button', { name: /Entrar/i });
    expect(buttonEnter).toBeDisabled();

    const inputName = screen.getByTestId("input-player-name");
    expect(inputName).toBeInTheDocument();

    userEvent.type(inputName, "João");
    
    const inputEmail = screen.getByTestId("input-gravatar-email");
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, 'teste@teste.com');

    expect(buttonEnter).toBeVisible();
    userEvent.click(buttonEnter);

    expect(token).toHaveBeenCalledTimes(1);

    expect(history.location.pathname).toBe('/game');
  });
})