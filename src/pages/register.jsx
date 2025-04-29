import { Button, Input, Form, notification, Row, Col, Divider } from "antd";
import { RegisterUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    //call api
    const res = await RegisterUserAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    if (res.data) {
      notification.success({
        message: "Register user",
        description: "Register user successfully",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Register user failed",
        description: JSON.stringify(res.message),
      });
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ margin: "30px" }}
      // onFinishFailed={onFinishFailed}
    >
      <h3 style={{ textAlign: "center" }}>Register</h3>
      <Row justify={"center"}>
        <Col xs={24} md={6}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={6}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={6}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={6}>
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[
              {
                required: true,
                pattern: new RegExp(/\d+/g),
                message: "Wrong format!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={6}>
          <div>
            <Button onClick={() => form.submit()} type="primary">
              Register
            </Button>
          </div>
          <Divider />
          <div>
            Have an account? <Link to={"/login"}>Login here</Link>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
export default RegisterPage;
