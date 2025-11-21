import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDGg-8Y3XRTJxPcGEOEAH-TOdLp3UrF4vo",
  authDomain: "homework-e5e4e.firebaseapp.com",
  projectId: "homework-e5e4e",
  storageBucket: "homework-e5e4e.firebasestorage.app",
  messagingSenderId: "193198582104",
  appId: "1:193198582104:web:dbbe6abb4aaf5e38dedd2d",
  measurementId: "G-LHWY072D7H"
};

const app = initializeApp(firebaseConfig)

console.log('FIREBASE OPTIONS:', app.options)

export const auth = getAuth(app)
