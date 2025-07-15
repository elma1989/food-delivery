export class User {
    // #region Attributes
    login = false;
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
    // #endregion
}