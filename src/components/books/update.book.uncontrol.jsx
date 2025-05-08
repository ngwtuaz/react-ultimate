import {
  Input,
  Modal,
  InputNumber,
  Select,
  notification,
  message,
  Form,
} from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, UpdateBookAPI } from "../../services/api.service";

const UpdateBookUnControl = (props) => {
  const {
    dataUpdate,
    setDataUpdate,
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    loadBook,
  } = props;

  const [form] = Form.useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      form.setFieldsValue({
        id: dataUpdate._id,
        mainText: dataUpdate.mainText,
        author: dataUpdate.author,
        price: dataUpdate.price,
        quantity: dataUpdate.quantity,
        category: dataUpdate.category,
      });
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      );
    }
  }, [dataUpdate]);

  const updateBook = async (newThumbnail, values) => {
    const { id, mainText, author, price, quantity, category } = values;
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

  const handleSubmitBtn = async (values) => {
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
    await updateBook(newThumbnail, values);
  };

  const resetAndCloseModal = () => {
    form.resetFields();
    setSelectedFile(null);
    setPreview(null);
    setDataUpdate(null);
    setIsModalUpdateOpen(false);
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
  return (
    <Modal
      title="Update Book (uncontrolled component)"
      open={isModalUpdateOpen}
      onOk={() => form.submit()}
      onCancel={() => resetAndCloseModal()}
      maskClosable={false}
      okText={"SAVE"}
    >
      <Form form={form} onFinish={handleSubmitBtn} layout="vertical">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <Form.Item label="Id" name="id">
              <Input disabled />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Title"
              name="mainText"
              rules={[
                {
                  required: true,
                  message: "Please enter a title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please enter an Author!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please enter a price!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} addonAfter={"đ"} />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please enter a quantity!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please enter a Category!",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                name="category"
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
              ></Select>
            </Form.Item>
          </div>
          <div>
            <span>Thumbnail Image</span>
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
                style={{ display: "none" }}
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
      </Form>
    </Modal>
  );
};
export default UpdateBookUnControl;
