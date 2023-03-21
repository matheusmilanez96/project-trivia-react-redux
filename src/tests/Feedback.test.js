import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';

describe('Testa as funcionalidades do componente Feedback', () => {
  it('Verifica se possui dois botões renderizados na tela', () => {
    renderWithRouterAndRedux(<Feedback />)

    const buttonPlay = screen.getByRole('button', { name: /Play Again/i });
    expect(buttonPlay).toBeVisible();
    
    const buttonRanking = screen.getByRole('button', { name: /Ranking/i });
    expect(buttonRanking).toBeVisible();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('Botão Play Again', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)

    const buttonPlay = screen.getByRole('button', { name: /Play Again/i });
    expect(buttonPlay).toBeVisible();

    userEvent.click(buttonPlay);
    expect(history.location.pathname).toBe('/');

    const inputName = screen.getByTestId("input-player-name");
    expect(inputName).toBeInTheDocument();
    
    const inputEmail = screen.getByTestId("input-gravatar-email");
    expect(inputEmail).toBeInTheDocument();

    const buttonEnter = screen.getByRole('button', { name: /Play/i });
    expect(buttonEnter).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();

    const buttonConfig = screen.getByRole('button', { name: /Configurações/i });
    expect(buttonConfig).toBeInTheDocument();
  });

  it('Botão Ranking', () => {
    const {history} = renderWithRouterAndRedux(<Feedback />)
    
    const buttonRanking = screen.getByRole('button', { name: /Ranking/i });
    expect(buttonRanking).toBeVisible();

    userEvent.click(buttonRanking);
    expect(history.location.pathname).toBe('/ranking');

    const titleRanking = screen.getByRole('heading', { name: /Ranking/i });
    expect(titleRanking).toBeVisible();
  });
})
