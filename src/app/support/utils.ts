import store from '../services/store';

const getElemPosition = (elem: HTMLElement) => {
  const { top, left, width, height } = elem.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export const getDistanceBtwElements = (
  firstElem: HTMLElement,
  secondElem: HTMLElement
): number => {
  const firstElemPos = getElemPosition(firstElem);
  const secondElemPos = getElemPosition(secondElem);

  return Math.hypot(
    firstElemPos.x - secondElemPos.x,
    firstElemPos.y - secondElemPos.y
  );
};

export const animation = (
  car: HTMLElement,
  distanceBtwElem: number,
  animationTime: number
): { id: number } => {
  let start: number | null = null;
  const state: {
    id: number;
  } = { id: 1 };

  const getStep = (timestamp: number) => {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distanceBtwElem / animationTime));
    car.style.transform = `translateX(${Math.min(passed, distanceBtwElem)}px)`;

    if (passed < distanceBtwElem) {
      state.id = window.requestAnimationFrame(getStep);
    }
  };

  state.id = window.requestAnimationFrame(getStep);

  return state;
};

const brands = ['Toyota', 'Nissan', 'Audi', 'BMW', 'Mercedes', 'Subaru'];
const models = ['Camry', 'Almera', 'Q5 Sportback', 'M5', 'CLS', 'Forester'];

const getRandomCarName = () => {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];

  return `${brand} ${model}`;
};

const getRandomCarColor = () => {
  const hexLetters = '0123456789ABCDEF';
  let carColor = '#';

  for (let i = 0; i < 6; i += 1) {
    carColor += hexLetters[Math.floor(Math.random() * 16)];
  }

  return carColor;
};

export const generateRandomCars = (
  carCount = 100
): Array<{ name: string; color: string }> =>
  new Array(carCount)
    .fill(1)
    .map(() => ({ name: getRandomCarName(), color: getRandomCarColor() }));

export const raceAll = async (
  promises: Array<
    Promise<{
      animationTime: number;
      id: number;
      success: boolean;
    }>
  >,
  ids: number[]
): Promise<{
  name: string;
  color: string;
  id: number;
  animationTime: number;
}> => {
  const { success, id, animationTime } = await Promise.race(promises);

  if (!success) {
    const failedIndex = ids.findIndex((i) => i === id);
    const restPromises = [
      ...promises.slice(0, failedIndex),
      ...promises.slice(failedIndex + 1, promises.length),
    ];
    const restIds = [
      ...ids.slice(0, failedIndex),
      ...ids.slice(failedIndex + 1, ids.length),
    ];
    return raceAll(restPromises, restIds);
  }

  const winner: {
    name: string;
    color: string;
    id: number;
  } = store.cars.filter(
    (car: { name: string; color: string; id: number }): boolean => car.id === id
  )[0];

  return {
    ...winner,
    animationTime: Number((animationTime / 1000).toFixed(2)),
  };
};

export const race = async (action: {
  (id: number): Promise<{
    success: boolean;
    id: number;
    animationTime: number;
  }>;
}): Promise<{
  name: string;
  color: string;
  id: number;
  animationTime: number;
}> => {
  const promises = store.cars.map(({ id }) => action(id));


  const winner = await raceAll(
    promises,
    store.cars.map((car: { name: string; color: string; id: number }) => car.id)
  );

  return winner;
};
