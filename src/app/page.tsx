import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Fota Home</h1>
      <Link href="/test">
        <button>Test page</button>
      </Link>
      <Link href="/onboarding">
        <button>Onboarding Page</button>
      </Link>
    </div>
  );
}
