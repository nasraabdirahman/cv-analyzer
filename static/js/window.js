export class Window extends HTMLElement {
    constructor() {
        super();
        this._isInitialized = false;
        this._titlebar = Array.from(this.querySelector(".titlebar").children);
        this._content = Array.from(this.querySelector(".content").children);
    }
    connectedCallback() {
        if (this._isInitialized) return;
        this._isInitialized = true;
        // 🚷 do not ever put innerHTML inside constructor again plz...
        this.innerHTML = `
            <div class="container window">
                <div class="titlebar window">
                    <div class="title window">EMPTY</div>
                    <div class="gap window"></div>
                </div>
                <div class="main window"></div>
            </div>
        `;
        this.pullAttriputes();

        // insert items into the titleBar.
        const slotForButtons = this.querySelector(".titlebar.window");
        this._titlebar.forEach((item) => {
            item.classList.add("item", "window");
            slotForButtons.appendChild(item);
        });

        // insert content into the main window.
        const slotForContents = this.querySelector(".main.window");
        this._content.forEach((content) => {
            content.classList.add("content", "window");
            slotForContents.appendChild(content);
        });
    }
    fold() {
        this.querySelector(".main.window").classList.add("fold");
    }
    expand() {
        this.querySelector(".main.window").classList.remove("fold");
    }
    addContent(node) {
        const slotForContents = this.querySelector(".main.window");
        node.classList.add("content", "window");
        slotForContents.appendChild(node);
    }

    static get observedAttributes() {
        return ["width", "height", "min-width", "min-height", "max-width", "max-height"];
    }

    attributeChangedCallback(namn, gammal, ny) {
        switch (namn) {
            case "width":
                this.width = ny;
                break;
            case "height":
                this.height = ny;
                break;
            case "min-width":
                this.minWidth = ny;
                break;
            case "min-height":
                this.minHeight = ny;
                break;
            case "max-width":
                this.maxWidth = ny;
                break;
            case "max-height":
                this.maxHeight = ny;
                break;
        }
    }

    set width(str) {
        if (!this._isInitialized) return;
        this.querySelector(".container.window").style.width = str;
    }
    set height(str) {
        if (!this._isInitialized) return;
        this.querySelector(".container.window").style.height = str;
    }
    set minWidth(str) {
        if (!this._isInitialized) return;
        this.querySelector(".container.window").style.minWidth = str;
    }
    set minHeight(str) {
        if (!this._isInitialized) return;
        this.querySelector(".container.window").style.minheight = str;
    } set maxWidth(str) {
        if (!this._isInitialized) return;
        this.querySelector(".container.window").style.maxWidth = str;
    }
    set maxHeight(str) {
        if (!this._isInitialized) return;
        this.querySelector(".container.window").style.maxHeight = str;
    }
    pullAttriputes() {
        this.width = this.getAttribute("width");
        this.height = this.getAttribute("height");
        this.minWidth = this.getAttribute("min-width");
        this.minHeight = this.getAttribute("min-height");
        this.maxWidth = this.getAttribute("max-width");
        this.maxHeight = this.getAttribute("max-height");
    }
}


customElements.define("our-window", Window);