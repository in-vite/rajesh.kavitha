import React from "react";

export default function FooterBar({ visits }) {
  return (
    <footer className="footer">


      <div className="footer-meta">
        <p className="footer-credit">
          Crafted with love by{" "}
          <a href="https://christinfotech.org/" target="_blank" rel="noopener noreferrer">
            CHRIST Infotech
          </a>
        </p>
        <div className="visitor-widget" aria-label="Visitor count">
          <svg viewBox="0 0 180 44" role="img" aria-hidden="true">
            <rect x="1" y="1" width="178" height="42" rx="21"></rect>
            <circle cx="25" cy="22" r="7"></circle>
            <path d="M40 29c7-10 17-10 24 0"></path>
            <text x="62" y="27">
              Visits: <tspan>{visits}</tspan>
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
