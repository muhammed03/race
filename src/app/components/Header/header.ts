import './style.scss';

export default function render(): string {
  return `
      <header class="header">
        <h1 class="header__title"> Async Race</h1>
        <div class="header__links-container">
          <a class="header__link" href="/" data-link>
            garage
          </a>
          <a class="header__link" href="/winner" data-link>
            winners
          </a>
        </div>
      </header>
    `;
}
