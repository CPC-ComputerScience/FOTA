"use client";

import TubeEffects from "./components/TubeEffects/TubeEffects";
import Link from "next/link";
import "./home.scss";
import { useRef } from 'react';

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePlayGames = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: handle the captured image file
      console.log(file);
    }
  };

  return (
    <div className="home-page">
      <TubeEffects />

      <div id="tube-border" className="tube-border tube-border-mobile"></div>

      <div className="tube-shape">
        <div className="img-container">
          <img src="/homepage-images/fota-logo.png" />
        </div>
        <div className="content">
          <Link className="link" href="/about">
            About Us
          </Link>
          <Link className="link" href="/map">
            View Map
          </Link>
          <Link className="link" href="/games-intro">
            Play Games
          </Link>

        </div>
      </div>
    </div>
  );
}
