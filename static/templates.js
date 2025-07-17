export class Template{
    // #region Methods
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
                    <h3>${dish.dishName}</h3>
                    <span class="desc">${dish.desc}</span>
                    <h4>${dish.restaurantName}</h4>
                    <span class="price">${dish.currency()}</span>
                    <button class="add-btn">+</button>
                </div>
            </div>
        `
    }

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
    // #endrgion
}