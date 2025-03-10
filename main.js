document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("countries-container");
    const searchInput = document.getElementById("search");
    const regionFilter = document.getElementById("region-filter");
    const modeSwitcher = document.getElementById("mode-switcher");

    function showLoading() {
        container.innerHTML = `<div class="spinner-border"></div>`;
    }

    function fetchCountries(url) {
        showLoading();
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                container.innerHTML = "";
                data.forEach(country => {
                    const countryCard = document.createElement("div");
                    countryCard.classList.add("country-card");
                    countryCard.innerHTML = `
                        <h5>${country.name.common}</h5>
                        <img src="${country.flags.png}" alt="${country.name.common}" style="width: 100%; max-height: 150px; object-fit: cover;">
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                    `;
    
                    countryCard.addEventListener("click", () => {
                        window.location.href = `details.html?name=${encodeURIComponent(country.name.common)}`;
                    });
    
                    container.appendChild(countryCard);
                });
            })
            .catch(error => {
                console.error("Error fetching countries:", error);
                container.innerHTML = `<p class="text-danger">Failed to load data. Please try again later.</p>`;
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
