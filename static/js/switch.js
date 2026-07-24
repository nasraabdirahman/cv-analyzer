export class Switch extends HTMLElement {
    constructor() {
        super();
        this._isInitialized = false;
        this._onToggle = (bool) => { };
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

        this.addEventListener("click", (e) => {
            e.stopPropagation();
            this.onToggle(this.isOn);
        });

        const container = this.querySelector(".container.switch");
        this._slider = container.querySelector(".slider.switch");
        container.addEventListener("click", () => {
            // bubbling is enabled. ;) 
            // trigger user custom script because of it.
            this.isOn = !this.isOn;
        });

        container.querySelector(".text.left.switch").textContent = this.getAttribute("lefttext", "Off");
        container.querySelector(".text.right.switch").textContent = this.getAttribute("righttext", "On");


        if (typeof document !== "undefined") {
            const key = `${this.id}.isOn=`;
            const part = document.cookie
                .split("; ")
                .find(row => row.startsWith(key));

            if (part) {
                const value = part.slice(key.length);
                this.isOn = (value === "true");
            }
            else {
                /* default value */
                this.isOn = false;
            }
        }

    }
    set onToggle(f) {
        // run the custom script to sync it with the switch.
        f(this.isOn);
        this._onToggle = f;
    }
    get onToggle() {
        return this._onToggle;
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
            document.cookie = `${this.id}.isOn=${this.isOn}; path=/; max-age=3600`;
        }

        // animation.
        if (this.isOn) {
            this._slider.classList.add("on");
        }
        else {
            this._slider.classList.remove("on");
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