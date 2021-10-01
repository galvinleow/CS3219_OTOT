import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, verifyTokenEnd } from "../../actions/authActions";
import { verifyTokenAsync } from "../../asyncActions/authAsyncActions";
import { setAuthToken } from "../../services/auth";
import {
  addTaskService,
  deleteTaskService,
  getTaskListService,
  getTaskService,
  updateTaskService,
} from "../../services/task";
import AddTask from "./AddTask";
import Header from "./Header";
import Tasks from "./Tasks";

function Tracker() {
  const dispatch = useDispatch();
  const authObj = useSelector((state) => state.auth);

  const { token, expiredAt } = authObj;

  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(true);

  // set timer to renew token
  useEffect(() => {
    setAuthToken(token);
    const verifyTokenTimer = setTimeout(() => {
      dispatch(verifyTokenAsync(true));
    }, moment(expiredAt));

    return (
      () => {
        clearTimeout(verifyTokenTimer);
      },
      [tasks]
    );
  }, [dispatch, expiredAt, token]);

  // Fetch All Task
  const fetchTasks = async () => {
    const result = await getTaskListService();
    if (result.error) {
      dispatch(verifyTokenEnd());
      if (result.response && [401, 403].includes(result.response.status))
        dispatch(userLogout());
      return;
    }
    return result.data;
  };

  // Fetch Single Task
  const fetchTask = async (id) => {
    const result = await getTaskService(id);
    if (result.error) {
      dispatch(verifyTokenEnd());
      if (result.response && [401, 403].includes(result.response.status))
        dispatch(userLogout());
      return;
    }
    return result.data;
  };

  //Add Task
  const addTask = async (task) => {
    const result = await addTaskService(task);
    if (result.error) {
      dispatch(verifyTokenEnd());
      if (result.response && [401, 403].includes(result.response.status))
        dispatch(userLogout());
      return;
    }
    setTasks([...tasks, result.data]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    const result = await deleteTaskService(id);
    if (result.error) {
      dispatch(verifyTokenEnd());
      if (result.response && [401, 403].includes(result.response.status))
        dispatch(userLogout());
      return;
    }
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const result = await updateTaskService(id, updTask);
    if (result.error) {
      dispatch(verifyTokenEnd());
      if (result.response && [401, 403].includes(result.response.status))
        dispatch(userLogout());
      return;
    }
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, reminder: result.data.reminder } : task
      )
    );
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  return (
    <>
      <Header
        title="CS3219 OTOT Assignment"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Task To Show"
      )}
    </>
  );
}

export default Tracker;
