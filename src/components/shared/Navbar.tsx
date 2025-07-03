import { LibraryBig } from "lucide-react";
import { Link } from "react-router";
import BookDialog from "../book/BookDialog";
import { ModeToggle } from "../ui/mode-toggle";

const Navbar = () => {
  return (
    <header className="px-5 py-5">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5">
            <LibraryBig className="text-green-500" size={34} />
            <h2 className="text-2xl font-bold uppercase">Library</h2>
          </Link>
          <div className="flex items-center gap-2">
            <BookDialog />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
