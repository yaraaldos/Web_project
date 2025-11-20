document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll("#achievements .achievement h3");
    let started = false;

    function startCounting() {
        counters.forEach(counter => {
            let target = parseInt(counter.innerText.replace("+", ""));
            let count = 0;

            let step = Math.ceil(target / 70);

            function updateCounter() {
                count += step;

                if (count < target) {
                    counter.innerText = "+" + count;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = "+" + target;
                }
            }

            updateCounter();
        });
    }


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                startCounting();
            }
        });
    }, { threshold: 0.3 });

    const achievementsSection = document.querySelector("#achievements");
    if (achievementsSection) observer.observe(achievementsSection);
});
// Load saved theme on every page
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    const lightBtn = document.getElementById("lightBtn");
    const darkBtn = document.getElementById("darkBtn");

    // Theme buttons exist ONLY in home page
    if (lightBtn && darkBtn) {

        lightBtn.addEventListener("click", () => {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        });

        darkBtn.addEventListener("click", () => {
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        });
    }
});