import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="flex gap-4 justify-center mb-8">
      {!isHome && (
        <Button variant="ghost" asChild>
          <Link to="/">Home</Link>
        </Button>
      )}
      <Button variant="ghost" asChild>
        <Link to="/about">About</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link to="/contact">Contact</Link>
      </Button>
    </nav>
  );
};