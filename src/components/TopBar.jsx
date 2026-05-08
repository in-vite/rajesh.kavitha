import React from "react";

export default function TopBar({ scrollPercent, isMusicOn, onToggleMusic }) {
  return (
    <header className="topbar">
      <div className="percentage-card">
        <span className="percentage-value">{scrollPercent}</span>
      </div>
      <button
        className={`music-toggle ${isMusicOn ? "is-on" : ""}`}
        type="button"
        onClick={onToggleMusic}
        aria-pressed={isMusicOn}
        aria-label={isMusicOn ? "Pause background music" : "Play background music"}
        title={isMusicOn ? "Pause background music" : "Play background music"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {isMusicOn ? (
            <g>
              <rect x="6" y="4" width="3" height="16" rx="1"></rect>
              <rect x="15" y="4" width="3" height="16" rx="1"></rect>
            </g>
          ) : (
            <path d="M8 5v14l11-7z"></path>
          )}
        </svg>
      </button>
    </header>
  );
}
