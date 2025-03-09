document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("countries-container");
    const searchInput = document.getElementById("search");
    const regionFilter = document.getElementById("region-filter");
    const modeSwitcher = document.getElementById("mode-switcher");

    function showLoading() {
        container.innerHTML = `<div class="spinner-border" role="status"></div>`;
    }

    function fetchCountries(url) {

        showLoading();

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("countries-container");
                container.innerHTML = "";
                data.forEach(country => {
                    const countryCard = document.createElement("div");
                    countryCard.classList.add("country-card");
                    countryCard.innerHTML = `
                    <h5>${country.name.common}</h5>
                    <img src="${country.flags.png}" alt="${country.name.common}">
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                    `;
                    container.appendChild(countryCard);
                });
            });
    }

    fetchCountries("https://restcountries.com/v3.1/all");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchCountries(`https://restcountries.com/v3.1/name/${query}`);
        } else {
            fetchCountries("https://restcountries.com/v3.1/all");
        }
    });

    regionFilter.addEventListener("change", () => {
        const region = regionFilter.value;
        if (region) {
            fetchCountries(`https://restcountries.com/v3.1/region/${region}`);
        } else {
            fetchCountries("https://restcountries.com/v3.1/all");
        }
    });

    modeSwitcher.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            modeSwitcher.innerHTML = "☀️ Light Mode";
        } else {
            modeSwitcher.innerHTML = "🌙 Dark Mode";
        }
    });
});
