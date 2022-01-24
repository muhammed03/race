import {
  getStartEngine,
  getStopEngine,
  getDriveStatus
} from '../../services/api';
import { getDistanceBtwElements, animation } from '../../support/utils';
import renderGarage from './renderGarage';
import store from '../../services/store';
import domHelper from '../../support/domHelper';

export const startDriving = async (id: number) => {
  const startButton = domHelper.getStartBtn(id) as HTMLButtonElement;
  startButton.disabled = true;
  startButton.classList.toggle('enabling', true);

  const {
    velocity,
    distance,
  }: {
    velocity: number;
    distance: number;
  } = await getStartEngine(id);

  const animationTime = Math.round(distance / velocity);

  startButton.classList.toggle('enabling', false);

  const stopButton = domHelper.getStopBtn(id) as HTMLButtonElement;
  stopButton.disabled = false;

  const car = document.getElementById(`car-${id}`) as HTMLElement;
  const finish = document.getElementById(`finish-${id}`) as HTMLDivElement;
  const distanceBtwElem = Math.floor(getDistanceBtwElements(car, finish)) + 100;

  store.animation[id] = animation(car, distanceBtwElem, animationTime);

  const { success } = await getDriveStatus(id);
  if (!success) window.cancelAnimationFrame(store.animation[id].id);

  return { success, id, animationTime };
};

export const stopDriving = async (id: number) => {
  const stopButton = domHelper.getStopBtn(id) as HTMLButtonElement;
  stopButton.disabled = true;
  stopButton.classList.toggle('enabling', true);

  await getStopEngine(id);

  stopButton.classList.toggle('enabling', false);

  const startButton = domHelper.getStartBtn(id) as HTMLButtonElement;
  startButton.disabled = false;

  const car = domHelper.getCarElement(id);
  car.style.transform = 'translateX(0)';

  if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id);
};

export const updateCarsContainer = () => {
  const carsContainer = document.querySelector('.cars') as HTMLElement;
  carsContainer.innerHTML = renderGarage();

  const pageNumberSpan = document.getElementById(
    'page-number'
  ) as HTMLSpanElement;
  pageNumberSpan.innerText = `${store.page}`;

  const carsTotalSpan = document.getElementById(
    'cars-total'
  ) as HTMLSpanElement;
  carsTotalSpan.innerText = `${store.carsCount}`;

  const pagPageNumber = document.getElementById('pagination-page-number') as HTMLSpanElement;
  pagPageNumber.innerText = `${store.page}`;

  const prevPageBtn = document.getElementById('previous-page-btn') as HTMLButtonElement;
  const nextPageBtn = document.getElementById('next-page-btn') as HTMLButtonElement;

  if (store.page == 1) {
    prevPageBtn.classList.add('hidden');
    prevPageBtn.disabled = true;
  } else  {
    prevPageBtn.classList.remove('hidden');
    prevPageBtn.disabled = false;
  }

  const carsCount:number = parseInt(store.carsCount);


  if ( carsCount > store.page * 7 ) {
    nextPageBtn.classList.remove('hidden');
    nextPageBtn.disabled = false;
  } else  {
    nextPageBtn.classList.add('hidden');
    nextPageBtn.disabled = true;
  }
};
