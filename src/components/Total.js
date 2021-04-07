import { useState } from "react";

const Total = ({ totalTotalRef }) => {
  const [total, setTotal] = useState(0);
  totalTotalRef.onSnapshot((doc) => {
    setTotal(doc.data().total);
  });

  return (
    <div className="total">
      <input
        className="value"
        type="number"
        value={total}
        onChange={(e) => {
          totalTotalRef.update({ total: Number(e.target.value) });
        }}
      />
    </div>
  );
};

export default Total;
