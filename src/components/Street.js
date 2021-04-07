const Street = ({ street }) => {
  return (
    <div className="street">
      <button className="small">
        <i className="fas fa-minus"></i>
      </button>
      <h2>{street}</h2>
      <button className="small">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default Street;
