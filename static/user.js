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
            })
            refMsg.classList.add('success');
            refMsg.innerHTML = 'Benuter wurder erfolgreich erstellt!<br/>Bitte einloggen!'
        } else {
            refMsg.classList.remove('success');
            refMsg.textContent = 'Benutzer bereits vorhanden!'
        }
    }

    async singon(logdata, market) {
        const refMsg = document.querySelector('.status-msg');
        const response = await fetch(this.url + 'users/login', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(logdata)
        });
        if (!response.ok) {
            refMsg.classList.remove('success');
            refMsg.textContent = 'E-Mail oder Passwort ist nicht korrekt!';
        }
        const data = await response.json();
        this.id = data.id;
        this.token = data.token;
        this.login = true;
        market.loadDishes();
    }
    // #endregion
}