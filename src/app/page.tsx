import Link from "next/link";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Sidebar />
      <h1>Fota Home</h1>
      <Link href="/test">
        <button>Test page</button>
      </Link>
    </div>
  );
}
