export class Switch extends HTMLElement {
    constructor() {
        super();
        this._isInitialized = false;
    }

    connectedCallback() {
        if (this._isInitialized) return;
        this._isInitialized = true;

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
            // bubbling is enabled. ;) 
            // trigger user custom script because of it.
            this.isOn = !this.isOn;
            if (this.isOn) {
                slider.classList.add("on");
            }
            else {
                slider.classList.remove("on");
            }
        });

        container.querySelector(".text.left.switch").textContent = this.getAttribute("lefttext", "Off");
        container.querySelector(".text.right.switch").textContent = this.getAttribute("righttext", "On");


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

        // ensure the custom script is run at the start.
        this.reFire();
    }

    reFire() {
        // mimic the user to trigger the custom event.
        // if the switch is attacked to a DOM,
        // then we have to run this
        this._isOn = !this._isOn;
        this.querySelector(".container.switch").click();
    }

    set lefttext(str) {
        if (this._isInitialized) {
            this.querySelector(".text.left.switch").textContent = str;
        }
    }
    set righttext(str) {
        if (this._isInitialized) {
            this.querySelector(".text.right.switch").textContent = str;
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
                this.lefttext = newValue;

                break;
            case "righttext":
                this.righttext = newValue;
                break;
        }
    }
}

/* 🚷 custom html element need hyphen, dont ask me why. */
customElements.define('our-switch', Switch);