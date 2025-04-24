import { Space, Table, Tag } from "antd";
import { fetchAllUserAPI } from "../../services/api.service";
import { useState } from "react";

const UserTable = () => {
  const [dataUser, setDataUser] = useState([
    { _id: "Tuan", fullName: 21, email: "KT" },
    { _id: "Huy", fullName: 21, email: "DN" },
  ]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  const loadUser = async () => {
    const res = await fetchAllUserAPI();
    setDataUser(res.data);
  };
  loadUser();
  console.log("Run render: ");

  return <Table columns={columns} dataSource={dataUser} />;
};
export default UserTable;
