import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <main>
      <h1 className="text-center text-2xl">You are not an Admin.</h1>
      <p className="text-center text-lg">
        Login as a admin or manager{" "}
        <Link to="/login" className="text-[var(--primary)] hover:underline">
          here
        </Link>
      </p>
    </main>
  );
}
