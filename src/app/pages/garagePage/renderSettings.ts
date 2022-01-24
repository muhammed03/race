export default function render(): string {
  return `
      <div class="settings">
            <div>
                <h2 class="settings__title">Settings</h2>
                <form class="form" id="create-form">
                  <input class="input" id="create-name" name="name" type="text" />
                  <input
                    class="color"
                    id="create-color"
                    name="color"
                    type="color"
                    value="#ffffff"
                  />
                  <button class="btn" id="create-car-btn" type="submit">Create</button>
                </form>
                <form class="form" id="update-form">
                  <input
                    class="input"
                    id="update-name"
                    name="name"
                    type="text"
                    disabled
                  />
                  <input
                    class="color"
                    id="update-color"
                    name="color"
                    type="color"
                    value="#ffffff"
                    disabled
                  />
                  <button class="btn" id="update-btn" type="submit">
                    Update
                  </button>
                </form>
            </div>
            <div class="controls">
                <button class="btn race-btn" id="race-btn">Race</button>
                <button class="btn reset-btn" id="reset-btn" disabled>Reset</button>
                <button class="btn generate-btn" id="generate-btn">Generate</button>
            </div>
      </div>
    `;
}
