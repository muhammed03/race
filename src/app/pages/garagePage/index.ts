import headerRender from '../../components/Header/header';
import footerRender from '../../components/Footer/footer';
import settingsRender from './renderSettings';
import garageAsideRender from './renderGarageAside';
import garageRender from './renderGarage';
import './style.scss';

export default function render(): string {
  return `
    ${headerRender()}
    <div class="garage-upper-container">
      ${settingsRender()}
      ${garageAsideRender()}
    </div>
    <div class="cars">
      ${garageRender()}
    </div>
    <div>
        <p class="game-result hidden" id="game-result"></p>
    </div>
    ${footerRender()}
  `;
}
