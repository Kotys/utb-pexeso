// Import stylesheets
import './reset.css';
import './style.css';

const pexeso = (containerId) => {
	const app = this;

  /**
   * Main Container
   */
	app.container = document.getElementById(containerId);

	/**
	 * Array of Cards
	 */
	app.cards = [];

	/**
	 * Generate random Cards
	 */
	app.generateCards = () => {
		const cards = [];

    // TODO: Randomize
    cards.push({icon: 'bell'});
		cards.push({icon: 'bug'});
		cards.push({icon: 'wifi'});
    cards.push({icon: 'taxi'});
    cards.push({icon: 'bicycle'});
    cards.push({icon: 'coffee'});
    cards.push({icon: 'diamond'});
    cards.push({icon: 'gift'});
    cards.push({icon: 'rocket'});
    cards.push({icon: 'gamepad'});

    // Duplicate entries
    cards.push(...cards);

    // Shuffle
    cards.sort(() => Math.random() - 0.5);
    cards.sort(() => Math.random() - 0.5);
    cards.sort(() => Math.random() - 0.5);
    cards.sort(() => Math.random() - 0.5);

    app.cards = cards;
	};

	app.render = () => {
		for (const card of app.cards) {
			const cardEl = document.createElement('div');
			cardEl.className = 'card';

      const cardFrontEl = document.createElement('div');
			cardFrontEl.className = 'card-front';
      cardEl.appendChild(cardFrontEl);

      const cardBackEl = document.createElement('div');
			cardBackEl.className = 'card-back';

      const iconEl = document.createElement('i');
      iconEl.className = 'fa fa-' + card.icon;
      cardBackEl.appendChild(iconEl);

      cardEl.appendChild(cardBackEl);

      cardEl.addEventListener('click', toggleCardFn);


      function toggleCardFn() {
  this.classList.toggle('card-revealed');
}

			app.container.appendChild(cardEl);
		}
	};

	return app;
};

const app = pexeso('my-app');

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