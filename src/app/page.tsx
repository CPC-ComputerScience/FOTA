"use client";

import Link from "next/link";
import Sidebar from "../components/Sidebar";
import "./home.scss";
import { useState, useRef } from "react";

export default function Home() {
  const [videoSource, setVideoSource] = useState(
    "video/on-load.mp4"
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    setVideoSource("video/idle.mp4");
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  return (
    <div className="home-page">
      <video
        ref={videoRef}
        autoPlay
        muted
        onEnded={handleVideoEnded} 
        className="background-video"
      >
        <source src={videoSource} type="video/mp4" />
      </video>
      {/* <h1>Home Page</h1>

      <Link href="/test/example">
        <button>Test Page Example</button>
      </Link>

      <Link href="/onboarding">
        <button>Onboarding Page</button>
      </Link> */}
    </div>
  );
}
