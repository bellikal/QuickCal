// Getting references to DOM-Elements
const calendarContainer = document.querySelector('.calendar-container');
const monthContainer = document.querySelector('.month-container');
const monthTitle = document.querySelector('.month');
const calendarBoxes = document.querySelector('.calendar-boxes');

// Array for month names
const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

// Initialize current date
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let yearShort = currentYear.toString().slice(-2);
let today = currentDate.getDate(); // Get today's date

// Function to update the month title in the calendar
const populateMonthTitle = () => {
    monthTitle.textContent = `${months[currentMonth]}`; // Set current month name
}

populateMonthTitle(); // Set the current month on page load

// Function to calculate the number of days in a given month and year
const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate(); // Returns the number of days in the specified month
}

// Function to populate the calendar with day boxes
const populateCalendarContent = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    // Clear any existing calendar boxes before repopulation
    calendarBoxes.innerHTML = '';

    // Loop through the days of the month and create calendar boxes
    for (let date = 1; date <= daysInMonth; date++) {
        // Check if the current day is today
        const isToday = (date === today && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear());
        const boxClass = isToday ? 'calendar-box current' : 'calendar-box';

        // Add day boxes to the calendar
        calendarBoxes.innerHTML += `
            <article class="${boxClass}">
                <h3 class="date">${date}</h3>
            </article>
        `;
    }
}

// Event listener for handling all button clicks within the calendar
calendarContainer.addEventListener("click", (event) => {
    const clickedButton = event.target;
    
    checkClickedButton(clickedButton);
});

// Function for checking which button is clicked
const checkClickedButton = (clickedButton) => {
    if (clickedButton.classList.contains('add-date-button')) {
        handleAddDate(); // Show input container for new date
    }
    else if (clickedButton.classList.contains('save-button')) {
        handleSave(); // Save the new date to the calendar
    }
    else if (clickedButton.classList.contains('entry-container')) {
        handleHidingInput(); // Hide input container
    }
    else if (clickedButton.classList.contains('delete-button')) {
        handleDelete(); // Delete the corresponding date entry
    }
    else if (clickedButton.classList.contains('prev-month')) {
        handlePrevMonth();
    }
    else if (clickedButton.classList.contains('next-month')) {
        handleNextMonth();
    }
}

// Function to handle adding a new date
const handleAddDate = () => {
    addDateButton.classList.toggle('hidden');
    inputContainer.classList.toggle('hidden');
}

// Function to add a new date to the calendar with random color
const handleSave = () => {
    const dateInput = document.querySelector('#date-input');
    const timeInput = document.querySelector('#date-time').value;

    // Add new date entry to the list
    addNewEntryToList(dateInput.value, timeInput);

    dateInput.value = ""; // Clear the input field
    handleHidingInput(); // Hide the input container after saving
}

// Function to hide the input container
const handleHidingInput = () => {
    addDateButton.classList.remove('hidden');
    inputContainer.classList.add('hidden');
}

// Function to delete a specific date entry
const handleDelete = () => {
    const dateLi = event.target.parentElement; // Get the parent <li> element
    dateLi.remove(); // Remove the <li> element
}

// Function to handle previous month navigation
const handlePrevMonth = () => {
    if (currentMonth === 0) {
        currentMonth = 11; // Go to December of the previous year
        currentYear--;
    } else {
        currentMonth--;
    }
    updateCalendar(); // Update the calendar with the new month
}

// Function to handle next month navigation
const handleNextMonth = () => {
    if (currentMonth === 11) {
        currentMonth = 0; // Go to January of the next year
        currentYear++;
    } else {
        currentMonth++;
    }
    updateCalendar(); // Update the calendar with the new month
}

// Function to update both the month title and calendar content
const updateCalendar = () => {
    populateMonthTitle(); // Refresh the month label
    populateCalendarContent(); // Refresh the calendar with new day boxes
}

updateCalendar(); // Populate calendar and updates the month title

// Getting references for date entry elements
const dateEntries = document.querySelector('.entries');
const entryContainer = document.querySelector('.entry-container');
const inputContainer = document.querySelector('.input-wrapper');

// Reference to 'Add Date' button
const addDateButton = document.querySelector('.add-date-button');

// Array of color classes for random background assignment
const colorClasses = ['soft-peach', 'light-pink', 'light-gray', 'light-sand'];

// Function to select a random color class
const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
};

// Function to add new date entry to the list
const addNewEntryToList = (date, time) => {
    const randomColor = getRandomColor(); // Assign a random color

    // Add new HTML-Element to the List
    dateEntries.innerHTML += `
    <li class="entry ${randomColor}">
        <span class="time">${time}</span>
        ${date}
        <button class="delete-button">&#x2715;</button>
    </li>
`;
}