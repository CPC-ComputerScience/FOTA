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
          <div className="scavenger-container">
            <h1>Welcome to the CPC Escape Scavenger Hunt!</h1>
            <p>
              Get ready for an interactive adventure across Crestwood, designed
              by our talented computer science students. To begin your journey,
              head over to <strong>Room 227</strong> and pick up your official{" "}
              <strong>Scavenger Hunt Passport</strong>.
            </p>
            <p>
              As you explore the Festival of the Arts, keep your eyes open for{" "}
              <strong>three hidden QR codes</strong> scattered throughout the
              building. Each code, when scanned, will transport you to a
              custom-built online game. Complete each game to earn a unique{" "}
              <strong>four-digit code</strong>.
            </p>
            <p>
              Once you’ve collected all the codes, return to Room 227 and enter
              them into the <strong>Password Machine</strong> to unlock a{" "}
              <strong>secret phrase</strong>. Share this phrase with any member
              of the <strong>CPC Robotics Team</strong> in Room 227—and claim
              your <strong>prize</strong>!
            </p>
            <p>
              Are you ready to solve, explore, and escape? Let the hunt begin!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
