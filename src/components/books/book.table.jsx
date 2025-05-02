import { Table, Popconfirm, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateBookModal from "./update.book.modal";
import { useState } from "react";
import ViewUserDetail from "./view.book.detail";
import { DeleteBookAPI } from "../../services/api.service";

const BookTable = (props) => {
  const {
    dataBook,
    loadBook,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
  } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataBookDetail, setDataBookDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataBookDetail(record);
              setIsDetailOpen(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "mainText",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, record, index, action) => {
        if (text)
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text);
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <a style={{ cursor: "pointer", color: "orange" }}>
            <EditOutlined
              onClick={() => {
                setDataUpdate(record);
                setIsModalUpdateOpen(true);
              }}
            />
          </a>
          <Popconfirm
            title="Delete book"
            description="Are you sure to delete this book?"
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDeleteBook = async (id) => {
    const res = await DeleteBookAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete book",
        description: `Delete book successfully`,
      });
      await loadBook();
    } else {
      notification.error({
        message: "Delete book",
        description: JSON.stringify(res.message),
      });
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    //neu thay doi trang: current
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current); //"5" -> 5
      }
    }
    // neu thay doi tong so phan tu: pageSize
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize); //"5" -> 5
      }
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataBook}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
      <UpdateBookModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBook={loadBook}
      />
      <ViewUserDetail
        dataBookDetail={dataBookDetail}
        setDataBookDetail={setDataBookDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        loadBook={loadBook}
      />
    </>
  );
};
export default BookTable;
