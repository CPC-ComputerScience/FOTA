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
           <div className="scavenger-container">
          <p>
The Festival of the Arts is an annual celebration held at Crestwood that highlights the creativity, talent, and hard work of our students. This much-anticipated event offers a wonderful opportunity for families, friends, and peers to come together and experience the diverse range of artistic projects students have developed throughout the year. From visual art and music to drama and digital media, the festival showcases the many ways students express themselves and grow as creators. Notably, technology is playing an increasingly prominent role in the arts at Crestwood, reflecting its deep integration into the school’s vibrant and evolving creative culture.

          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
