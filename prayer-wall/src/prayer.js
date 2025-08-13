// ----- 1. Import Firebase + candle image -----
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onChildAdded } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';
import candleImage from './candle.png';

// ----- 2. Initialize Firebase -----
const firebaseConfig = {
  apiKey: 'AIzaSyBaVEqvYI95nEbuZdAcgFTnkGEalrPDIz4',
  authDomain: 'prayer-wall-d3989.firebaseapp.com',
  projectId: 'prayer-wall-d3989',
  storageBucket: 'prayer-wall-d3989.appspot.com',
  messagingSenderId: '166824698583',
  appId: '1:166824698583:web:5d596ebb2b26d7f99b8692',
  databaseURL: 'https://prayer-wall-d3989-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// ----- 3. Sign in anonymously -----
signInAnonymously(auth)
  .then(() => console.log('Signed in anonymously'))
  .catch(error => console.error('Anonymous sign-in failed:', error));

// ----- 4. DOMContentLoaded wrapper -----
document.addEventListener('DOMContentLoaded', () => {
  const prayerInput = document.getElementById('prayerInput');
  const prayerWall = document.getElementById('prayerWall');
  const postButton = document.getElementById('postPrayer');

  if (!prayerInput || !prayerWall || !postButton) return;

  // Add a prayer
  function addPrayer() {
    const text = prayerInput.value.trim();
    if (!text) return alert('Please write a prayer before posting.');
    push(ref(db, 'prayers'), { text, time: Date.now() });
    prayerInput.value = '';
  }

  // Display a prayer
  function displayPrayer(text) {
    const div = document.createElement('div');
    div.classList.add('prayer');
    div.innerHTML = `
      <img class="candle" src="${candleImage}" alt="candle">
      <p>${text}</p>
    `;
    prayerWall.prepend(div);
  }

  // Listen for new prayers in real-time
  onChildAdded(ref(db, 'prayers'), snapshot => {
    const data = snapshot.val();
    displayPrayer(data.text);
  });

  postButton.addEventListener('click', addPrayer);
});
