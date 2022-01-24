import store from '../../services/store';
import generateCar from './generateCar';

export default function render(): string {
  return `
        ${store.cars.map((car) => generateCar(car)).join('')}
    `;
}
