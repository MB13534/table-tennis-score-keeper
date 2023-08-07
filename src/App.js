import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//css
import "./App.css";

import Header from "./components/Header";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Player from "./components/Player";

//this object comes from creating your app in firebase
firebase.initializeApp({
  apiKey: "AIzaSyAmljnfvGM060JfjL3q0ahY4Fnv5Or1gX4",
  authDomain: "table-tennis-score-keeper.firebaseapp.com",
  projectId: "table-tennis-score-keeper",
  storageBucket: "table-tennis-score-keeper.appspot.com",
  messagingSenderId: "841889031459",
  appId: "1:841889031459:web:4cb72c62885d3b27da1896",
  measurementId: "G-LF3XLQ05TY",
});

const auth = firebase.auth();
const db = firebase.firestore();

const playerOneScoreRef = db.collection("currentGame").doc("player1");
const playerOneMatchRef = db.collection("currentMatch").doc("player1");
const playerOneRef = db.collection("currentGame").doc("player1");

const playerTwoScoreRef = db.collection("currentGame").doc("player2");
const playerTwoMatchRef = db.collection("currentMatch").doc("player2");
const playerTwoRef = db.collection("currentGame").doc("player2");

const targetScoreRef = db.collection("currentGame").doc("config");
const targetMatchRef = db.collection("currentMatch").doc("config");

const currentServeRef = db.collection("currentGame").doc("currentServe");

function App() {
  const [targetScore, setTargetScore] = useState(0);
  const [targetMatch, setTargetMatch] = useState(0);

  targetScoreRef.onSnapshot((doc) => {
    setTargetScore(doc.data().targetScore);
  });

  targetMatchRef.onSnapshot((doc) => {
    setTargetMatch(doc.data().targetScore);
  });

  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [playerOneMatch, setPlayerOneMatch] = useState(0);
  const [playerTwoMatch, setPlayerTwoMatch] = useState(0);
  const [currentServe, setCurrentServe] = useState(null);

  useEffect(() => {
    const unsubscribePlayerOneScore = playerOneScoreRef.onSnapshot((doc) => {
      setPlayerOneScore(doc.data().score);
    });

    const unsubscribePlayerTwoScore = playerTwoScoreRef.onSnapshot((doc) => {
      setPlayerTwoScore(doc.data().score);
    });

    const unsubscribePlayerOneMatch = playerOneMatchRef.onSnapshot((doc) => {
      setPlayerOneMatch(doc.data().score);
    });

    const unsubscribePlayerTwoMatch = playerTwoMatchRef.onSnapshot((doc) => {
      setPlayerTwoMatch(doc.data().score);
    });

    const unsubscribecurrentServe = currentServeRef.onSnapshot((doc) => {
      setCurrentServe(doc.data().position);
    });

    return () => {
      unsubscribePlayerOneScore();
      unsubscribePlayerTwoScore();
      unsubscribePlayerOneMatch();
      unsubscribePlayerTwoMatch();
      unsubscribecurrentServe();
    };
  }, []);

  const resetScores = () => {
    playerOneScoreRef.update({ score: 0 });
    playerTwoScoreRef.update({ score: 0 });
  };

  const resetMatches = () => {
    playerOneMatchRef.update({ score: 0 });
    playerTwoMatchRef.update({ score: 0 });
  };

  // useEffect to check if Player One has won
  useEffect(() => {
    if (playerOneScore >= targetScore && playerOneScore - playerTwoScore >= 2) {
      // Player one wins
      playerOneMatchRef.update({ score: playerOneMatch + 1 });
      //loser starts next game
      currentServeRef.update({ position: 2 });
      resetScores();
    }
  }, [playerOneScore]); //eslint-disable-line

  // useEffect to check if Player Two has won
  useEffect(() => {
    if (playerTwoScore >= targetScore && playerTwoScore - playerOneScore >= 2) {
      // Player two wins
      playerTwoMatchRef.update({ score: playerTwoMatch + 1 });
      //loser starts next game
      currentServeRef.update({ position: 0 });
      resetScores();
    }
  }, [playerTwoScore]); //eslint-disable-line

  useEffect(() => {
    if (playerOneMatch >= targetMatch && playerOneMatch !== 0) {
      setWinner(playerOneName);
      setOpenModal(true);
      resetMatches();
      resetScores();
      // Additional logic for when Player One wins the overall match can go here
    } else if (playerTwoMatch >= targetMatch && playerTwoMatch !== 0) {
      setWinner(playerTwoName);
      setOpenModal(true);
      resetMatches();
      resetScores();
      // Additional logic for when Player Two wins the overall match can go here
    }
  }, [playerOneMatch, playerTwoMatch]); //eslint-disable-line

  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [winner, setWinner] = useState("");

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (currentServe !== null) {
      // Only write to Firebase if currentServe has been initialized
      currentServeRef.update({ position: currentServe });
    }
  }, [currentServe]);

  const handleScoreIncrease = () => {
    setCurrentServe((prevServe) => {
      // If the score is 10-10 or more, switch serves every point.
      if (playerOneScore >= 10 && playerTwoScore >= 10) {
        return (prevServe + 2) % 4; // wrap around to the other player's serve
      }
      // The normal rule: switch serves every two points.
      return (prevServe + 1) % 4;
    });
  };

  const handleScoreDecrease = () => {
    setCurrentServe((prevServe) => {
      // If the score is 10-10 or more, switch serves every point.
      if (playerOneScore >= 10 && playerTwoScore >= 10) {
        if (prevServe === 0) {
          return 2;
        }
        return prevServe - 2;
      }
      // The normal rule.
      if (prevServe === 0) {
        return 3;
      }
      return prevServe - 1;
    });
  };

  const handleServeChange = (event) => {
    setCurrentServe(Number(event.target.value));
  };

  const servePositions = [
    `${playerOneName} - Serve 1`,
    `${playerOneName} - Serve 2`,
    `${playerTwoName} - Serve 1`,
    `${playerTwoName} - Serve 2`,
  ];

  return (
    <Box style={{ backgroundColor: "#282535" }}>
      <Header auth={auth} />

      <Grid
        container
        sx={{
          marginTop: {
            xs: "55px",
            sm: "60px",
            md: "66px",
            lg: "65px",
            xl: "65px",
          },
          width: "100%",
          display: "flex",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          justifyContent={{ xs: "center", sm: "flex-end" }}
        >
          <Player
            score={playerOneScore}
            match={playerOneMatch}
            playerName={playerOneName}
            setPlayerName={setPlayerOneName}
            scoreRef={playerOneScoreRef}
            matchRef={playerOneMatchRef}
            playerRef={playerOneRef}
            targetScore={targetScore}
            targetMatch={targetMatch}
            handleServeIncrease={handleScoreIncrease}
            handleServeDecrease={handleScoreDecrease}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          <Player
            reverse={true}
            score={playerTwoScore}
            match={playerTwoMatch}
            playerName={playerTwoName}
            setPlayerName={setPlayerTwoName}
            scoreRef={playerTwoScoreRef}
            matchRef={playerTwoMatchRef}
            playerRef={playerTwoRef}
            targetScore={targetScore}
            targetMatch={targetMatch}
            handleServeIncrease={handleScoreIncrease}
            handleServeDecrease={handleScoreDecrease}
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroup
            value={currentServe}
            onChange={handleServeChange}
            sx={{
              flexDirection: { xs: "row", md: "row" },
              alignItems: "center",
              justifyContent: { xs: "space-around", md: "center" },
            }}
          >
            {servePositions.map((label, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={
                  <Radio
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: currentServe === index ? "55px" : "25px",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: currentServe === index ? "25px" : "18px",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    {label}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </Grid>
      </Grid>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "black",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" id="winner-title" mb={2}>
            Congratulations!
          </Typography>
          <Typography variant="h4" id="winner-description">
            {winner} is the winner!
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default App;
