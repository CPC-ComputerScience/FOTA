"use client";

import Link from "next/link";
import Sidebar from "../components/Sidebar";
import "./home.scss";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  return (
    <div className="home-page">
      <div
        id="tube-border"
        className="tube-border tube-border-mobile"
      ></div>

      <div className="tube-shape">
        <div className="content">
          <h1>Festival Of The Arts</h1>
          <br />
          <Link className="link" href="/about">About Us</Link>
          <br />
          <Link className="link" href="/map">View Map</Link>
          <br />
          <Link className="link" href="/games">Play Games</Link>
        </div>
      </div>
    </div>
  );
}