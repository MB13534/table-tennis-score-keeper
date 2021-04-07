const Street = ({
  street,
  totalTotalRef,
  inTotalRef,
  outTotalRef,
  totalStreetRef,
  inStreetRef,
  outStreetRef,
  increment,
  decrement,
}) => {
  function handleDecrement() {
    totalTotalRef.update({ total: decrement });
    totalStreetRef.update({ total: decrement });
    outTotalRef.update({ out: increment });
    outStreetRef.update({ out: increment });
  }

  function handleIncrement() {
    totalTotalRef.update({ total: increment });
    totalStreetRef.update({ total: increment });
    inTotalRef.update({ in: increment });
    inStreetRef.update({ in: increment });
  }

  return (
    <div className="street">
      <button onClick={handleDecrement} className="small">
        <i className="fas fa-minus"></i>
      </button>
      <h2>{street}</h2>
      <button onClick={handleIncrement} className="small">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default Street;
