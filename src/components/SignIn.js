import firebase from "firebase/app";
import { Button } from "@mui/material";

const SignIn = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={signInWithGoogle}
      sx={{
        my: 2,
        color: "white",
        display: "block",
      }}
    >
      Sign in
    </Button>
  );
};

export default SignIn;
