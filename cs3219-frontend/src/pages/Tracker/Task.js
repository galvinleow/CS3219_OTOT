import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`} // Getting the class styling from index.css
      onDoubleClick={() => onToggle(task._id)}
    >
      <h3>
        {task.text}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task._id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
