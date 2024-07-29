let currentPage = 1;
const rowsPerPage = 10;
let allPeople = [];
let filteredPeople = [];

function generatePersonData() {
    const firstNames = ["John", "Jane", "Alex", "Chris", "Katie", "Michael", "Sarah", "David", "Laura", "Robert"];
    const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
    const domains = ["example.com", "mail.com", "test.com"];
    const genders = ["Male", "Female"];
    const people = [];

    for (let i = 0; i < 250; i++) {
        let person = {
            name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            age: Math.floor(Math.random() * 60) + 18,
            gender: genders[Math.floor(Math.random() * genders.length)],
            contact: `+91-444-${Math.floor(Math.random() * 9000000) + 1000000}`,
            email: `user${i}@${domains[Math.floor(Math.random() * domains.length)]}`,
            instagram: `@user${i}`,
            facebook: `facebook.com/user${i}`
        };
        people.push(person);
    }
    return people;
}

function displayData(people, page) {
    const tableBody = document.getElementById("personTable").querySelector("tbody");
          tableBody.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedPeople = people.slice(start, end);

    for (let person of paginatedPeople) {
        let row = document.createElement("tr");

        for (let key in person) {
            let cell = document.createElement("td");
            cell.textContent = person[key];
            cell.setAttribute("data-label", key.charAt(0).toUpperCase() + key.slice(1));
            row.appendChild(cell);
        }

            tableBody.appendChild(row);
    }

    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${Math.ceil(people.length / rowsPerPage)}`;
    document.getElementById("prevButton").disabled = currentPage === 1;
    document.getElementById("nextButton").disabled = page >= Math.ceil(people.length / rowsPerPage);
}

function applyFilters() {
    const ageFilter = document.getElementById("ageFilter").value;
    const genderFilter = document.getElementById("genderFilter").value;
          filteredPeople = allPeople;

    if (ageFilter) {
        filteredPeople = filteredPeople.filter(person => person.age == ageFilter);
    }

    if (genderFilter) {
        filteredPeople = filteredPeople.filter(person => person.gender === genderFilter);
    }

        currentPage = 1;
        displayData(filteredPeople, currentPage);
}

function nextPage() {
    if (currentPage < Math.ceil(filteredPeople.length / rowsPerPage)) {
        currentPage++;
        displayData(filteredPeople, currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayData(filteredPeople, currentPage);
    }
}

function initialize() {
    allPeople = generatePersonData();
    filteredPeople = allPeople;
    displayData(filteredPeople, currentPage);
}

    window.onload = initialize;
