import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      <Link href="/test/example">
        <button>Test Page Example</button>
      </Link>

      <Link href="/onboarding">
        <button>Onboarding Page</button>
      </Link>
    </div>
  );
}