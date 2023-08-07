import { Box, IconButton } from "@mui/material";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";
import ScoreBoard from "./ScoreBoard";

const Match = ({
  scoreRef,
  targetScore,
  handleIncrement,
  handleDecrement,
  buttonSize,
  score,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      sx={{ height: "100%" }}
    >
      <ScoreBoard
        pathColor="0,0,139"
        fontSize={{
          xs: "75px",
          sm: "75px",
          md: "100px",
          lg: "125px",
          xl: "200px",
        }}
        width={{
          xs: "125px",
          sm: "100px",
          md: "175px",
          lg: "220px",
          xl: "300px",
        }}
        targetScore={targetScore}
        scoreRef={scoreRef}
        handleIncrement={handleIncrement}
      />

      <Box display="flex" alignItems="center">
        <Box>
          <IconButton
            disabled={score === 0}
            onClick={handleDecrement}
            aria-label="decrease"
            sx={{ color: "white" }} // Set the font size and color
          >
            <IndeterminateCheckBox
              sx={{ width: buttonSize, height: buttonSize }}
            />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            onClick={handleIncrement}
            aria-label="increase"
            sx={{ color: "white" }} // Set the font size and color
          >
            <AddBox sx={{ width: buttonSize, height: buttonSize }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Match;
