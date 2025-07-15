import { Template } from "./templates.js";
export class Market {
    // #region attributes
    refMain = document.querySelector('main .content');
    // #endregion
    // #region Methods
    //  #region Render
    renderNav(user) {
        const refNav = document.querySelector('nav ul');
        refNav.innerHTML = '';

        if (user.login) {

        } else {
            refNav.innerHTML += Template.li('Registr');
            refNav.innerHTML += Template.li('Login');
        }

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
        fieldset.innerHTML += Template.forminput('Passort','password','password');
        fieldset.innerHTML += Template.forminput('Passwort whd', 'password2','password');
        fieldset.innerHTML += Template.forminput('Straße, Nr','street');
        fieldset.innerHTML += Template.forminput('PLZ', 'zipCode');
        fieldset.innerHTML += Template.forminput('Stadt', 'city');
        fieldset.innerHTML += Template.formsubmit('Registieren');

    }

    renderLogin () {
        const fieldset = document.querySelector('fieldset');
        fieldset.innerHTML += Template.forminput('E-Mail' ,'mail');
        fieldset.innerHTML += Template.forminput('Passort','password','password');
        fieldset.innerHTML += Template.formsubmit('Einloggen');
    }
    // #endregion
    // #region Events
    addNavEvents (user) {
        const refNavBtns = document.querySelectorAll('nav ul li button');
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
    // #endregion
    // #region UserInput
    readRegisterInput() {
        const refInputs = document.querySelectorAll('input');        
        const userIputs =  {
            mail: refInputs[0].value,
            password: refInputs[1].value,
            password2: refInputs[2].value,
            street: refInputs[3].value,
            zipCode: refInputs[4].value,
            city: refInputs[5].value
        }
        console.log(this.validate(userIputs));
    }

    readLoginInput() {
        const refInputs = document.querySelectorAll('input');        
        const userIputs =  {
            mail: refInputs[0].value,
            password: refInputs[1].value
        }
        console.log(userIputs);
    }

    validate(userInput) {
        let valid = true;
        const refErrmsg = document.querySelectorAll('.errmsg');
        const regexEmail = /\w+?(\.|_|-)?\w+@\w+\.\w+/i
        const regexStreet = /[A-Z][a-z]+\.?\s[0-9][a-z]?/g
        const regexZipCode = /[0-9]{5,5}/
        const regexCity = /[A-Z][a-z]+/

        if (!regexEmail.test(userInput.mail)) {
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
        if (!regexStreet.test(userInput.street)) {
            refErrmsg[3].textContent = 'Straßenname ist nicht korrekt!';
            valid = false;
        }
        if (!regexZipCode.test(userInput.zipCode)) {
            refErrmsg[4].textContent = 'PLZ ist nicht korrekt!';
            valid = false
        }
        if (!regexCity.test(userInput.city)) {
            refErrmsg[5].textContent = 'Stadtname ist nicht korrekt';
            valid = false;
        }
        return valid;
    }  
    // #endregion
    // #endregion
}