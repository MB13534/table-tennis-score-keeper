const Footer = ({ db, auth }) => {
  function handleReset() {
    db.collection("counter").doc("total").update({
      total: 0,
      in: 0,
      out: 0,
    });
    db.collection("counter").doc("18th").update({
      total: 0,
      in: 0,
      out: 0,
    });
    db.collection("counter").doc("maven").update({
      total: 0,
      in: 0,
      out: 0,
    });
    db.collection("counter").doc("wazee").update({
      total: 0,
      in: 0,
      out: 0,
    });
    db.collection("counter").doc("alley").update({
      total: 0,
      in: 0,
      out: 0,
    });
  }

  return (
    <>
      <div className="poster">
        <img src={auth.currentUser.photoURL} alt="dog pic" />
        {/* <p>@ Wazee St:</p> <strong>+1</strong> */}
      </div>
      <button onClick={handleReset} className="reset">
        <i className="fas fa-backspace"></i>
      </button>
    </>
  );
};

export default Footer;
