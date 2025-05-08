import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, UpdateBookAPI } from "../../services/api.service";

const UpdateBookControl = (props) => {
  const {
    dataUpdate,
    setDataUpdate,
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    loadBook,
  } = props;

  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      setId(dataUpdate._id);
      setMainText(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      );
    }
  }, [dataUpdate]);

  const updateBook = async (newThumbnail) => {
    const resBook = await UpdateBookAPI(
      id,
      newThumbnail,
      mainText,
      author,
      price,
      quantity,
      category
    );
    if (resBook.data) {
      resetAndCloseModal();
      await loadBook();
      notification.success({
        message: "Update Book",
        description: "Update book successfully",
      });
    } else {
      notification.error({
        message: "Update Book failed",
        description: JSON.stringify(resBook.message),
      });
    }
  };

  const handleSubmitBtn = async () => {
    //k co file upload + anh review => return
    if (!selectedFile && !preview) {
      notification.error({
        message: "Error update book",
        description: "Pls upload thumbnail image",
      });
      return;
    }

    let newThumbnail = "";
    //co anh preview va k co file => k upload file
    if (!selectedFile && preview) {
      //do nothing
      newThumbnail = dataUpdate.thumbnail;
    } else {
      //co anh review va co file => upload file
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload) {
        //success
        newThumbnail = resUpload.data.fileUploaded;
      } else {
        // failed
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(resUpload.message),
        });
        return;
      }
    }
    //step2: update book
    await updateBook(newThumbnail);
  };

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

  const resetAndCloseModal = () => {
    setId("");
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setSelectedFile(null);
    setPreview(null);
    setDataUpdate(null);
    setIsModalUpdateOpen(false);
  };

  return (
    <Modal
      title="Update book (controlled component)"
      open={isModalUpdateOpen}
      onOk={() => handleSubmitBtn()}
      onCancel={() => resetAndCloseModal()}
      maskClosable={false}
      okText={"SAVE"}
    >
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>Id</span>
          <Input value={id} disabled />
        </div>
        <div>
          <span>Title</span>
          <Input
            value={mainText}
            onChange={(event) => {
              setMainText(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Author</span>
          <Input
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Price</span>
          <InputNumber
            style={{ width: "100%" }}
            addonAfter={"đ"}
            value={price}
            onChange={(event) => {
              setPrice(event);
            }}
          />
        </div>
        <div>
          <span>Quantity</span>
          <InputNumber
            style={{ width: "100%" }}
            value={quantity}
            onChange={(event) => {
              setQuantity(event);
            }}
          />
        </div>
        <div>
          <span>Category</span>
          <Select
            style={{ width: "100%" }}
            value={category}
            onChange={(value) => {
              setCategory(value);
            }}
            options={[
              { value: "Arts", label: "Arts" },
              { value: "Business", label: "Business" },
              { value: "Comics", label: "Comics" },
              { value: "Cooking", label: "Cooking" },
              { value: "Entertainment", label: "Entertainment" },
              { value: "History", label: "History" },
              { value: "Music", label: "Music" },
              { value: "Sports", label: "Sports" },
              { value: "Teen", label: "Teen" },
              { value: "Travel", label: "Travel" },
            ]}
          />
        </div>
        <div>
          <span>Thumbnail Img</span>
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
              Upload
            </label>
            <input
              type="file"
              hidden
              id="btnUpload"
              onChange={(event) => {
                handleOnChangeFile(event);
              }}
              onClick={(event) => (event.target.value = null)}
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
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={preview}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default UpdateBookControl;
