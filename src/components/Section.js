export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, position) {

    switch (position) {
      case 'prepend':
        this._container.prepend(element)
        break;
      case 'append':
        this._container.append(element);
        break;
      default:
        console.error('Не валидное значение для параметра position')
    }
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
