"use client";

import TubeEffects from "../components/TubeEffects/TubeEffects";
import Link from "next/link";
import "./games-intro.scss";

export default function GamesIntro() {
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
            Games introduction.
          </p>
        </div>
      </div>
    </div>
  );
}
