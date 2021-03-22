// Import stylesheets
import './reset.css';
import './style.css';

class Pexeso {

    /**
     * Main Containers
     */
    container = null;
    containerHeader =null;
    containerBody = null;

    /**
     * Value representing app status
     * Values as init, running, finished
     */
    state = 'init';

    /**
     * Array of available cards objects
     */
    cards = [];

    /**
     * Revealed cards objects
     */
    revealedCards = [];

    /**
     * Matched cards objects
     */
    matchedCards = [];

    /**
     * Game time in seconds
     */
    time = 0;

    /**
     * Timer interval
     */
    timer = null;

    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.containerHeader = document.getElementById(containerId + '-header');
      this.containerBody = document.getElementById(containerId + '-body');

      const startBtn = document.createElement('button');
      startBtn.innerText = 'Start';
      startBtn.className = 'start-btn';
      startBtn.addEventListener('click', () => {
        this.containerBody.removeChild(startBtn);
        this.generateCards();
        this.render();
        this.start();
      });
      this.containerBody.appendChild(startBtn);
    }

    /**
     * Generate random Cards
     */
    generateCards = () => {
        const cards = [];

        for (const card of [
            {uuid: null, code: 'bell', icon: 'bell'},
            {uuid: null, code: 'bug', icon: 'bug'},
            {uuid: null, code: 'wifi', icon: 'wifi'},
            {uuid: null, code: 'taxi', icon: 'taxi'},
            // {uuid: null, code: 'bicycle', icon: 'bicycle'},
            // {uuid: null, code: 'coffee', icon: 'coffee'},
            // {uuid: null, code: 'diamond', icon: 'diamond'},
            // {uuid: null, code: 'gift', icon: 'gift'},
            // {uuid: null, code: 'rocket', icon: 'rocket'},
            // {uuid: null, code: 'gamepad', icon: 'gamepad'},
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
        this.cards = cards;
    };

    /**
     * Create Cards Elements in Container element
     */
    render = () => {
        for (const card of this.cards) {
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
            this.containerBody.appendChild(cardEl);

            // Register logic on composed card element
            this.initializeCard(card, cardFrontEl, cardBackEl, cardEl);
        }
    };

    // Helper fn, that adds card-revealed class to card matching element
    revealCard = (card) => {
        const el = document.getElementById('card-' + card.uuid);
        if (!el) {
            return;
        }
        el.classList.add('card-revealed');
    };

    // Helper fn, that removes card-revealed class to card matching element
    hideCard = (card) => {
        const el = document.getElementById('card-' + card.uuid);
        if (!el) {
            console.error('no card');
            return;
        }
        el.classList.remove('card-revealed');
    };

    // Helper fn, that adds card-matched class to card matching element
    matchCard = (card) => {
        const el = document.getElementById('card-' + card.uuid);
        if (!el) {
            return;
        }
        el.classList.add('card-matched');
    };

    checkForRevealedCardsMatch = () => {
        if (this.revealedCards.length === 2) {
            return this.revealedCards[0].code === this.revealedCards[1].code;
        }
        return false;
    };

    revealRemainingCards = () => {
        const remainingCards = this.cards.filter(remainingCard => {
            return this.matchedCards.find(matchedCard => {
                return matchedCard.uuid === remainingCard.uuid;
            }) === undefined;
        });

        if (remainingCards.length !== 2) {
            return;
        }

        setTimeout(() => {
            this.revealCard(remainingCards[0]);
            this.revealedCards.push(remainingCards[0]);

            this.revealCard(remainingCards[1]);
            this.revealedCards.push(remainingCards[1]);

            setTimeout(() => {
                this.markAsMatched();
                this.finish();
            }, 500);
        }, 1000);
    };

    markAsMatched = () => {
        // Mark cards as matched
        for (const card of this.revealedCards) {
            this.matchCard(card);
        }
        // Store cards as matched
        this.matchedCards.push(...this.revealedCards);
        // Reset revealed cards
        this.revealedCards = [];
    };

    clearRevealedCards = () => {
        // Hide revealed cards
        for (const card of this.revealedCards) {
            this.hideCard(card);
        }
        // Reset revealed cards
        this.revealedCards = [];
    };

    initializeCard = (card, cardFrontEl, cardBackendEl, cardEl) => {
        const onCardClickFn = () => {
            // Block attempt to reveal card if game is not running
            if (this.state !== 'running') {
                return;
            }

            // Block attempt to revael more cards during evaluation of revealed pair
            if (this.revealedCards.length === 2) {
                return;
            }

            this.revealCard(card);
            this.revealedCards.push(card);

            if (this.revealedCards.length === 2) {
                // Wait 2000ms before evaluation
                setTimeout(() => {
                    if (this.revealedCards.length === 2) {
                        if (this.checkForRevealedCardsMatch()) {
                            this.markAsMatched();
                            // Only single pair remains to be revealed
                            if (this.cards.length - this.matchedCards.length === 2) {
                                this.revealRemainingCards();
                            }
                        } else {
                            this.clearRevealedCards();
                        }
                    }
                }, 1000);
            }
        };

        cardFrontEl.addEventListener('click', onCardClickFn);
    };

    start = () => {
        if (this.state !== 'init') {
            return;
        }
        this.state = 'running';
        this.timer = setInterval(() => {
            this.time++;
            this.renderTime();
        }, 1000);
        this.time = 0;
        this.renderTime();
    };

    finish = () => {
        this.state = 'finished';
        clearInterval(this.timer);
        setTimeout(() => {
            if (this.cards.length === this.matchedCards.length) {
                alert('Ya win!');
            }
        }, 500);
    };

    renderTime = () => {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time - (Math.floor(this.time / 60) * 60);
        const minutesAsString = minutes < 10 ? '0' + String(minutes) : String(minutes);
        const secondsAsString = seconds < 10 ? '0' + String(seconds) : String(seconds);
        this.containerHeader.innerText = 'čas ' + minutesAsString + ':' + secondsAsString;
    };

}

const app = new Pexeso('my-app');