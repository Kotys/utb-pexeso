// Import stylesheets
import './reset.css';
import './style.css';

const pexeso = () => {
  const app = this;

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
    // TODO: Randomize
  };

  app.render = () => {
      
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