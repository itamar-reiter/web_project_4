export default class Section {
  constructor({items, renderer}, containerSelector){
    //rendered cards (the cards)
    this._items = items;
    //render function - take the items and render them on to the page
    this._renderer = renderer;
    //the container of the rendered items on the page
    this._containerSelector = containerSelector;
  }

  renderItems(){
    forEach(element)
  }

  addItem(){
    this._container.append(this._item);
  }

  //insert a list of cards
  //for chosen card, take the container and put inside it the card


}