document.addEventListener("DOMContentLoaded", () => {

    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const query = searchInput.value.trim();

            if (!query) {
                alert("Please enter something to search.");
                return;
            }

            alert(
                `Repository search for "${query}" will be available after the database is connected.`
            );
        });
    }

});
