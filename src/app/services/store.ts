import { getCars } from './api';

class Cars {
  cars = [];
  page = 1;
  carsCount = '0';
  animation: { [key: number]: { id: number } } = {};
  updateCarId = 0;


  async fetchCars() {
    const { items: cars, count: carsCount } = await getCars(this.page);
    this.cars = cars;
    this.carsCount = carsCount;
  }
}

const data: Cars = new Cars();

export default data;
