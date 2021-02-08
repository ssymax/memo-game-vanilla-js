import '../styles/style.scss';
import blank from '../assets/blank.jpg';
import blob from '../assets/blob.jpg';
import motor from '../assets/motor.jpg';
import cabin from '../assets/cabin.jpg';

// game engine
const restartBtn = document.querySelector('.starter');
const divContainer = document.querySelector('.container');
let randomImages = [];
const images = [blob, motor, cabin];
let selectedCards = [];
let cardId = [];
let counter = 0;

// randomize array content
const sortArr = () => {
  return 0.5 - Math.random();
};

const start = () => {
  // new array with duplicated images
  const duplicate = images;
  const duplicated = duplicate.concat(images);
  // random duplicated images push to random indexes
  randomImages = duplicated.sort(sortArr);
  // set images to grid container
  for (let i = 0; i < randomImages.length; i++) {
    const img = document.createElement('img');
    img.classList.add('img');
    img.setAttribute('src', `${blank}`);
    img.setAttribute('data-key', i);
    divContainer.append(img);
  }
};

// check win fn()
const checkWin = () => (counter === images.length ? alert('You win') : null);

// match pairs
const match = () => {
  const img = document.querySelectorAll('img');
  const firstCard = cardId[0];
  const secondCard = cardId[1];
  // statement - check pairs
  if (selectedCards[0] === selectedCards[1] && firstCard !== secondCard) {
    counter++;
    setTimeout(() => {
      alert('Match');
      checkWin();
    }, 300);
  } else {
    setTimeout(() => {
      img[firstCard].setAttribute('src', `${blank}`);
      img[secondCard].setAttribute('src', `${blank}`);
    }, 300);
  }
  // reset selected cards and ids
  selectedCards = [];
  cardId = [];
};

// card rotate mechanism
const rotate = (e) => {
  const choosen = e.target.dataset.key;
  selectedCards.push(randomImages[choosen]);
  cardId.push(choosen);
  e.target.classList.add('rotate');
  e.target.setAttribute('src', randomImages[choosen]);
  if (selectedCards.length === 2) {
    match();
  }
};
// addEventListener to each image
const addEvent = () => {
  const imagesArr = Array.from(divContainer.children);
  imagesArr.forEach((img) => img.addEventListener('click', rotate));
};
// run shuffle cards after dom loaded
document.addEventListener('DOMContentLoaded', () => {
  start();
  addEvent();
});
// clean fn() for restart button
const restartGame = () => {
  divContainer.innerHTML = '';
  selectedCards = [];
  cardId = [];
  counter = 0;
  start();
  addEvent();
};

restartBtn.onclick = restartGame;
