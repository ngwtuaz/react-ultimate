import TodoData from "./components/todo/TodoData.jsx";
import TodoNew from "./components/todo/TodoNew.jsx";
import "./components/todo/todo.css";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Learning React" },
    { id: 2, name: "Watching Youtube" },
  ]);

  const tuna = "TNg";
  const age = 21;
  const data = {
    address: "Kon Tum",
    country: "Vietnam",
  };
  //{key:value}

  const addNewTodo = (name) => {
    alert(`Call me ${name}`);
  };
  return (
    <div className="container">
      <div className="todo-title">Todo List</div>
      <TodoNew addNewTodo={addNewTodo} />
      <TodoData name={tuna} age={age} data={data} todoList={todoList} />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>
  );
};

export default App;
