export default class Section {
  constructor(renderItem, containerSelector) {
    this._renderItem = renderItem;
    this._container = document.querySelector(containerSelector);
  }
  renderer(items) {
    items.forEach((item) => {
      this._renderItem(item);
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
