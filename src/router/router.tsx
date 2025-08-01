import BookDetails from "@/app/book-details/BookDetails";
import BookEdit from "@/app/book-edit/BookEdit";
import BorrowBook from "@/app/borrow-book/BorrowBook";
import Root from "@/app/Root";
import Summary from "@/app/summary/Summary";
import BookTable from "@/components/book/BookTable";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <BookTable />,
        index: true,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/book/edit/:id",
        element: <BookEdit />,
      },
      {
        path: "/borrow-book/:id",
        element: <BorrowBook />,
      },
      {
        path: "/summary",
        element: <Summary />,
      },
    ],
  },
]);
