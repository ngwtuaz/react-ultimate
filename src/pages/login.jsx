import {
  Button,
  Input,
  Form,
  notification,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import { LoginAPI } from "../services/api.service";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await LoginAPI(values.email, values.password);
    if (res.data) {
      message.success("Login successfully!");
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      navigate("/");
    } else {
      notification.error({
        message: "Invalid username or password!",
        description: JSON.stringify(res.message),
      });
    }
    setLoading(false);
  };
  // const onFinish = async (values) => {
  //   console.log(values);
  // };
  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            margin: "5px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Login</legend>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                  type: "email",
                  message: "Invalid email format",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              loading={loading}
              onClick={() => form.submit()}
              type="primary"
            >
              Login
            </Button>
            <Link to={"/"}>
              Go to the homepage <ArrowRightOutlined />
            </Link>
          </div>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Do not have an account? <Link to={"/register"}>Register here</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};
export default LoginPage;
