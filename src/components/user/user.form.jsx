import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import { CreateUserApi } from "../../services/api.service";

const UserForm = (props) => {
  const { loadUser } = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitBtn = async () => {
    const res = await CreateUserApi(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "Create user successfully",
        description: `User ${res.data.fullName} created successfully`,
      });
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Create user failed",
        description: JSON.stringify(res.message),
      });
    }
  };
  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table User</h3>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Create User
        </Button>
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText="Create"
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
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
            <span>Email</span>
            <Input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Password</span>
            <Input.Password
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
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
export default UserForm;
