import TodoData from "./components/todo/todo-data";
import TodoNew from "./components/todo/todo-new";
import "./components/todo/todo.css";
import reactLogo from "./assets/react.svg";

const App = () => {
  const tuna = "Tuan Nguyen";
  const age = 21;
  const data = {
    address: "Kon Tum",
    country: "Vietnam",
  };
  //{key:value}
  return (
    <div className="container">
      <div className="todo-title">Todo List</div>
      <TodoNew />
      <TodoData name={tuna} age={age} data={data} />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>
  );
};

export default App;
