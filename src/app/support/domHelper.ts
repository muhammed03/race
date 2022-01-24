export default {
  app: document.querySelector('#app') as HTMLBodyElement,
  getStartBtn: (id: number): HTMLButtonElement =>
    document.getElementById(`start-car-${id}`) as HTMLButtonElement,
  getStopBtn: (id: number): HTMLButtonElement =>
    document.getElementById(`brake-car-${id}`) as HTMLButtonElement,
  getCarElement: (id: number): HTMLElement =>
    document.getElementById(`car-${id}`) as HTMLElement,
  getCreateForm: (): HTMLFormElement =>
    document.getElementById('create-form') as HTMLFormElement,
  getUpdateForm: (): HTMLFormElement =>
    document.getElementById('update-form') as HTMLFormElement,
};
