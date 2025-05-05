"use client";

import Link from "next/link";
import Sidebar from "../components/Sidebar";
import "./home.scss";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  return (
    <div className="home-page">
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
          <Link className="link" href="/games">
            Play Games
          </Link>
        </div>
      </div>
    </div>
  );
}
