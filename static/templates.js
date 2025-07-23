export class Template{
    // #region Methods
    // #region Dish
    static shelf (name, img) {
        return /*html*/`
            <section class="shelf">
                <header>
                    <h2>${name}</h2>
                    <img src="static/assets/img/${img}.svg">
                </header>
                <div class="dish-wrapper"></div>
            </section>
        `
    }

    static dish (dish) {
        return /*html*/`
            <div class="dish-card">
                <div class="dish-img-wrapper">
                    <img src="static/assets/img/dish/${dish.dishId}.jpg" class="dish-img">
                    <img src="static/assets/img/restaurant/${dish.restId}.png" class="rest-img">
                </div>
                <div class="dish-desc">
                    <table>
                        <tr><td><h3>${dish.dishName}</h3></td></tr>
                        <tr><td class="dish-review"></td></tr>
                        <tr><td class="desc">${dish.desc}</td></tr>
                        <tr><td><h4>${dish.restaurantName}</span></h4></td></tr>
                        <tr><td class="restaurant-review"></td></tr>
                    </table>
                </div>
                <span class="price">${dish.currency()}</span>
                <button class="add-btn">+</button>
            </div>
        `
    }

    static star() {
        return /*html*/`
            <img src="static/assets/icons/star.svg" class="star">
        `
    }

    static starFull() {
        return /*html*/`
            <img src="static/assets/icons/star_full.svg" class="star">
        `
    }

    // #endregion
    // #region Cart
    static cartContent (sum, delivery, total) {
        return /*html*/`
            <table></table>
            <table>
                <tr><td class="flex-col">Wert:</td><td class="value">${sum}</td></tr>
                <tr><td class="flex-col">Versand:</td><td class="value">${delivery}</td></tr>
                <tr><td class="flex-col total">Gesamt:</td><td class="value total">${total}</td></tr>
            </table>
        `
    }

    static singleItem (item) {
        return /*html*/`
            <td class="w16"><button class="inc">+</button></td>
            <td class="w16 ta-right">${item.amount}</td>
            <td class="w16"><button class="dec">-</button></td>
            <td class="w16">x</td>
            <td>${item.dish.dishName}</td>
            <td class="w16"><button class="del"><img src="static/assets/icons/delete.svg"></button></td>
            <td class="w80 ta-right">${item.euroValue}</td>
        `
    }

    static singleItemEntry (key, value) {
        return /*html*/`
            <td colspan="6">${key}</td>
            <td class="ta-right">${value}</td>
        `
    }

    static summary() {
        return /*html*/`
            <h4>Bestellung:</h4>
            <p>Diese Atikel werden versendet:</p>
            <table></table>
        `
    }

    static summarySingleItem(item) {
        return /*html*/`
            <td class="w16 ta-right">${item.amount}</td>
            <td class="w16">x</td>
            <td>${item.dish.dishName}</td>
            <td class="w80 ta-right">${item.euroValue}</td>
        `
    }

    static summarySingleEntry(key, value) {
        return /*html*/`
            <td colspan="3">${key}</td>
            <td class="ta-right">${value}</td>
        `
    }

    static cartBtn (value) {
        return /*html*/`
            <button class="cart-btn">Warenkorb<br/>(${value})</button>
        `
    }
    // #endregion
    // #endrgion
}