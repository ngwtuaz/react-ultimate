import { Drawer } from "antd";

const ViewBookDetail = (props) => {
  const { dataBookDetail, setDataBookDetail, isDetailOpen, setIsDetailOpen } =
    props;

  return (
    <>
      <Drawer
        title="User Detail"
        onClose={() => {
          setDataBookDetail(null);
          setIsDetailOpen(false);
        }}
        open={isDetailOpen}
        width={"40vw"}
      >
        {dataBookDetail ? (
          <>
            <p>Id: {dataBookDetail._id}</p>
            <br />
            <p>Title: {dataBookDetail.mainText}</p>
            <br />
            <p>Author: {dataBookDetail.author}</p>
            <br />
            <p>Category: {dataBookDetail.category}</p>
            <br />
            <p>Price: {dataBookDetail.price}</p>
            <br />
            <p>Quantity: {dataBookDetail.quantity}</p>
            <br />
            <p>Sold: {dataBookDetail.sold}</p>
            <br />
            <p>Thumbnail:</p>
            <div
              style={{
                marginTop: "10px",
                height: "100px",
                width: "150px",
                border: "1px solid #ccc",
              }}
            >
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                  dataBookDetail.thumbnail
                }`}
              />
            </div>
          </>
        ) : (
          <>
            <p>No data</p>
          </>
        )}
      </Drawer>
    </>
  );
};
export default ViewBookDetail;
