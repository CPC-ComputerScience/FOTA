import Link from 'next/link'

// test comment to see changes??

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/test">
        <button>Test page </button>
      </Link>
      <Link href="/onboarding">
        <button>Onboarding Page</button>
      </Link>
    </div>
  );
}
