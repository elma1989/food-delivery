export class Template{
    // #region Methods
    static errMsg(msg) {
        return /*html*/`
            <div class="status-msg">Fehler: ${msg}</div>
        `
    }

    static li(desc) {
        return /*html*/`
            <li><button>${desc}</button></li>
        `
    }

    static greating() {
        return /*html*/`
            <h1>Herzlich Willkommen in der Bestell-App.</h1>
        `
    }
    
    static form(name) {
        return /*html*/`
            <form>
                <fieldset>
                    <legend>${name}</legend>
                </fieldset>
            </form>
            <div class="status-msg"></div>
        `
    }
    // #region Form
    static forminput(name, id, type='text') {
        return /*html*/`
            <div class="formdata">
                <label for="${id}">${name}: </label>
                <input type="${type}" name="${id}" id="${id}">
                <div class="errmsg"></div>
            </div>
        `
    }

    static formsubmit(submitname) {
        return /*html*/`
            <div class="formsubmit">
                <input type="submit" value="${submitname}">
            </div>
        `
    }
    // #endregion
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
            <td><button class="inc">+</button></td>
            <td class="amount-col">${item.amount}</td>
            <td><button class="dec">-</button></td>
            <td class="mul-col">x</td>
            <td>${item.item.dishName}</td>
            <td><button class="del"><img src="static/assets/icons/delete.svg"></button></td>
            <td class="value">${item.euroValue}</td>
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
            <td>${item.amount}</td>
            <td>x</td>
            <td class="flex-col">${item.item.dishName}</td>
            <td class="value">${item.euroValue}</td>
        `
    }

    static summarySingleEntry(name, value) {
        return /*html*/`
            <td colspan="3" class="flex-col">${name}</td>
            <td class="value">${value}</td>
        `
    }

    static cartBtn () {
        return /*html*/`
            <button class="cart-btn d-none">Warenkorb</button>
        `
    }
    // #endregion
    // #endrgion
}