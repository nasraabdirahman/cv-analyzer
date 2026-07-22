const MAX_JOBS = 5;
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// the switch for the color theme.
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
document.querySelector("#colorSwitch").addEventListener("click", (e) => {
    // Bubbling stops here.
    e.stopPropagation();

    // switch logic.
    document.documentElement.dataset.theme = e.currentTarget.isOn ? "dark" : "light";
});
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// self-desc.
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
function initialize_self_description() {
    if (typeof document === "undefined") return;
    const selfDesc = document.querySelector("#self-description");
    const key = `${selfDesc.id}.textContent`;
    const part = document.cookie
        .split("; ")
        .find(row => row.startsWith(key));
    if (part) {
        const value = part.slice(key.length + 1);
        selfDesc.value = value;
    }
    else {
        /* default value */
        selfDesc.value = "";
    }


    selfDesc.addEventListener("input", () => {
        document.cookie = `${key}=${selfDesc.value}; path=/; max-age=3600`;
    });
}

initialize_self_description();
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// all top lists.
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
async function initialize_tops(selector, href) {
    const window = document.querySelector(selector);
    window.querySelector(".fold-switch").addEventListener("click", (e) => {
        // Bubbling stops here.
        e.stopPropagation();

        // fold logic.
        if (e.currentTarget.isOn) {
            window.fold();
        }
        else {
            window.expand();
        }
    });
    const clickHandlers = new Map();
    window.querySelector(".ai-switch").addEventListener("click", (e) => {
        // Bubbling stops here.
        e.stopPropagation();

        // lambdas.
        async function prompt(card) {
            card.reveal();

            const animationFrames = ["Analyzing", "Analyzing.", "Analyzing..", "Analyzing..."];
            let offset = 0;
            card.HiddenContent = animationFrames[offset];
            function animate() {
                offset = (offset + 1) % animationFrames.length;
                card.HiddenContent = animationFrames[offset];
            }
            const animation = setInterval(() => animate(), 300);

            if (card._hasRequested !== true) {
                card._hasRequested = true;
                const raw = await fetch(`/api/ai-analyze?id=${card.job}&self-description=${"I am a chef, good at making food."}`);
                clearInterval(animation);
                try {
                    const response = await raw.json();
                    card.HiddenContent = response.response;
                    card.HiddenContent = ""; // disable the click-to-toggle-fold feature.
                }
                catch (e) {
                    card.HiddenContent = "Exception catched while jsonify in frontend JS code.";
                    card._hasRequested = false;
                }
            }
        }

        // ai logic.
        const cards = window.querySelectorAll(".job-card");
        if (e.currentTarget.isOn) {
            // apply-mode 
            for (const card of cards) {
                const handler = clickHandlers.get(card);
                if (handler) {
                    card.removeEventListener("click", handler);
                    clickHandlers.delete(card);
                }

                card.hrefOpen = `/job/${card.job}`; // enable redirect.
            }
        } else {
            // ai-mode
            for (const card of cards) {
                const handler = () => prompt(card);
                clickHandlers.set(card, handler);
                card.addEventListener("click", handler);

                card.hrefOpen = ""; // disable href.
            }
        }
    });
    const response = await fetch(href);
    const data = await response.json();
    const jobs = Array.isArray(data) ? data : [data]; // would be problem if return only one job.
    if (jobs.length === 0) {
        jobs.push({ title: "Empty in the database ;(", shortDescription: "" });
    }
    for (const job of jobs) {
        const card = document.createElement("our-card");
        card.classList.add("job-card");
        card.job = job.job;
        card.setAttribute("title", job.title);
        card.setAttribute("description", job.company);
        window.addContent(card);
    }
    window.querySelector(".ai-switch").reFire();
}

await initialize_tops("#top-new", "/api/get-jobs?limit=5&list-key=jobs:by-create-date");
await initialize_tops("#top-popular", "/api/get-jobs?limit=5&list-key=jobs:by-apply-count");

function initialize_recent_jobs() {
    const match = document.cookie.split('; ').find(row => row.startsWith("recent-jobs" + '='));
    const raw = match ? match.split("=")[1] : null;
    const restored = raw ? JSON.parse(raw) : [];
    const recent_jobs = Array.isArray(restored) ? restored : [restored];
    const arg = "?";
    for (const id of recent_jobs) {
        arg.concat(id);
    }
    const url = "/api/get-jobs";
    if (recent_jobs.length !== 0) {
        url.concat(arg);
    }
    initialize_tops("#top-recent", url);
}
initialize_recent_jobs()
