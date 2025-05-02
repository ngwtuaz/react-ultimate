import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import { CreateBookAPI } from "../../services/api.service";

const BookForm = (props) => {
  const { loadBook } = props;
  const [thumbnail, setThumbnail] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitBtn = async () => {
    const res = await CreateBookAPI(
      thumbnail,
      mainText,
      author,
      price,
      quantity,
      category
    );
    if (res.data) {
      notification.success({
        message: "Create book successfully",
        description: `Book created successfully`,
      });
      resetAndCloseModal();
      await loadBook();
    } else {
      notification.error({
        message: "Create book failed",
        description: JSON.stringify(res.message),
      });
    }
  };
  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setThumbnail("");
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
  };

  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Book</h3>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Create Book
        </Button>
      </div>

      <Modal
        title="Create Book"
        open={isModalOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText={"CREATE"}
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>Thumbnail</span>
            <Input
              value={thumbnail}
              onChange={(event) => {
                setThumbnail(event.target.value);
              }}
            />
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
            <Input
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Quantity</span>
            <Input
              value={quantity}
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Category</span>
            <Input
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default BookForm;
