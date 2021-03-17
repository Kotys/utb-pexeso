// Import stylesheets
import './reset.css';
import './style.css';

const appDiv = document.getElementById('my-app');

const cards = [
  {
    icon: ''
  }
];

const cardElements = appDiv.getElementsByClassName('card');
for(const cardElement of cardElements) {
  cardElement.addEventListener('click', toggleCardFn);
}

function toggleCardFn() {
  this.classList.toggle('card-revealed');
}