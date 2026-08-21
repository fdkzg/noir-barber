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

function setupReveal() {

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

}


// =========================
// FOOTER YEAR
// =========================

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}


// =========================
// CMS CONTENT
// =========================

async function loadCMSContent() {

    try {

        // -------------------------
        // WEBSITE CONTENT
        // -------------------------

        const siteResponse =
            await fetch("content/site.yml?v=" + Date.now());

        if (!siteResponse.ok) {

            throw new Error("Could not load site CMS content.");

        }

        const siteYaml = await siteResponse.text();


        function getValue(key) {

            const line = siteYaml
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


        const businessName = getValue("business_name");
        const heroTitle = getValue("hero_title");
        const heroText = getValue("hero_text");


        if (businessName) {

            const element =
                document.getElementById("cms-business-name");

            if (element) {

                element.textContent = businessName;

            }

        }


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


        // -------------------------
        // SERVICES
        // -------------------------

        const servicesResponse =
            await fetch(
                "https://api.github.com/repos/fdkzg/noir-barber/contents/content/services"
            );

        if (!servicesResponse.ok) {

            throw new Error("Could not load CMS services.");

        }

        const serviceFiles = await servicesResponse.json();

        const servicesList =
            document.getElementById("cms-services-list");

        if (!servicesList) return;


        servicesList.innerHTML = "";


        let serviceNumber = 1;


        for (const file of serviceFiles) {

            if (file.type !== "file") continue;

            const fileResponse =
                await fetch(file.download_url);

            if (!fileResponse.ok) continue;

            const serviceText =
                await fileResponse.text();


            function getServiceValue(key) {

                const line = serviceText
                    .split("\n")
                    .find(line =>
                        line.trim().startsWith(key + ":")
                    );

                if (!line) return "";

                return line
                    .substring(line.indexOf(":") + 1)
                    .trim();

            }


            const name =
                getServiceValue("name");

            const description =
                getServiceValue("description");

            const price =
                getServiceValue("price");


            if (!name) continue;


            const service =
                document.createElement("article");

            service.className =
                "service reveal";


            service.innerHTML = `
                <div class="service-number">
                    ${String(serviceNumber).padStart(2, "0")}
                </div>

                <div class="service-main">

                    <h3>${name}</h3>

                    <p>${description}</p>

                </div>

                <div class="service-price">

                    <span>from</span>

                    ${price}

                </div>
            `;


            servicesList.appendChild(service);

            serviceNumber++;

        }


        // Activate reveal animations
        setupReveal();


    } catch (error) {

        console.error(
            "CMS content could not be loaded:",
            error
        );

    }

}


// Start CMS loading
loadCMSContent();
