import { HiOutlineHome } from "react-icons/hi";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function TopNavigation() {
  return (
    <nav className="p-5 flex justify-between items-center sm:max-w-lg w-full">
      <ModeToggle />

      <h1 className="font-bold uppercase">Analytic</h1>
      <Button variant="ghost" asChild>
        <Link to={"/"}>
          <HiOutlineHome className="h-5 w-5" />
        </Link>
      </Button>
    </nav>
  );
}
