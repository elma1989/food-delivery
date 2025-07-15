import { Template } from "./templates.js";
export class Market {
    // #region attributes
    refMain = document.querySelector('main .content');
    // #endregion
    // #region Methods
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
        fieldset.innerHTML += Template.forminput('Passort','password');
        fieldset.innerHTML += Template.forminput('Passwort whd', 'password2');
        fieldset.innerHTML += Template.forminput('Straße, Nr','street');
        fieldset.innerHTML += Template.forminput('PLZ', 'zipCode');
        fieldset.innerHTML += Template.forminput('Stadt', 'city');
        fieldset.innerHTML += Template.formsubmit('Registieren');

    }

    addNavEvents (user) {
        const refNavBtns = document.querySelectorAll('nav ul li button');
        refNavBtns[0].addEventListener('click', e => {
            refNavBtns.forEach(btn => {
                btn.classList.remove('nav-btn-active');
                this.renderForm('Registrieren');
                this.renderRegister();
            });
            e.currentTarget.classList.add('nav-btn-active');
        });
        refNavBtns[1].addEventListener('click', e => {
            refNavBtns.forEach(btn => {
                btn.classList.remove('nav-btn-active');
                this.renderForm('Anmelden');
            });
            e.currentTarget.classList.add('nav-btn-active');
        });
    }
    // #endregion
}