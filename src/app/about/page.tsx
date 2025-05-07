"use client";

import TubeEffects from "../components/TubeEffects/TubeEffects";
import Link from "next/link";
import "./about.scss";

export default function About() {
  return (
    <div className="home-page">
      <TubeEffects />

      <div id="tube-border" className="tube-border tube-border-mobile"></div>

      <div className="tube-shape">
        <Link href="/">
          <div className="back-button">
            <p>Back</p>
          </div>
        </Link>
        <div className="about-content">
          <p>
            Crestwood&apos;s artists shine during The Festival Of The Arts.
          </p>
        </div>
      </div>
    </div>
  );
}
