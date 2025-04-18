import { useState } from "react";

const TodoNew = (props) => {
  //useState hook (getter/setter)
  // const valueInput = "TNg";
  const [valueInput, setValueInput] = useState("");
  const { addNewTodo } = props;
  // addNewTodo("TN");
  const handleClick = () => {
    addNewTodo(valueInput);
    setValueInput("");
  };

  const handleOnChange = (name) => {
    setValueInput(name);
  };
  return (
    <div className="todo-new">
      <input
        type="text"
        onChange={(event) => handleOnChange(event.target.value)}
        value={valueInput}
        placeholder="Enter your todo item..."
      />
      <button style={{ cursor: "pointer" }} onClick={handleClick}>
        Add
      </button>
      <div>My text input is: {valueInput}</div>
    </div>
  );
};

export default TodoNew;
