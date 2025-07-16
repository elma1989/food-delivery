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
                    <span>${dish.desc}</span>
                    <h4>${dish.restaurantName}</h4>
                </div>
            </div>
        `
    }
    // #endrgion
}