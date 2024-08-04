"use strict";

let currentDate = moment();
let useJalaali = false;

function renderCalendar() {
    const daysContainer = document.querySelector('.days');
    daysContainer.innerHTML = '';

    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
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
            const selectedDate = currentDate.clone().date(i);
            document.getElementById('selected-date').value = useJalaali ? selectedDate.format('jYYYY/jMM/jDD') : selectedDate.format('YYYY/MM/DD');
            document.getElementById('calendar').style.display = 'none';
        });
        daysContainer.appendChild(dayCell);
    }
}