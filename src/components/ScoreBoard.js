import { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Box, TextField } from "@mui/material";

import { styled } from "@mui/material/styles";

const CustomDisableInput = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#fff",
    color: "#fff",
  },
}));

const ScoreBoard = ({
  scoreRef,
  targetScore,
  handleIncrement,
  width,
  fontSize,
  pathColor,
}) => {
  const [score, setScore] = useState(0);

  scoreRef.onSnapshot((doc) => {
    setScore(doc.data().score);
  });

  return (
    <>
      <Box
        sx={{
          width: width,
          borderRadius: "50%",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={handleIncrement}
      >
        <div style={{ pointerEvents: "none" }}>
          <CircularProgressbar
            value={score}
            maxValue={targetScore}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: `rgba(${pathColor}, ${score / targetScore})`,
              trailColor: "#d6d6d6",
            })}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Centering using flexbox
            pointerEvents: "none",
          }}
        >
          <CustomDisableInput
            disabled
            type="number"
            value={score}
            onChange={(e) => {
              scoreRef.update({ score: Number(e.target.value) });
            }}
            inputProps={{
              sx: {
                width: width,
                textAlign: "center",
                color: "white", // Set the font color to white
                fontWeight: "bold", // Make the font bold
                fontSize: fontSize, // Set the font size to a large value
                disableUnderline: true,
                cursor: "pointer",
              },
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
          />
        </div>
      </Box>
    </>
  );
};

export default ScoreBoard;
