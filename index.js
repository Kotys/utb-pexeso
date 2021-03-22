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
	 * Array of available cards objects
	 */
	app.cards = [];

  /**
	 * Revealed cards objects
	 */
  app.revealedCards = [];

  /**
	 * Matched cards objects
	 */
	app.matchedCards = [];

	/**
	 * Generate random Cards
	 */
	app.generateCards = () => {
		const cards = [];

    // TODO: Randomize
    cards.push({uuid: null, code: 'bell', icon: 'bell'});
		cards.push({uuid: null, code: 'bug', icon: 'bug'});
		// cards.push({uuid: null, code: 'wifi', icon: 'wifi'});
    // cards.push({uuid: null, code: 'taxi', icon: 'taxi'});
    // cards.push({uuid: null, code: 'bicycle', icon: 'bicycle'});
    // cards.push({uuid: null, code: 'coffee', icon: 'coffee'});
    // cards.push({uuid: null, code: 'diamond', icon: 'diamond'});
    // cards.push({uuid: null, code: 'gift', icon: 'gift'});
    // cards.push({uuid: null, code: 'rocket', icon: 'rocket'});
    // cards.push({uuid: null, code: 'gamepad', icon: 'gamepad'});

    // Duplicate entries
    cards.push(...cards);

    for(const index in cards) {
      cards[index].uuid = cards[index].code + '-' + index;
    }

    // Shuffle
    cards.sort(() => Math.random() - 0.5);

    app.cards = cards;
	};

  /**
   * Create Cards Elements in Container element
   */
	app.render = () => {
		for (const card of app.cards) {
      // Create card element - card
			const cardEl = document.createElement('div');
			cardEl.className = 'card';

      // Create card element - front side
      const cardFrontEl = document.createElement('div');
			cardFrontEl.className = 'card-front';

      // Create card element - back side
      const cardBackEl = document.createElement('div');
			cardBackEl.className = 'card-back';

      const iconEl = document.createElement('i');
      iconEl.className = 'fa fa-' + card.icon;

      // Append card element - front side
      cardEl.appendChild(cardFrontEl);

      // Compose and append card element - back side
      cardBackEl.appendChild(iconEl);
      cardEl.appendChild(cardBackEl);

      // Assing unique ID to card element
      cardEl.id = card.uuid;

      // Append composed card element to visible DOM
			app.container.appendChild(cardEl);

      // Register logic on composed card element
      app.initializeCard(card, cardFrontEl, cardBackEl, cardEl);
		}
	};

  // Helper fn, that adds card-revealed class to card matching element
  app.revealCard = (card) => {
    const el = document.getElementById('card-' + card.uuid);
    if(!el) {
      return;
    }
    el.classList.add('card-revealed');
  };

  // Helper fn, that removes card-revealed class to card matching element
  app.hideCard = (card) => {
    const el = document.getElementById('card-' + card.uuid);
    if(!el) {
      return;
    }
    el.classList.remove('card-revealed');
  };

  app.revealCardFnFactory = (card) => {
    return (event) => {
      console.log(card);
      cardElement.classList.add('card-revealed');
    };
  };

  app.markCardAsRevealedFnFactory = (card) => {
    // Check for already revealed card
    if (app.revealedCard && app.revealedCard.uuid === card.uuid) {
      return;
    }
    app.revealedCard = card;

    console.log(app.revealedCard);
  };

  app.checkMatch = (cardA, cardB) => {
    return cardA.code === cardB.code;
  };

  app.initializeCard = (card, cardFrontEl, cardBackendEl, cardEl) => {
    const revealCardFn = app.revealCardFnFactory(card, cardEl);
    const markCardAsRevealedFn = app.markCardAsRevealedFnFactory(card);

    const onClickFn = () => {
      // TODO: Check already revealed!
      app.revealCard(card);
      app.revealedCards.push(card);

      if(app.revealedCards.length === 2) {
        if(app.revealedCardsMatch()) {

        }
      }

      // revealCardFn();
      // markCardAsRevealedFn();
      
      if(app.revealedCard && app.revealedCard.uuid !== card.uuid) {
        if(app.checkMatch(app.revealedCard, card)) {

        } else {
          // Hide them
          cardsElements = [
            document.getElementsById(app.revealedCard.uuid),
            document.getElementsById(card.uuid)
          ];
          for(const cardElement of cardsElements) {
            // Not found
            if(!cardElement) {
              continue;
            }
            cardElement.classList.remove('');
          }
        }
      }
    };

    cardFrontEl.addEventListener('click', onClickFn);
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