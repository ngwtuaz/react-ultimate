const TodoData = (props) => {
  // const TodoData = ({ name, age, data }) => {
  //props là một object{}
  // {
  //   name: "Tuan Nguyen",
  //   age:21,
  //   data: {}
  // }
  const { name, age, data } = props;
  // const name = props.name;
  // const age = props.age;
  // const data = props.data;

  // console.log("> check props: ", props);
  return (
    <div className="todo-data">
      <div>
        My name is {name}
        {/*, I'm {age}, I'm from {data.address} - {data.country}*/}
      </div>
      <div>Learning React</div>
      <div>Watching Youtube</div>
    </div>
  );
};
export default TodoData;
