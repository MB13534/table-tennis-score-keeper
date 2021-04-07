import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { useRef, useState } from "react";

//css
import "./App.css";

//images
// import dog from "./images.dog.jpg";
// console.log(dog);

//components
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import Streets from "./components/Streets";
import Total from "./components/Total";

//this object comes from creating your app in firebase
firebase.initializeApp({
  apiKey: "AIzaSyDwNSlxQ-L5lFcBctdXPxc62D05s0nKlkY",
  authDomain: "milkmarketcounter.firebaseapp.com",
  projectId: "milkmarketcounter",
  storageBucket: "milkmarketcounter.appspot.com",
  messagingSenderId: "931111239045",
  appId: "1:931111239045:web:d89accb1cfbfbcd04ad8ec",
  measurementId: "G-D1EDYVPKY8",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  //if user is signed in, user is an object, if not, user is null
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <div className="title">
          <img
            src="https://img.icons8.com/plasticine/100/000000/milk-bottle.png"
            alt="Milk Bottle"
          />
          <h1>MilkCount</h1>
        </div>
        <SignOut auth={auth} />
      </header>

      <main>{user ? <Main /> : <SignIn auth={auth} />}</main>

      <footer>
        <div className="poster">
          <img
            src="https://barkpost.com/wp-content/uploads/2019/08/newfoundland-dog-sleepy.jpg"
            alt="dog pic"
          />
          <p>@ Wazee St:</p> <strong>+1</strong>
        </div>
        <button className="reset">
          <i className="fas fa-backspace"></i>
        </button>
      </footer>
    </div>
  );
}

function Main() {
  return (
    <>
      <section className="controls">
        <Total />
      </section>
      <Streets />
    </>
  );
}

export default App;
