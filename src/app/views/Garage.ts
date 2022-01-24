import View from './View';
import renderGarageView from '../pages/garagePage/index';
import GarageEvents from '../pages/garagePage/GarageEvents';

import store from '../services/store';

const garageEvents = new GarageEvents();
export default class Garage extends View {
  constructor() {
    super();
    this.setTitle(`GARAGE`);
  }

  async mounted() {
    alert('Check console to see the score! \nPagination buttons will occur when the number of cars will more than 7😁');
    garageEvents.events();
  }

  async mount() {
    await store.fetchCars();

    return `
      ${renderGarageView()}    
      <img class="bg-car" src="../assets/car.png"/>
    `;
  }
}
