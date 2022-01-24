import headerRender from '../../components/Header/header';
import renderWinnerMain from './renderWinnerTable';
import './style.scss';

export default function render(): string {
  return `
    ${headerRender()}
    ${renderWinnerMain()}
  `;
}
