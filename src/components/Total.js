import { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Total = ({ db, totalTotalRef }) => {
  const capacityRef = db.collection("counter").doc("capacity");

  const [total, setTotal] = useState(0);
  const [capacity, setCapacity] = useState(0);

  totalTotalRef.onSnapshot((doc) => {
    setTotal(doc.data().total);
  });

  capacityRef.onSnapshot((doc) => {
    setCapacity(doc.data().capacity);
  });

  return (
    <>
      <div className="total">
        <CircularProgressbar
          value={total}
          maxValue={capacity}
          strokeWidth={5}
          styles={buildStyles({
            pathColor: `rgba(150, 0, 0, ${total / capacity})`,
            trailColor: "#d6d6d6",
          })}
        />
        <input
          className="value"
          type="number"
          value={total}
          onChange={(e) => {
            totalTotalRef.update({ total: Number(e.target.value) });
          }}
        />
      </div>
      <div className="capacity">
        <small>capacity</small>
        <input
          type="number"
          value={capacity}
          onChange={(e) =>
            capacityRef.update({ capacity: Number(e.target.value) })
          }
        ></input>
      </div>
    </>
  );
};

export default Total;
