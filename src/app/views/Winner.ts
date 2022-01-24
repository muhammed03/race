import View from './View';
import renderWinnerView from '../pages/winnerPage/index';

import store from '../services/store';

export default class Garage extends View {
  constructor() {
    super();
    this.setTitle(`Winner`);
  }

  async mounted() {

  }

  async mount() {
    await store.fetchCars();

    return `
      ${renderWinnerView()}    
      <img class="bg-car" src="../assets/car.png"/>
    `;
  }
}
