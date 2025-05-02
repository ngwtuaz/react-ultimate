import BookForm from "../components/books/book.form";
import BookTable from "../components/books/book.table";
import { useEffect, useState } from "react";
import { fetchAllBookAPI } from "../services/api.service";

const BookPage = () => {
  //lift-up state
  const [dataBook, setDataBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  //empty array =>run once
  //not empty => next value !== prev value
  useEffect(() => {
    loadBook();
  }, [current, pageSize]); //[] + condition

  const loadBook = async () => {
    const res = await fetchAllBookAPI(current, pageSize);
    if (res.data) {
      setDataBook(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <BookForm loadBook={loadBook} />
      <BookTable
        dataBook={dataBook}
        loadBook={loadBook}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};
export default BookPage;
