import { Button, Drawer } from "antd";

const ViewUserDetail = (props) => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

  return (
    <>
      <Drawer
        title="User Detail"
        onClose={() => {
          setDataDetail(null);
          setIsDetailOpen(false);
        }}
        open={isDetailOpen}
        width={"40vw"}
      >
        {dataDetail ? (
          <>
            <p>Id: {dataDetail._id}</p>
            <br />
            <p>FullName: {dataDetail.fullName}</p>
            <br />
            <p>Email: {dataDetail.email}</p>
            <br />
            <p>Phone number: {dataDetail.phone}</p>
            <br />
            <p>Avatar:</p>
            <div>
              <img
                width={150}
                height={100}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                  dataDetail.avatar
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="btnUpload"
                style={{
                  display: "block",
                  width: "fit-content",
                  marginTop: "15px",
                  padding: "5px 10px",
                  background: "orange",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Upload Avatar
              </label>
              <input type="file" hidden id="btnUpload" />
            </div>
            {/* <Button type="primary">Upload Avatar</Button> */}
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
export default ViewUserDetail;
