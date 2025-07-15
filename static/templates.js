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
        `
    }
    // #endrgion
}