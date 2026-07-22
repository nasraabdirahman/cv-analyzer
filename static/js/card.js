class Card extends HTMLElement {
    constructor() {
        super();
        this._hasHiddenContent = false;
        this._initialized = false;

        this.addEventListener("click", (e) => {
            e.stopPropagation();
            if (this._hasHiddenContent) {
                this.querySelector(".hiddenContent.card").classList.toggle("reveal")
            }
        });
    }

    connectedCallback() {
        if (this._initialized) return;
        this._initialized = true;

        this.innerHTML = `
            <div class="container card">
                <div class="title card"></div>
                <div class="description card"></div>
                <div class="hiddenContent card"></div>
            </div>
        `;

        // apply existing attributes after render
        this._applyAllAttributes();
    }

    _applyAllAttributes() {
        this.Title = this.getAttribute("title");
        this.Description = this.getAttribute("description");
        this.HiddenContent = this.getAttribute("hidden-content");
        this.href = this.getAttribute("href");
    }

    reveal() {
        this.querySelector(".hiddenContent.card").classList.add("reveal");
    }

    hide() {
        this.querySelector(".hiddenContent.card").classList.remove("reveal");
    }

    set Title(str) {
        const title = this.querySelector(".title.card");
        if (!title) return;
        title.textContent = str ?? "EMPTY";
    }

    set Description(str) {
        const desc = this.querySelector(".description.card");
        if (!desc) return;
        desc.textContent = str ?? "EMPTY";
    }

    set HiddenContent(str) {
        const content = this.querySelector(".hiddenContent.card");
        if (!content) return;
        if (str === null || str === "") {
            this._hasHiddenContent = false;
            return;
        }
        content.textContent = str;
        this._hasHiddenContent = true;
    }

    get HiddenContent() {
        return this.querySelector(".hiddenContent.card").textContent;
    }

    set href(link) {
        const a = this.querySelector(".container.card");
        if (!a) return; // is not loaded yet.
        this.removeEventListener("click", this._redirect);
        if (!link) return; // if link was not specified.
        this._redirect = (e) => {
            e.stopPropagation();
            window.location.href = link;
        }
        this.addEventListener("click", this._redirect);
    }

    set hrefOpen(link) {
        const a = this.querySelector(".container.card");
        if (!a) return; // is not loaded yet.
        this.removeEventListener("click", this._open);
        if (!link) return; // if link was not specified.
        this._open = (e) => {
            e.stopPropagation();
            window.open(link);
        }
        this.addEventListener("click", this._open);
    }

    static get observedAttributes() { return ["title", "description", "hidden-content", "href"]; }
    attributeChangedCallback(name, oldValue, newValue) {
        if (!this._initialized) return;

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