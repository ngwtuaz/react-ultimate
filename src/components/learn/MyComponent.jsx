import "./style.css";

const MyComponent = () => {
  //   const tuna = "tuna"; //string
  //   const tuna = 13; //number
  //   const tuna = true; //boolean
  //   const tuna = null; //null
  //   const tuna = undefined; //undefined
  const tuna = [1, 2, 3]; //array
  //   const tuna = { name: "tuna", age: 13 }; //object
  return (
    <>
      <div> Hello {JSON.stringify(tuna)}</div>
      <div>{console.log("Tuna")};</div>
      <div className="child" style={{ borderRadius: "10px" }}>
        ah
      </div>
    </>
  );
};
export default MyComponent;
