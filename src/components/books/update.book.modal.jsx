import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { UpdateUserAPI } from "../../services/api.service";

const UpdateBookModal = (props) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUser,
  } = props;
  // dataUpdate != prev dataUpdate
  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleSubmitBtn = async () => {
    const res = await UpdateUserAPI(id, fullName, phone);
    if (res.data) {
      notification.success({
        message: "Update user successfully",
        description: `User Updated successfully`,
      });
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Update user failed",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setFullName("");
    setPhone("");
    setDataUpdate(null);
  };

  return (
    <div>
      <Modal
        title="Update User"
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
            <span>FullName</span>
            <Input
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Phone number</span>
            <Input
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateBookModal;
