export default class Section {
  constructor({ items, renderer }, containerSelector) {
    //rendered items
    this._items = items;
    //render function - take the items and render them on to the page
    this._renderer = renderer;
    //the container of the rendered items on the page
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(item) {
    this._container.prepend(item);
  }
}
