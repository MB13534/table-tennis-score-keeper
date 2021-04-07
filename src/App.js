import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

// import { useRef, useState } from "react";

//css
import "./App.css";

//components
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import Streets from "./components/Streets";
import Total from "./components/Total";
import Footer from "./components/Footer";

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
const db = firebase.firestore();

const totalTotalRef = db.collection("counter").doc("total");

function App() {
  //if user is signed in, user is an object, if not, user is null
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <Header auth={auth} />
      </header>

      <main>{user ? <Main /> : <SignIn auth={auth} />}</main>
    </div>
  );
}

function Main() {
  return (
    <>
      <section className="controls">
        <Total db={db} totalTotalRef={totalTotalRef} />
      </section>
      <section className="streets">
        <Streets db={db} />
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
