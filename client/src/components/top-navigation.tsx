import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function TopNavigation() {
  return (
    <nav className="p-5 flex justify-between items-center sm:max-w-lg w-full">
      <ModeToggle />

      <h1 className="font-bold uppercase">
        Analytic
      </h1>
      <Button variant="ghost">Back</Button>
    </nav>
  );
}
