import { Drawer } from "antd";

const BookDetail = (props) => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
  return (
    <>
      <Drawer
        width={"40vw"}
        title="Book detail"
        onClose={() => {
          setDataDetail(true);
          setIsDetailOpen(false);
        }}
        open={isDetailOpen}
      >
        {dataDetail ? (
          <>
            <p>Id: {dataDetail._id}</p>
            <br />
            <p>Title: {dataDetail.mainText}</p>
            <br />
            <p>Author: {dataDetail.author}</p>
            <br />
            <p>Category: {dataDetail.category}</p>
            <br />
            <p>
              Price:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dataDetail.price)}
            </p>
            <br />
            <p>Quantity: {dataDetail.quantity}</p>
            <br />
            <p>Sold: {dataDetail.sold}</p>
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
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                  dataDetail.thumbnail
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
export default BookDetail;
