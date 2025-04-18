import TodoData from "./components/todo/todo-data";
import TodoNew from "./components/todo/todo-new";
import "./components/todo/todo.css";
import reactLogo from "./assets/react.svg";

const App = () => {
  return (
    <div className="container">
      <div className="todo-title">Todo List</div>
      <TodoNew />
      <TodoData />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>
  );
};

export default App;
