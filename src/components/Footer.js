//components

const Footer = () => {
  return (
    <>
      <div className="poster">
        <img
          src="https://barkpost.com/wp-content/uploads/2019/08/newfoundland-dog-sleepy.jpg"
          alt="dog pic"
        />
        <p>@ Wazee St:</p> <strong>+1</strong>
      </div>
      <button className="reset">
        <i className="fas fa-backspace"></i>
      </button>
    </>
  );
};

export default Footer;
