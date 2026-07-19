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
      <a class="container card">
        <div class="title card">EMPTY</div>
        <div class="description card">EMPTY</div>
        <div class="hiddenContent card">EMPTY</div>
      </a>
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

    set href(link) {
        const a = this.querySelector(".container.card");
        if (a) a.setAttribute("href", link || "#");
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