import { useParams } from "react-router";

const BookDetails = () => {
  const { bookId } = useParams();
  console.log(bookId);
  return <div>BookDetails</div>;
};

export default BookDetails;
