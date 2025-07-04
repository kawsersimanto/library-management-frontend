import { Outlet } from "react-router";
import BookTable from "./components/book/BookTable";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <BookTable />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
