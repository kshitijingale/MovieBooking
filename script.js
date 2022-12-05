const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const container = document.querySelector('.container');
const total = document.getElementById('total')
const count = document.getElementById('count')
const movieSelect = document.querySelector('#movie');

let ticketPrice = movieSelect.value;

populateUI();

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !(e.target.classList.contains('occupied'))) {
        e.target.classList.toggle('selected');
    }
    getTotalPrice();
}
);

movieSelect.addEventListener('change', (e) => {
    const selectedMovie = e.target;
    ticketPrice = selectedMovie.value;

    setMovieData(selectedMovie.selectedIndex, selectedMovie.value);
    getTotalPrice();
})

function getTotalPrice() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    count.innerText = selectedSeats.length;
    total.innerText = +ticketPrice * (selectedSeats.length);

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

// Save selected movie and it's ticket price

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// get data from localstorage and render it 
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);

    if (selectedSeats !== null) {
        selectedSeats.forEach((index) => {
            [...seats][index].classList.add('selected');
        });
    }

    const movieIndex = localStorage.getItem('selectedMovieIndex');
    const moviePrice = localStorage.getItem('selectedMoviePrice');
    if (movieIndex !== null) {
        movieSelect.selectedIndex = movieIndex;
        ticketPrice = +moviePrice;
    }
    getTotalPrice();
}
