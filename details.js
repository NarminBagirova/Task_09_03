document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get("name");
    const countryDetailsContainer = document.getElementById("countryDetails");

    countryDetailsContainer.innerHTML = "<p>Loading country details...</p>";

    if (countryName) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
            .then(response => response.json())
            .then(data => {
                if (!data || data.length === 0) throw new Error("Country not found");

                const country = data[0];

                countryDetailsContainer.innerHTML = `
                    <div class="col-lg-6 col-12 text-center">
                        <img src="${country.flags?.png}" alt="${country.name?.common || "Unknown"}" style="width: 100%; max-height: 150px; object-fit: cover;">
                    </div>
                    <div class="col-lg-6 col-12 country-info">
                        <h2>${country.name?.common || "N/A"}</h2>
                        <p><strong>Region:</strong> ${country.region || "N/A"}</p>
                        <p><strong>Subregion:</strong> ${country.subregion || "N/A"}</p>
                        <p><strong>Population:</strong> ${country.population?.toLocaleString() || "N/A"}</p>
                        <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
                        <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
                        <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A"}</p>
                    </div>
                `;
            })
            .catch(err => {
                console.error("Error fetching country data:", err);
                countryDetailsContainer.innerHTML = "<p>Country data could not be loaded.</p>";
            });
    }

    const modeSwitcher = document.getElementById("mode-switcher");
    const body = document.body;
    const currentMode = localStorage.getItem("theme");

    if (currentMode === "dark") {
        body.classList.add("dark-mode");
        modeSwitcher.textContent = "☀️ Light Mode";
    }

    modeSwitcher.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            modeSwitcher.textContent = "☀️ Light Mode";
        } else {
            modeSwitcher.textContent = "🌙 Dark Mode";
        }
    });
});
