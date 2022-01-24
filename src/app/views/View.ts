export default class View {
  setTitle(title: string): void {
    document.title = title;
  }

  async mount(): Promise<string> {
    return `
      <span>view</span>
    `;
  }
}
