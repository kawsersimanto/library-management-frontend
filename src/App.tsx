import { Outlet } from "react-router";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/ui/mode-toggle";

const App = () => {
  return (
    <>
      <ModeToggle />
      <Button>Click Me</Button>
      <Outlet />
    </>
  );
};

export default App;
