import Score from "./Score";
import firebase from "firebase";
import { Box, TextField } from "@mui/material";
import Match from "./Match";

const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

const Player = ({
  scoreRef,
  matchRef,
  playerRef,
  targetScore,
  targetMatch,
  playerName,
  setPlayerName,
  handleServeIncrease,
  handleServeDecrease,
  score,
  match,
  reverse = false,
}) => {
  playerRef.onSnapshot((doc) => {
    setPlayerName(doc.data().name);
  });

  function handleDecrementScore() {
    scoreRef.update({ score: decrement });
    handleServeDecrease();
  }

  function handleIncrementScore() {
    scoreRef.update({ score: increment });
    handleServeIncrease();
  }

  function handleDecrementMatch() {
    matchRef.update({ score: decrement });
  }

  function handleIncrementMatch() {
    matchRef.update({ score: increment });
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        value={playerName}
        onChange={(e) => {
          playerRef.update({ name: e.target.value });
        }}
        inputProps={{
          sx: {
            textAlign: "center",
            color: "white", // Set the font color to white
            fontWeight: "bold", // Make the font bold
            fontSize: {
              xs: "30px",
              sm: "35px",
              md: "40px",
              lg: "50px",
              xl: "50px",
            }, // Set the font size to a large value
            disableUnderline: true,
            maxWidth: {
              xs: "200px",
              sm: "200px",
              md: "250px",
              lg: "300px",
              xl: "400px",
            },
            paddingTop: 0,
          },
        }}
        sx={{
          "& fieldset": { border: "none" },
        }}
      />
      <Box
        display="flex"
        alignItems="center"
        sx={{
          flexDirection: {
            xs: "row",
            sm: reverse ? "row-reverse" : "row",
          },
        }}
      >
        <Match
          score={match}
          buttonSize="40px"
          scoreRef={matchRef}
          targetScore={targetMatch}
          handleIncrement={handleIncrementMatch}
          handleDecrement={handleDecrementMatch}
        />

        <Score
          score={score}
          buttonSize="60px"
          scoreRef={scoreRef}
          targetScore={targetScore}
          handleIncrement={handleIncrementScore}
          handleDecrement={handleDecrementScore}
        />
      </Box>
    </Box>
  );
};

export default Player;
