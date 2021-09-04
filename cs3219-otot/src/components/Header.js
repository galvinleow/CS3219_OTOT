import PropTypes from "prop-types";
import { useLocation } from "react-router";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1 style={headingStyle}>{title}</h1>
      {location.pathname === "/tracker" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

// This will be the default value if the parent does not pass the title value
Header.defaultProps = {
  title: "CS3219 OTOT Assignment Default",
};

// This ensures that the prop pass from the parent will be the expected type
// Will show warning error but will still render
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
const headingStyle = {
  color: "red",
  backgroundColor: "black",
};

export default Header;
