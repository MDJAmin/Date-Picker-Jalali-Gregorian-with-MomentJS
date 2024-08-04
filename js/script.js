"use strict";

let currentDate = moment();
let useJalaali = false;

function renderCalendar() {
    const daysContainer = document.querySelector('.days');
    daysContainer.innerHTML = '';

    const startOfMonth = useJalaali ? currentDate.clone().startOf('jMonth') : currentDate.clone().startOf('month');
    const endOfMonth = useJalaali ? currentDate.clone().endOf('jMonth') : currentDate.clone().endOf('month');
    const startDay = startOfMonth.day();
    const totalDays = endOfMonth.date();

    document.getElementById('current-month').textContent = useJalaali ? currentDate.format('jMMMM jYYYY') : currentDate.format('MMMM YYYY');

    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day';
        daysContainer.appendChild(emptyCell);
    }

    for (let i = 1; i <= totalDays; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = i;
        dayCell.addEventListener('click', () => {
            const selectedDate = useJalaali ? currentDate.clone().jDate(i) : currentDate.clone().date(i);
            document.getElementById('selected-date').value = useJalaali ? selectedDate.format('jYYYY/jMM/jDD') : selectedDate.format('YYYY/MM/DD');
            document.getElementById('calendar').style.display = 'none';
        });
        daysContainer.appendChild(dayCell);
    }
}

function showCurrentDay() {
    const currentDay = moment().format('dddd, MMMM Do YYYY');
    document.getElementById('current-day').textContent = currentDay;
}

// Events

document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.subtract(1, useJalaali ? 'jMonth' : 'month');
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.add(1, useJalaali ? 'jMonth' : 'month');
    renderCalendar();
});

document.getElementById('selected-date').addEventListener('click', () => {
    document.getElementById('calendar').style.display = 'block';
});

document.addEventListener('click', (event) => {
    if (!document.getElementById('datepicker').contains(event.target)) {
        document.getElementById('calendar').style.display = 'none';
    }
});

document.querySelector('.bx-revision').addEventListener('click', () => {
    document.getElementById('selected-date').value = '';
    showCurrentDay();
});

document.getElementById('toggle-date').addEventListener('click', () => {
    useJalaali = !useJalaali;
    document.getElementById('toggle-date').innerHTML = useJalaali ? "Lunar <i class='bx bxs-moon'></i>" : "Solar <i class='bx bxs-sun'></i>";
    currentDate = useJalaali ? moment(currentDate.format('YYYY-MM-DD'), 'YYYY-MM-DD').format('jYYYY/jMM/jDD') : moment(currentDate.format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD');
    renderCalendar();
});

showCurrentDay();
renderCalendar();
