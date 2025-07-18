import { Cart } from './cart.js'

export class User {
    // #region Attributes
    login = false;
    token = null;
    id  = 0;
    // #endregion
    constructor(url) {
        this.url = url;
    }
    // #region Methods
    async register(regData) {
        try {
            const refMsg = document.querySelector('.status-msg');
            const response = await fetch(this.url + 'users/',{
                method: 'POST',
                headers: {
                    "Content-Tye":"application/json"
                },
                body: JSON.stringify(regData)
            });
            if (response.ok) {
                const inputs = document.querySelectorAll('input[type=text], input[type=password], input[type=date]');
                inputs.forEach(input => {
                input.value = '';
                });
                refMsg.classList.add('success');
                refMsg.innerHTML = 'Benuter wurder erfolgreich erstellt!<br/>Bitte einloggen!'
            } else {
                refMsg.classList.remove('success');
                let errMsg = ''
                switch (response.status) {
                    case 404: errMsg = 'Datenbank wurde nicht gefunden';
                    case 409: errMsg = "Benutzer ist bereits vorhanden"
                }
                refMsg.innerHTML = errMsg;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async singon(logdata, market) {
        try {
            const refMsg = document.querySelector('.status-msg');
            const response = await fetch(this.url + 'users/login', {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(logdata)
            });
            if (response.ok) {
                const data = await response.json();
                this.id = data.userId;
                this.token = data.token;
                this.login = true;
                market.cart = new Cart(this, this.url);
                market.renderNav();
                market.loadDishes();    
            } else {
                refMsg.classList.remove('success');
                refMsg.textContent = 'E-Mail oder Passwort ist nicht korrekt!';
            }
        } catch (error) {
            console.error(error);
        }
    }

    logout() {
        const refOverlay = document.querySelector('.overlay');
        const refCardWrapper = document.querySelector('.cart-wrapper');
        this.token = null;
        this.id = 0;
        this.login = false;
        refOverlay.classList.add('d-none');
        refCardWrapper.add('d-none');
    }
    // #endregion
}