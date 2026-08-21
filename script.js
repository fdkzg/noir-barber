// =========================
// NOIR BARBER
// JAVASCRIPT
// =========================


// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");
        document.body.classList.toggle("menu-open");

    });

    const links = navLinks.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    });

}


// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


// =========================
// FOOTER YEAR
// =========================

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}


// =========================
// CMS CONTENT LOADER
// =========================

async function loadCMSContent() {

    try {

        const response = await fetch(
            "content/site.yml?v=" + Date.now()
        );

        if (!response.ok) {
            throw new Error("Could not load CMS content.");
        }

        const yaml = await response.text();


        // =========================
        // SIMPLE YAML VALUE READER
        // =========================

        function getValue(key) {

            const line = yaml
                .split("\n")
                .find(line =>
                    line.trim().startsWith(key + ":")
                );

            if (!line) return null;

            return line
                .substring(line.indexOf(":") + 1)
                .trim()
                .replace(/^["']|["']$/g, "");

        }


        // =========================
        // BUSINESS INFORMATION
        // =========================

        const businessName = getValue("business_name");


        // =========================
        // HERO
        // =========================

        const heroTitle = getValue("hero_title");
        const heroText = getValue("hero_text");


        // =========================
        // SERVICES
        // =========================

        const service1Name = getValue("service_1_name");
        const service1Description = getValue("service_1_description");
        const service1Price = getValue("service_1_price");

        const service2Name = getValue("service_2_name");
        const service2Description = getValue("service_2_description");
        const service2Price = getValue("service_2_price");

        const service3Name = getValue("service_3_name");
        const service3Description = getValue("service_3_description");
        const service3Price = getValue("service_3_price");

        const service4Name = getValue("service_4_name");
        const service4Description = getValue("service_4_description");
        const service4Price = getValue("service_4_price");

        const service5Name = getValue("service_5_name");
        const service5Description = getValue("service_5_description");
        const service5Price = getValue("service_5_price");


        // =========================
        // UPDATE BUSINESS NAME
        // =========================

        if (businessName) {

            const element =
                document.getElementById("cms-business-name");

            if (element) {
                element.textContent = businessName;
            }

        }


        // =========================
        // UPDATE HERO
        // =========================

        if (heroTitle) {

            const element =
                document.getElementById("cms-hero-title");

            if (element) {
                element.textContent = heroTitle;
            }

        }

        if (heroText) {

            const element =
                document.getElementById("cms-hero-text");

            if (element) {
                element.textContent = heroText;
            }

        }


        // =========================
        // UPDATE SERVICES
        // =========================

        updateService(
            1,
            service1Name,
            service1Description,
            service1Price
        );

        updateService(
            2,
            service2Name,
            service2Description,
            service2Price
        );

        updateService(
            3,
            service3Name,
            service3Description,
            service3Price
        );

        updateService(
            4,
            service4Name,
            service4Description,
            service4Price
        );

        updateService(
            5,
            service5Name,
            service5Description,
            service5Price
        );


    } catch (error) {

        console.error(
            "CMS content could not be loaded:",
            error
        );

    }

}


// =========================
// SERVICE UPDATE FUNCTION
// =========================

function updateService(
    number,
    name,
    description,
    price
) {

    const service = document.querySelector(
        `[data-service="${number}"]`
    );

    if (!service) return;


    if (name) {

        const element =
            service.querySelector(".cms-service-name");

        if (element) {
            element.textContent = name;
        }

    }


    if (description) {

        const element =
            service.querySelector(".cms-service-description");

        if (element) {
            element.textContent = description;
        }

    }


    if (price) {

        const element =
            service.querySelector(".cms-service-price");

        if (element) {
            element.textContent = price;
        }

    }

}


// =========================
// START CMS
// =========================

loadCMSContent();
