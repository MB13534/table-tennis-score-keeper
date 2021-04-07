import { useState } from "react";

const Total = ({ totalTotalRef }) => {
  const [total, setTotal] = useState(0);
  totalTotalRef.onSnapshot((doc) => {
    setTotal(doc.data().total);
  });
  return (
    <div className="total">
      <h1>{total}</h1>
    </div>
  );
};

export default Total;
