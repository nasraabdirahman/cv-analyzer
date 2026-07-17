export class Switch extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <section class="container switch">
                <span class="slider switch" aria-hidden="true"></span>

                <span class="text left switch">False</span>
                <span class="text right switch">True</span>
            </section>
        `;

        const container = this.querySelector(".container.switch");
        const slider = container.querySelector(".slider.switch");
        container.addEventListener("click", () => {
            this.isOn = !this.isOn;
            slider.classList.toggle("on"); /* add .css class to the element. */
        });

        container.querySelector(".text.left.switch").textContent = "Off";
        container.querySelector(".text.right.switch").textContent = "On";


        if (typeof document !== "undefined") {
            const key = `${this.id}_isOn=`;
            const part = document.cookie
                .split("; ")
                .find(row => row.startsWith(key));

            if (part) {
                const value = part.slice(key.length);
                this._isOn = (value === "true");
            }
            else {
                /* default value */
                this._isOn = false;
            }
        }
        if (this._isOn) {
            this._isOn = !this._isOn;
            /* toggle .css class to the element. */
            /* also bubble up to the parent, aka this class */
            container.click();
        }
    }
    set isOn(isTrue) {
        this._isOn = isTrue;
        if (typeof document !== "undefined") {
            document.cookie = `${this.id}_isOn=${this.isOn}; path=/; max-age=3600`;
        }
    }
    get isOn() {
        return this._isOn;
    }
    static get observedAttributes() { return ["lefttext", "righttext"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "lefttext":
                this.querySelector(".text.left.switch").textContent = newValue;

                break;
            case "righttext":
                this.querySelector(".text.right.switch").textContent = newValue;
                break;
        }
    }
}

/* 🚷 custom html element need hyphen, dont ask me why. */
customElements.define('our-switch', Switch);