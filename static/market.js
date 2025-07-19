// #region Imports
import { User } from './user.js';
import { Shelf } from './shelf.js';
import { Dish } from './dish.js';
import { Template } from './templates.js';
// #endregion
export class Market {
    // #region attributes
    refMain = document.querySelector('.render-main');
    local = 'http://localhost:8000/';
    server = 'https://marco-elste.developerakademie.net:8000/';
    url = this.local;
    currentUser = null;
    cart = null;
    // #endregion
    constructor() {
        this.currentUser = new User(this.url);
        this.shelves = [
            new Shelf('Burger', 'burger'),
            new Shelf ('Nudelgerichte', 'noodle'),
            new Shelf ('Pizzen', 'pizza'),
            new Shelf ('Sushi', 'sushi')
        ];
    }
    // #region Methods
    //  #region Render
    renderNav(user) {
        const refNav = document.querySelector('nav ul');
        refNav.innerHTML = '';

        if (this.currentUser.login) {
            refNav.innerHTML += Template.li('Logout');
        } else {
            refNav.innerHTML += Template.li('Registr');
            refNav.innerHTML += Template.li('Login');
        }

        this.addNavEvents();
    }

    renderMain () {
        this.refMain.innerHTML = ''
        
        this.refMain.innerHTML = Template.greating();
        this.refMain.classList.add('vc-box');
    }

    renderForm (name) {
        this.refMain.innerHTML = Template.form(name);
    }

    renderRegister () {
        const fieldset = document.querySelector('fieldset');
        fieldset.innerHTML += Template.forminput('E-Mail' ,'mail');
        fieldset.innerHTML += Template.forminput('Passwort','password','password');
        fieldset.innerHTML += Template.forminput('Passwort wdh', 'password2','password');
        fieldset.innerHTML += Template.forminput('Vorname', 'fname');
        fieldset.innerHTML += Template.forminput('Nachname', 'lname');
        fieldset.innerHTML += Template.forminput('Geburtdatum', 'birthDate', 'date');
        fieldset.innerHTML += Template.forminput('Straße, Nr','street');
        fieldset.innerHTML += Template.forminput('PLZ', 'zipCode');
        fieldset.innerHTML += Template.forminput('Stadt', 'city');
        fieldset.innerHTML += Template.formsubmit('Registieren');

    }

    renderLogin () {
        const fieldset = document.querySelector('fieldset');
        fieldset.innerHTML += Template.forminput('E-Mail' ,'mail');
        fieldset.innerHTML += Template.forminput('Passwort','password','password');
        fieldset.innerHTML += Template.formsubmit('Einloggen');
    }

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
    addNavEvents () {
        const refNavBtns = document.querySelectorAll('nav ul li button');
        if (!this.currentUser.login) {
            refNavBtns[0].addEventListener('click', e => {
                refNavBtns.forEach(btn => {
                    btn.classList.remove('nav-btn-active');
                    this.renderForm('Registrieren');
                    this.renderRegister();
                    this.addSubmitEvent(0);
                });
                e.currentTarget.classList.add('nav-btn-active');
            });
            refNavBtns[1].addEventListener('click', e => {
                refNavBtns.forEach(btn => {
                    btn.classList.remove('nav-btn-active');
                    this.renderForm('Anmelden');
                    this.renderLogin();
                    this.addSubmitEvent(1);
                });
                e.currentTarget.classList.add('nav-btn-active');
            });
        } else {
            refNavBtns[0].addEventListener('click', () => {
                this.currentUser.logout();
                this.renderNav();
                this.renderMain();
            })
        }
    }

    addSubmitEvent(form) {
        document.forms[0].addEventListener('submit', e => {
            e.preventDefault();
            if (form == 0) {
                this.readRegisterInput();
            } else {
                this.readLoginInput();
            }
        });
    }

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

    addResizeEvent() {
        const refCart = document.querySelector('.cart-wrapper');

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 1100) {
                refCart.classList.add('d-none');
            } else {
                refCart.classList.remove('d-none');
            }
        })
    }
    // #endregion
    // #region UserInput
    readRegisterInput() {
        const refInputs = document.querySelectorAll('input');        
        const userInput =  {
            email: refInputs[0].value,
            password: refInputs[1].value,
            password2: refInputs[2].value,
            fname: refInputs[3].value,
            lname: refInputs[4].value,
            birthDate: refInputs[5].value,
            street: refInputs[6].value,
            zipCode: refInputs[7].value,
            city: refInputs[8].value
        }
        if(this.validate(userInput)) {
            this.currentUser.register(userInput);
        } 
    }

    readLoginInput() {
        const refInputs = document.querySelectorAll('input');        
        const userInput =  {
            email: refInputs[0].value,
            password: refInputs[1].value
        }
        this.currentUser.singon(userInput, this);
    }

    validate(userInput) {
        let valid = true;
        const refErrmsg = document.querySelectorAll('.errmsg');
        const regexEmail = /\w+?(\.|_|-)?\w+@\w+\.\w+/i
        const regexName = /[A-Z][a-z]+/
        const regexStreet = /[A-Z][a-z-]+\.?\s[0-9][a-z]?/g
        const regexZipCode = /[0-9]{5,5}/
        const regexCity = /[A-Z][a-z]+/

        if (!regexEmail.test(userInput.email)) {
            refErrmsg[0].textContent = 'E-Mail ist nicht korrekt!';
            valid = false;
        }
        if (userInput.password.length < 5) {
            refErrmsg[1].textContent = 'Passwort muss mindestens 5 Zeichen haben!';
            valid = false;
        }
        if (userInput.password != userInput.password2) {
            refErrmsg[2].textContent = 'Passwort stimmt nicht überein!';
            valid = false;
        }
        if (!regexName.test(userInput.fname)) {
            refErrmsg[3].textContent = 'Vorname ist nicht Korrekt!';
            valid = false;
        }
        if (!regexName.test(userInput.lname)) {
            refErrmsg[4].textContent = 'Nachname ist nicht korrekt!';
        }
        if (!regexStreet.test(userInput.street)) {
            refErrmsg[6].textContent = 'Straßenname ist nicht korrekt!';
            valid = false;
        }
        if (!regexZipCode.test(userInput.zipCode)) {
            refErrmsg[7].textContent = 'PLZ ist nicht korrekt!';
            valid = false
        }
        if (!regexCity.test(userInput.city)) {
            refErrmsg[8].textContent = 'Stadtname ist nicht korrekt';
            valid = false;
        }
        return valid;
    }  
    // #endregion
    // #region Requests
    async loadDishes() {
        try {
            const auth = `Bearer ${this.currentUser.token}`;
            const response = await fetch(this.url + 'items/', {
                headers: {
                    "Authorization": auth
                }
            });
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
                this.addResizeEvent();
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