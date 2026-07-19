class Card extends HTMLElement {
    constructor() {
        super();
        this._hasHiddenContent = false;
        this.innerHTML = `
            <a class="container card">
                <div class="title card">
                    EMPTY
                </div>

                <div class="description card">
                    EMPTY
                </div>

                <div class="hiddenContent card">    
                    EMPTY
                </div>
            </a>
        `;
        this.addEventListener("click", (e) => {
            e.stopPropagation();
            if (this._hasHiddenContent) {
                this.querySelector(".hiddenContent.card").classList.toggle("reveal")
            }
        });
    }
    set Title(str) {
        this.querySelector(".title.card").textContent = str;
    }
    set Description(str) {
        this.querySelector(".description.card").textContent = str;
    }
    set HiddenContent(str) {
        if (str === null || str === "") {
            this._hasHiddenContent = false;
            return;
        }
        this.querySelector(".hiddenContent.card").textContent = str;
        this._hasHiddenContent = true;
    }

    set href(link) {
        this.querySelector(".container.card").href = link;
    }

    static get observedAttributes() { return ["title", "description", "hidden-content", "href"]; }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "title":
                this.Title = newValue;
                break;
            case "description":
                this.Description = newValue;
                break;
            case "hidden-content":
                this.HiddenContent = newValue;
                break;
            case "href":
                this.href = newValue;
                break;
        }
    }
}

customElements.define("our-card", Card);