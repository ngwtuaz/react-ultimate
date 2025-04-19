const TodoNew = (props) => {
  console.log("> check props: ", props);
  const { addNewTodo } = props;
  // addNewTodo("Tuan Nguyen"); //fire
  const handleClick = () => {
    console.log("Click me"); //fire
  };

  const handleOnChange = (name) => {
    console.log(name); //fire
  };
  return (
    <div className="todo-new">
      <input
        onChange={(event) => handleOnChange(event.target.value)}
        type="text"
      />
      <button style={{ cursor: "pointer" }} onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default TodoNew;
