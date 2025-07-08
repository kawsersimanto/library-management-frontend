import { useParams } from "react-router";

const BorrowBook = () => {
  const params = useParams();
  console.log(params?.id);

  return <div>BorrowBook</div>;
};

export default BorrowBook;
