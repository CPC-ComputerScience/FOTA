"use client";

import Link from "next/link";
import Sidebar from "../components/Sidebar";
import "./home.scss";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [videoSource, setVideoSource] = useState("video/on-load.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);
  const idleVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    if (idleVideoRef.current) {
      idleVideoRef.current.classList.remove('hide');
      idleVideoRef.current.classList.add('show');
    }
    if (videoRef.current) {
      videoRef.current.classList.remove('show');
      videoRef.current.classList.add('hide');
    }
  };

  return (
    <div className="home-page">
      <video
        ref={idleVideoRef}
        autoPlay
        muted
        loop
        className="background-video hide"
      >
        <source src="video/idle.mp4" type="video/mp4" />
      </video>
      <video
        ref={videoRef}
        autoPlay
        muted
        onEnded={handleVideoEnded}
        loop={videoSource === "video/idle.mp4"}
        className="background-video show"
      >
        <source src="video/on-load.mp4" type="video/mp4" />
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
