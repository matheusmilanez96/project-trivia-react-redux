import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testa as funcionalidades do componente Login', () => {
  it('Deve ter dois inputs renderizados na tela e dois botões', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    expect(inputName).toBeInTheDocument();
    
    const inputEmail = screen.getByTestId("input-gravatar-email");
    expect(inputEmail).toBeInTheDocument();

    const buttonEnter = screen.getByRole('button', { name: /Play/i });
    expect(buttonEnter).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();

    const buttonConfig = screen.getByRole('button', { name: /Configurações/i });
    expect(buttonConfig).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('Botão Configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonConfig = screen.getByRole('button', { name: /Configurações/i });
    expect(buttonConfig).toBeInTheDocument();

    userEvent.click(buttonConfig);
    expect(history.location.pathname).toBe('/settings');

    const title = screen.getByRole('heading', { name: /Configurações/i });
    expect(title).toBeInTheDocument();
  });

  it('Botão Play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonEnter = screen.getByRole('button', { name: /Play/i });
    expect(buttonEnter).toBeDisabled();

    const inputName = screen.getByTestId("input-player-name");
    expect(inputName).toBeInTheDocument();

    userEvent.type(inputName, "João");
    expect(buttonEnter).toBeDisabled();
    
    const inputEmail = screen.getByTestId("input-gravatar-email");
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, 'teste@teste.com');

    expect(buttonEnter).toBeVisible();
    userEvent.click(buttonEnter);

    const tokenResponse = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };
  
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(tokenResponse.token),
    });

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    
    expect(history.location.pathname).toBe('/game');
  });
})