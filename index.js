// Import stylesheets
import './reset.css';
import './style.css';

const pexeso = (containerId) => {
    const app = this;

    /**
     * Main Containers
     */
    app.container = document.getElementById(containerId);
    app.containerHeader = document.getElementById(containerId + '-header');
    app.containerBody = document.getElementById(containerId + '-body');

    const startBtn = document.createElement('button');
    startBtn.innerText = 'Start';
    startBtn.className = 'start-btn';
    startBtn.addEventListener('click', () => {
      app.containerBody.removeChild(startBtn);
      app.generateCards();
      app.render();
      app.start();
    });
    app.containerBody.appendChild(startBtn);

    /**
     * Value representing app status
     * Values as init, running, finished
     */
    app.state = 'init';

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
     * Game time in seconds
     */
    app.time = 0;

    /**
     * Timer interval
     */
    app.timer = null;

    /**
     * Generate random Cards
     */
    app.generateCards = () => {
        const cards = [];

        for (const card of [
            {uuid: null, code: 'bell', icon: 'bell'},
            // {uuid: null, code: 'bug', icon: 'bug'},
            // {uuid: null, code: 'wifi', icon: 'wifi'},
            // {uuid: null, code: 'taxi', icon: 'taxi'},
            // {uuid: null, code: 'bicycle', icon: 'bicycle'},
            {uuid: null, code: 'coffee', icon: 'coffee'},
            // {uuid: null, code: 'diamond', icon: 'diamond'},
            // {uuid: null, code: 'gift', icon: 'gift'},
            // {uuid: null, code: 'rocket', icon: 'rocket'},
            {uuid: null, code: 'gamepad', icon: 'gamepad'},
        ]) {
            cards.push({
                ...card,
                uuid: card.code + '-1',
            }, {
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
            app.containerBody.appendChild(cardEl);

            // Register logic on composed card element
            app.initializeCard(card, cardFrontEl, cardBackEl, cardEl);
        }
    };

    // Helper fn, that adds card-revealed class to card matching element
    app.revealCard = (card) => {
        const el = document.getElementById('card-' + card.uuid);
        if (!el) {
            return;
        }
        el.classList.add('card-revealed');
    };

    // Helper fn, that removes card-revealed class to card matching element
    app.hideCard = (card) => {
        const el = document.getElementById('card-' + card.uuid);
        if (!el) {
            console.error('no card');
            return;
        }
        el.classList.remove('card-revealed');
    };

    // Helper fn, that adds card-matched class to card matching element
    app.matchCard = (card) => {
        const el = document.getElementById('card-' + card.uuid);
        if (!el) {
            return;
        }
        el.classList.add('card-matched');
    };

    app.checkForRevealedCardsMatch = () => {
        if (app.revealedCards.length === 2) {
            return app.revealedCards[0].code === app.revealedCards[1].code;
        }
        return false;
    };

    app.revealRemainingCards = () => {
        const remainingCards = app.cards.filter(remainingCard => {
            return app.matchedCards.find(matchedCard => {
                return matchedCard.uuid === remainingCard.uuid;
            }) === undefined;
        });

        if (remainingCards.length !== 2) {
            return;
        }

        setTimeout(() => {
            app.revealCard(remainingCards[0]);
            app.revealedCards.push(remainingCards[0]);

            app.revealCard(remainingCards[1]);
            app.revealedCards.push(remainingCards[1]);

            setTimeout(() => {
                app.markAsMatched();
                app.finish();
            }, 500);
        }, 1000);
    };

    app.markAsMatched = () => {
        // Mark cards as matched
        for (const card of app.revealedCards) {
            app.matchCard(card);
        }
        // Store cards as matched
        app.matchedCards.push(...app.revealedCards);
        // Reset revealed cards
        app.revealedCards = [];
    };

    app.clearRevealedCards = () => {
        // Hide revealed cards
        for (const card of app.revealedCards) {
            app.hideCard(card);
        }
        // Reset revealed cards
        app.revealedCards = [];
    };

    app.initializeCard = (card, cardFrontEl, cardBackendEl, cardEl) => {
        const onCardClickFn = () => {
            // Block attempt to reveal card if game is not running
            if (app.state !== 'running') {
                return;
            }

            // Block attempt to revael more cards during evaluation of revealed pair
            if (app.revealedCards.length === 2) {
                return;
            }

            app.revealCard(card);
            app.revealedCards.push(card);

            if (app.revealedCards.length === 2) {
                // Wait 2000ms before evaluation
                setTimeout(() => {
                    if (app.revealedCards.length === 2) {
                        if (app.checkForRevealedCardsMatch()) {
                            app.markAsMatched();
                            // Only single pair remains to be revealed
                            if (app.cards.length - app.matchedCards.length === 2) {
                                app.revealRemainingCards();
                            }
                        } else {
                            app.clearRevealedCards();
                        }
                    }
                }, 1000);
            }
        };

        cardFrontEl.addEventListener('click', onCardClickFn);
    };

    app.start = () => {
        if (app.state !== 'init') {
            return;
        }
        app.state = 'running';
        app.timer = setInterval(() => {
            app.time++;
            app.renderTime();
        }, 1000);
        app.time = 0;
        app.renderTime();
    };

    app.finish = () => {
        app.state = 'finished';
        clearInterval(app.timer);
        if(app.cards.length === app.matchedCards.length) {
          alert('Ya win!');
        }
    };

    app.renderTime = () => {
      const minutes = Math.round(app.time / 60);
      const seconds = app.time - (minutes * 60);
      const minutesAsString = minutes < 10 ? '0' + String(minutes) : String(minutes);
      const secondsAsString = seconds < 10 ? '0' + String(seconds) : String(seconds);
      app.containerHeader.innerText = 'čas ' + minutesAsString + ':' + secondsAsString;
    };

    return app;
};

const app = pexeso('my-app');

console.log(app);