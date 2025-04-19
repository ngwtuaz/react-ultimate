const TodoNew = (props) => {
  console.log("> check props: ", props);
  const { addNewTodo } = props;
  addNewTodo("Tuan Nguyen");
  return (
    <div className="todo-new">
      <input type="text" />
      <button>Add</button>
    </div>
  );
};

export default TodoNew;
