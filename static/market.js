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

    renderRegister () {
        console.log('register');
    }

    addNavEvents (user) {
        const refNavBtns = document.querySelectorAll('nav ul li button');
        refNavBtns[0].addEventListener('click', e => {
            refNavBtns.forEach(btn => {
                btn.classList.remove('nav-btn-active');
            });
            e.currentTarget.classList.add('nav-btn-active');
        });
        refNavBtns[1].addEventListener('click', e => {
            refNavBtns.forEach(btn => {
                btn.classList.remove('nav-btn-active');
            });
            e.currentTarget.classList.add('nav-btn-active');
        });
    }
    // #endregion
}