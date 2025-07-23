// #region Imports
import { Shelf } from './shelf.js';
import { Dish } from './dish.js';
import { Cart, CartItem } from './cart.js';
import { Template } from './templates.js';
// #endregion
export class Market {
    // #region attributes
    refMain = document.querySelector('.render-main');
    local = 'http://localhost:5000/';
    server = 'http://164.92.201.35:8000/';
    url = this.local;
    cart = null;
    // #endregion
    constructor() {
        this.shelves = [
            new Shelf ('Burger', 'burger'),
            new Shelf ('Nudelgerichte', 'noodle'),
            new Shelf ('Pizzen', 'pizza'),
            new Shelf ('Sushi', 'sushi')
        ];
        this.cart = new Cart();
    }

    // #region Methods
    //  #region Render

    renderShelves () {
        this.refMain.innerHTML = '';
        this.shelves.forEach(shelf => {
            this.refMain.innerHTML += Template.shelf(shelf.name, shelf.img);
        });
        this.refMain.innerHTML += Template.cartBtn();
    }

    renderDishes () {
        const dishWrappers = document.querySelectorAll('.dish-wrapper');
        for(let i=0; i < this.shelves.length; i++) {
            for(let j=0; j < this.shelves[i].dishes.length; j++) {
                dishWrappers[i].innerHTML += Template.dish(this.shelves[i].dishes[j]);
            }
        }
    }

    renderReviews () {
        const refDishReview = document.querySelectorAll('.dish-review');
        const  refRestaurantReview = document.querySelectorAll('.restaurant-review');

        for (let i = 0, k = 0; i < this.shelves.length; i++) {
            for (let j = 0; j < this.shelves[i].dishes.length; j++, k++) {
                for (let m = 0; m < 5; m++) {
                    
                    if (this.shelves[i].dishes[j].dishReview > m) {
                        refDishReview[k].innerHTML += Template.starFull();
                    } else {
                        refDishReview[k].innerHTML += Template.star();
                    }

                    if (this.shelves[i].dishes[j].restaurantReview > m) {
                        refRestaurantReview[k].innerHTML += Template.starFull();
                    } else {
                        refRestaurantReview[k].innerHTML += Template.star();
                    }
                }
            }
        }
    }

    // #endregion
    // #region Events
    addDishCardEvent() {
        const addBtns = document.querySelectorAll('.add-btn');
        for (let i = 0, k = 0; i < this.shelves.length; i++) {
            for (let j = 0; j < this.shelves[i].dishes.length; j++, k++) {
                addBtns[k].addEventListener('click', () => {
                    this.cart.addItem(this.shelves[i].dishes[j]);
                });
            }
        }
    }
    // #endregion

    // #region Requests
    async loadDishes() {
        try {
            const response = await fetch(this.url + 'items/');
            if (response.ok) {
                const dishes = await response.json();
                dishes.forEach ((dish, dishIndex) => {
                    if (dish.type == 'Burger') this.shelves[0].addDish (new Dish(dish.name, dish.desc, dish.price, dish.review, dish.id, dish.restaurant.name, dish.restaurant.review, dish.restaurant.id, dishIndex));
                    if (dish.type == 'Pasta') this.shelves[1].addDish (new Dish(dish.name, dish.desc, dish.price, dish.review, dish.id, dish.restaurant.name, dish.restaurant.review, dish.restaurant.id, dishIndex));
                    if (dish.type == 'Pizza') this.shelves[2].addDish (new Dish(dish.name, dish.desc, dish.price, dish.review, dish.id, dish.restaurant.name, dish.restaurant.review, dish.restaurant.id, dishIndex));
                    if (dish.type == 'Sushi') this.shelves[3].addDish (new Dish(dish.name, dish.desc, dish.price, dish.review, dish.id, dish.restaurant.name, dish.restaurant.review, dish.restaurant.id, dishIndex));
                });
                this.renderShelves();
                this.renderDishes();
                this.renderReviews();
                this.addDishCardEvent();
            } else {
                let output = '';
                switch (response.status) {
                    case 404: output = 'Datenbank wurde nicht gefunden'
                }
                this.refMain.innerHTML = Template.errMsg(output);
            }
        } catch (error) {
            console.error(error);
        }
    }
    // #endregion
    // #endregion
}