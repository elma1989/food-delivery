export class Dish {
    constructor(dishName, desc, price, dishReview, dishId, restaurantName, restauentReview, restId, dishIndex) {
        this.dishName = dishName;
        this.desc = desc;
        this.price = price;
        this.dishReview = dishReview;
        this.dishId = dishId;
        this.restaurantName = restaurantName;
        this.restaurantReview = restauentReview;
        this.restId = restId;
        this.dishIndex = dishIndex;
    }
    currency () {
        return new Intl.NumberFormat('DE-de', {style:'currency', currency:'EUR'}).format(this.price)
    }
}