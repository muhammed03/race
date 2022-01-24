import './style.scss';
import store from '../../services/store';

export default function render(): string {

  return `
        <footer>
            <div class="pagination">
                <button class="btn hidden" id="previous-page-btn" disabled>Previous</button>
                <h3>Page #<span id="pagination-page-number">${store.page}</span></h3>
                <button class="btn" id="next-page-btn">Next</button>
            </div>
        </footer>
    `;
}
