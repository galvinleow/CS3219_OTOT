import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const About = () => {
  const [showRevert, setRevertDisplay] = useState(false);

  return (
    <div>
      <div className="d-grid gap-2">
        <Button
          style={{ color: "white", background: "red" }}
          variant="dark"
          size="lg"
          onClick={() => setRevertDisplay(!showRevert)}
        >
          Show Version and Back Link
        </Button>
      </div>
      {showRevert && (
        <div>
          <h4>Version 1.0.0</h4>
          <Link to="/">Go Back</Link>
        </div>
      )}
    </div>
  );
};

export default About;
