//components
import SignOut from "./SignOut";

const Header = ({ auth }) => {
  return (
    <>
      <div className="title">
        <img
          src="https://img.icons8.com/plasticine/100/000000/milk-bottle.png"
          alt="Milk Bottle"
        />
        <h1>MilkCount</h1>
      </div>
      <SignOut auth={auth} />
    </>
  );
};

export default Header;
