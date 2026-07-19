class Card extends HTMLElement {
    constructor() {
        super();
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
            this.querySelector(".hiddenContent.card").classList.toggle("reveal")
        });
    }
}

customElements.define("our-card", Card);