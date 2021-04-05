import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { useRef, useState } from "react";

//css
import "./App.css";

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
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <button className="sign-in" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}

function SignOut() {
  //check to see if there is a current user signed in, if there is, render a sign out button
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  /* this reference will make it scroll to the bottom after you click send */
  const dummy = useRef();

  //reference a firestore collection
  const messagesRef = firestore.collection("messages");
  //search for a subset of documents
  const query = messagesRef.orderBy("createdAt").limitToLast(25);
  //actually make the query and listn for any updates
  //this returns an array of objects, each object is the message in the database
  //anytime the data changes, react will rerender with the current data
  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  //update firestore when user submits message, prevent page from reloading
  const sendMessage = async (e) => {
    e.preventDefault();
    //get current users credentials
    const { uid, photoURL } = auth.currentUser;

    //create new document in firestore, takes JS object as argument
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL,
      uid,
    });

    //set formValue back to empty string
    setFormValue("");

    //reference is at the bottom of the page, scroll to that reference
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        {/* this reference will make it scroll to the bottom after you click send */}
        <div ref={dummy}></div>
      </main>

      {/* on submit writes value to firestore */}
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          //bind state to form inputr
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  //check to see if the uid from the message is the user that is logged in
  //if it is, messageClass = 'sent', else 'received'
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt={uid} />
      <p>{text}</p>
    </div>
  );
}

export default App;
