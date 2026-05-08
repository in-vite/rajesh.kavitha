import React from "react";
import coupleImg from "../assets/couple copy.png";

export default function HeroSection() {
  return (
    <section className="section hero-section track-section" data-step="01" id="home">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow">With divine blessings</p>
          <h2>
            Rajesh <span>&amp;</span> Kavitha
          </h2>
          <p className="tamil-blessing">ஸ்ரீ விநாயகர் அருளால் இனிய திருமண விழாவிற்கு உங்களை அன்புடன் அழைக்கிறோம்</p>
          <p className="hero-subtitle">A sacred union celebrated in temple light, family warmth, and timeless Tamil tradition.</p>
          <a className="scroll-cue" href="#couple">
            <span>Scroll down to begin</span>
            <span className="scroll-arrow">↓</span>
          </a>
        </div>

        <div className="hero-art reveal">
          <div className="hero-frame">
            <img src={coupleImg} alt="Wedding couple artwork" />
          </div>
        </div>
      </div>
    </section>
  );
}
