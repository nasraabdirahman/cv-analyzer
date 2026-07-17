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

        const thisSwitch = this.querySelector(".container.switch");
        const slider = thisSwitch.querySelector(".slider.switch");
        thisSwitch.addEventListener("click", () => {
            slider.classList.toggle("on"); /* add .css class to the element. */
        });

        thisSwitch.querySelector(".text.left.switch").textContent = "Off";
        thisSwitch.querySelector(".text.right.switch").textContent = "On";

        if (this._isOn) {
            clickArea.click();
        }
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