import ScoreBoard from "./ScoreBoard";
import { Box, IconButton } from "@mui/material";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";

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
        pathColor="167, 141, 0"
        fontSize={{
          xs: "100px",
          sm: "100px",
          md: "150px",
          lg: "200px",
          xl: "300px",
        }}
        width={{
          xs: "200px",
          sm: "175px",
          md: "250px",
          lg: "350px",
          xl: "450px",
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
