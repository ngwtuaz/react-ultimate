import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Menu, message } from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  AuditOutlined,
  MenuOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../context/auth.context";
import { LogOutAPI } from "../../services/api.service";

const Header = () => {
  const [current, setCurrent] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await LogOutAPI();
    if (res.data) {
      //clear data
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      message.success("Logout successfully!");
      //redirect to home
      navigate("/");
    }
  };

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <AuditOutlined />,
    },

    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Login</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),

    ...(user.id
      ? [
          {
            label: `Welcome ${user.fullName}`,
            key: "setting",
            icon: <MenuOutlined />,
            children: [
              {
                label: (
                  <span
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    LogOut
                  </span>
                ),
                key: "logout",
              },
            ],
          },
        ]
      : []),
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
