const toggle = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");
const label = document.getElementById("theme-label");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        icon.src = "svgs/Sun.svg";
        label.textContent = "Dark Mode";
    } else {
        icon.src = "svgs/Moon.svg";
        label.textContent = "Light Mode";
    }
});

const footer = document.getElementById("desktopFooter");
const btn = document.getElementById("desktopToggleBtn");

btn.addEventListener("click", (e) => {
    e.stopPropagation();
    footer.classList.toggle("desktop-footer-expanded");
});

document.addEventListener("click", (e) => {
    if (!footer.contains(e.target) && e.target !== btn) {
        footer.classList.remove("desktop-footer-expanded");
    }
});

(function () {
    const isMobile = () => window.matchMedia("(max-width: 480px)").matches;

    const mobileBtns = document.querySelectorAll(".mobileBtn");
    const panels = document.querySelectorAll(".slidePanel");
    const footer = document.getElementById("mobileFooterSlide");


    function hideAllPanels() {
        panels.forEach(p => p.classList.remove("active"));
    }

    function resetFooter() {
        footer.classList.remove("expanded", "hidden");
    }

    mobileBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (!isMobile()) return;

            const action = btn.getAttribute("data-action");
            hideAllPanels();
            resetFooter();

            if (action === "hide") {
                const panelId = `panel${Array.from(mobileBtns).indexOf(btn) + 1}`;
                const panel = document.getElementById(panelId);
                if (panel) panel.classList.add("active");
                footer.classList.add("hidden");
            }

            if (action === "footer") {
                footer.classList.add("expanded");
            }
        });
    });

    document.querySelectorAll(".closeBtn").forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            if (!isMobile()) return;
            closeBtn.parentElement.classList.remove("active");
            resetFooter();
        });
    });

    document.addEventListener("pointerdown", (e) => {
        if (!isMobile()) return;

        const activePanel = document.querySelector(".slidePanel.active");
        const footerActive = footer.classList.contains("expanded");

        if (!activePanel && !footerActive) return;

        if (e.target.closest(".mobileBtn") || e.target.closest(".slidePanel") || e.target.closest("#mobileFooterSlide")) return;

        hideAllPanels();
        resetFooter();
    });
})();