import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => {
  return (
    <button
      className="btn"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "steelblue",
  text: "{Add Text Here}",
};

Button.protoTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
