import { Dish } from './dish.js'

export class Shelf {
    dishes = [];

    constructor(name, img) {
        this.name = name;
        this.img = img;
    }
    // #region Methods
    addDish(dish) {
        this.dishes.push(dish);
    }
    // #endregion
}