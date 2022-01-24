import store from '../../services/store';

export default function render(): string {
  return `
        <div class="garage-info">
                <h4>Page #<span id="page-number">${store.page}</span></h4>
                <h4>Cars in garage: <span id="cars-total">${store.carsCount}</span></h4>
        </div>
    `;
}
