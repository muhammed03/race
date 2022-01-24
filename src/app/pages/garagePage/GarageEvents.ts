import store from '../../services/store';
import domHelper from '../../support/domHelper';
import { startDriving, stopDriving, updateCarsContainer } from './models';
import {
  getDeleteCarById,
  getCreateCar,
  getCarById,
  getUpdateCarById,
} from '../../services/api';
import { generateRandomCars, race } from '../../support/utils';

export default class GarageEvents {
  events() {
    updateCarsContainer();
    domHelper.app.addEventListener('click', async (event) => {
      const target = <HTMLBodyElement>event.target;
      const targetId = target.id;

      if (target.classList.contains('start-btn')) {
        const id = Number(targetId.split('start-car-')[1]);
        await store.fetchCars();
        await startDriving(id);
      }

      if (target.classList.contains('stop-btn')) {
        const id = Number(targetId.split('brake-car-')[1]);
        await store.fetchCars();
        await stopDriving(id);
      }

      if (target.classList.contains('remove-btn')) {
        const id = Number(targetId.split('remove-btn-')[1]);
        await getDeleteCarById(id);
        await store.fetchCars();
        updateCarsContainer();
      }

      if (target.classList.contains('generate-btn')) {
        const generateBtn = event.target as HTMLButtonElement;
        generateBtn.disabled = true;

        const generatedCars = generateRandomCars();
        await Promise.all(generatedCars.map(async (car) => getCreateCar(car)));
        await store.fetchCars();
        updateCarsContainer();

        generateBtn.disabled = false;
      }

      if (target.classList.contains('race-btn')) {
        await store.fetchCars();
        const raceBtn = <HTMLButtonElement>event.target;
        raceBtn.disabled = true;

        const winner = await race(startDriving);
        const winMsg = document.getElementById('game-result') as HTMLElement;
        winMsg.innerHTML = `${winner.name} win for ${winner.animationTime} secs!`;
        winMsg.classList.remove('hidden');

        const resetBtn = document.getElementById(
          'reset-btn'
        ) as HTMLButtonElement;
        resetBtn.disabled = false;
      }

      if (target.classList.contains('reset-btn')) {
        await store.fetchCars();
        const resetBtn = <HTMLButtonElement>event.target;

        resetBtn.disabled = true;
        store.cars.map(({ id }) => stopDriving(id));
        const winMsg = document.getElementById('game-result') as HTMLElement;
        winMsg.classList.add('hidden');
        const raceBtn = document.getElementById(
          'race-btn'
        ) as HTMLButtonElement;
        raceBtn.disabled = false;
      }

      if (target.classList.contains('select-btn')) {
        let selectedCar = null;

        const carUpdName = document.getElementById(
          'update-name'
        ) as HTMLInputElement;
        const carUpdColor = document.getElementById(
          'update-color'
        ) as HTMLInputElement;
        const updateBtn = document.getElementById(
          'update-btn'
        ) as HTMLButtonElement;

        selectedCar = await getCarById(targetId.split('select-btn-')[1]);
        store.updateCarId = Number(targetId.split('select-btn-')[1]);
        carUpdName.value = selectedCar.name;
        carUpdColor.value = selectedCar.color;
        carUpdName.disabled = false;
        carUpdColor.disabled = false;
        updateBtn.disabled = false;
      }

      if (targetId == 'previous-page-btn') {
        if (store.page !== 1) {
          store.page -= 1;
          await store.fetchCars();
          updateCarsContainer();
        }

      }

      if (targetId == 'next-page-btn') {
        store.page += 1;

        await store.fetchCars();
        updateCarsContainer();
      }
    });

    const createForm = domHelper.getCreateForm() as HTMLFormElement;
    const createBtn = document.getElementById(
      'create-car-btn'
    ) as HTMLButtonElement;

    createForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      createBtn.disabled = true;
      const nameInput = document.getElementById(
        'create-name'
      ) as HTMLInputElement;
      const colorInput = document.getElementById(
        'create-color'
      ) as HTMLInputElement;

      const car = { name: nameInput.value, color: colorInput.value };

      await getCreateCar(car);
      await store.fetchCars();
      updateCarsContainer();
      createBtn.disabled = false;
      nameInput.value = '';
      colorInput.value = '#ffffff';
    });

    const updateForm = domHelper.getUpdateForm() as HTMLFormElement;
    const updateBtn = document.getElementById(
      'update-btn'
    ) as HTMLButtonElement;

    updateForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nameInput = document.getElementById(
        'update-name'
      ) as HTMLInputElement;
      const colorInput = document.getElementById(
        'update-color'
      ) as HTMLInputElement;

      const car = { name: nameInput.value, color: colorInput.value };

      await getUpdateCarById(car, store.updateCarId);
      await store.fetchCars();
      updateCarsContainer();
      nameInput.value = '';
      colorInput.value = '#ffffff';
      nameInput.disabled = true;
      colorInput.disabled = true;
      store.updateCarId = 0;
      updateBtn.disabled = true;
    });
  }
}
