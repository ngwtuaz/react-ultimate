import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import {
  handleUploadFile,
  UpdateUserAvatarAPI,
} from "../../services/api.service";

const ViewUserDetail = (props) => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } =
    props;

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleUpdateUserAvatar = async () => {
    //step1 upload file
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      //success
      const newAvatar = resUpload.data.fileUploaded;
      //step2 update user
      const resUpdateAvatar = await UpdateUserAvatarAPI(
        newAvatar,
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone
      );
      if (resUpdateAvatar.data) {
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUser();
        notification.success({
          message: "Upload user avatar",
          description: "Update avatar successfully",
        });
      } else {
        notification.error({
          message: "Upload avatar failed",
          description: JSON.stringify(resUpdateAvatar.message),
        });
      }
      console.log(resUpdateAvatar);
    } else {
      //failed
      notification.error({
        message: "Upload file failed",
        description: JSON.stringify(resUpload.message),
      });
    }
    console.log(resUpload);
  };

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
              <input
                type="file"
                hidden
                id="btnUpload"
                // onChange={handleOnChangeFile}
                onChange={(event) => {
                  handleOnChangeFile(event);
                }}
              />
            </div>
            {preview && (
              <>
                <div
                  style={{
                    marginTop: "10px",
                    marginBottom: "15px",
                    height: "100px",
                    width: "150px",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src={preview}
                  />
                </div>
                <Button type="primary" onClick={handleUpdateUserAvatar}>
                  Save
                </Button>
              </>
            )}
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
