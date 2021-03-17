// Import stylesheets
import './reset.css';
import './style.css';

const pexeso = () => {
	const app = this;

	app.container = document.getElementById('my-app');

	/**
	 * Array of Cards
	 */
	app.cards = [];

	/**
	 * Generate random Cards
	 */
	app.generateCards = () => {
		app.cards.push({
			icon: 'bell'
		});
		app.cards.push({
			icon: 'bug'
		});
		app.cards.push({
			icon: 'wifi'
		});
		// TODO: Randomize
	};

	app.render = () => {
		for (const card of app.cards) {
			const cardEl = document.createElement('div');
			cardEl.className = 'card';

      const cardFrontEl = document.createElement('div');
			cardFrontEl.className = 'card-front';

      const cardBackEl = document.createElement('div');
			cardBackEl.className = 'card-back';

      cardEl.appendChild(cardFrontEl);
      cardEl.appendChild(cardBackEl);

			app.container.appendChild(cardEl);
		}
	};

	return app;
};

const app = pexeso();

app.generateCards();
app.render();
// app.run();


console.log(app);


// const appDiv = document.getElementById('my-app');

// const cards = [
//   {
//     icon: ''
//   }
// ];


// function generateCards() {

// }

// const cardElements = appDiv.getElementsByClassName('card');
// for(const cardElement of cardElements) {
//   cardElement.addEventListener('click', toggleCardFn);
// }

// function toggleCardFn() {
//   this.classList.toggle('card-revealed');
// }