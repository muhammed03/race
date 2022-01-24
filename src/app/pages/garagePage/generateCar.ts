import renderCar from './renderCarIco';

export default function render({
  id,
  name,
  color,
  isStatusDrive,
}: {
  id: string;
  name: string;
  color: string;
  isStatusDrive: boolean;
}): string {
  return `
    <div class="car-controls">
        <button class="btn select-btn" id="select-btn-${id}">Select</button>
        <button class="btn remove-btn" id="remove-btn-${id}">Remove</button>
        <span class="car-model">${name}</span>
    </div>
    <div class="track">
      <div class="car-control-container">
        <div class="engine-panel">
          <button class="engine-icon start-btn" id="start-car-${id}" ${
    isStatusDrive ? 'disabled' : ''
  } >A</button>
          <button class="engine-icon stop-btn" id="brake-car-${id}" ${
    !isStatusDrive ? 'disabled' : ''
  } >B</button>
        </div>
        <div class="car" id="car-${id}">
          ${renderCar(color)}
        </div>
      </div>
      <div class="finish" id="finish-${id}">🚩</div>
    </div>`;
}
