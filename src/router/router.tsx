import BookDetails from "@/app/book-details/BookDetails";
import BookEdit from "@/app/book-edit/BookEdit";
import Root from "@/app/Root";
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
    ],
  },
]);
