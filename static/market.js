import { Template } from "./templates.js";
export class Market {
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
    // #endregion
}