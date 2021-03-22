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

    for(const card of [
      {uuid: null, code: 'bell', icon: 'bell'},
		  // {uuid: null, code: 'bug', icon: 'bug'},
      // {uuid: null, code: 'wifi', icon: 'wifi'},
      // {uuid: null, code: 'taxi', icon: 'taxi'},
      // {uuid: null, code: 'bicycle', icon: 'bicycle'},
      // {uuid: null, code: 'coffee', icon: 'coffee'},
      // {uuid: null, code: 'diamond', icon: 'diamond'},
      // {uuid: null, code: 'gift', icon: 'gift'},
      // {uuid: null, code: 'rocket', icon: 'rocket'},
      {uuid: null, code: 'gamepad', icon: 'gamepad'},
    ]) {
      cards.push({
        ...card,
        uuid: card.code + '-1',
      },{
        ...card,
        uuid: card.code + '-2',
      });
    }

    // Shuffle
    cards.sort(() => Math.random() - 0.5);

    // Assign finished cards
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
      cardEl.id = 'card-' + card.uuid;

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
    app.revealedCards.push(card);
  };

  // Helper fn, that removes card-revealed class to card matching element
  app.hideCard = (card) => {
    const el = document.getElementById('card-' + card.uuid);
    if(!el) {
      return;
    }
    el.classList.remove('card-revealed');
    app.revealedCards =app.revealedCards.filter(revealedCard => {
      return revealedCard.uuid !== card.uuid;
    });
  };

  // Helper fn, that adds card-matched class to card matching element
  app.matchCard = (card) => {
    const el = document.getElementById('card-' + card.uuid);
    if(!el) {
      return;
    }
    el.classList.add('card-matched');
    app.matchCards.push(card);
  };

  app.revealedCardsMatch = () => {
    if(app.revealedCards && app.revealedCards.length === 2) {
      return app.revealedCards[0].code === app.revealedCards[1].code;
    }
    return false;
  };

  app.initializeCard = (card, cardFrontEl, cardBackendEl, cardEl) => {
    // const revealCardFn = app.revealCardFnFactory(card, cardEl);
    // const markCardAsRevealedFn = app.markCardAsRevealedFnFactory(card);

    const onClickFn = () => {
      // TODO: Check already revealed!
      app.revealCard(card);
      app.revealedCards.push(card);

      setTimeout(() => {

      if(app.revealedCards.length === 2) {
        if(app.revealedCardsMatch()) {
          for(const card of app.revealedCards) {
            app.matchCard(card);
          }
          app.matchedCards.push(...app.revealedCards);
          app.revealedCards = [];
        } else {
          for(const card of app.revealedCards) {
            app.hideCard(card);
          }
          app.revealedCards = [];
        }
      }

      }, 2000);

      

      // revealCardFn();
      // markCardAsRevealedFn();
      
      // if(app.revealedCard && app.revealedCard.uuid !== card.uuid) {
      //   if(app.checkMatch(app.revealedCard, card)) {

      //   } else {
      //     // Hide them
      //     cardsElements = [
      //       document.getElementsById(app.revealedCard.uuid),
      //       document.getElementsById(card.uuid)
      //     ];
      //     for(const cardElement of cardsElements) {
      //       // Not found
      //       if(!cardElement) {
      //         continue;
      //       }
      //       cardElement.classList.remove('');
      //     }
      //   }
      // }
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