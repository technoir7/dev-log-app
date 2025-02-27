import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpCX285wVew6vwrnRlbODnCcgl5sbYktw",
  authDomain: "dev-log-app.firebaseapp.com",
  projectId: "dev-log-app",
  storageBucket: "dev-log-app.firebasestorage.app",
  messagingSenderId: "224340487169",
  appId: "1:224340487169:web:edd321cf89afa97d0ca400"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 