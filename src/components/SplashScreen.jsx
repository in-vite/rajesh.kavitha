import React from "react";
import ganeshaImg from "../assets/ganesha.png";

export default function SplashScreen({ isOpen, isClosing, onOpenInvitation }) {
  if (isOpen) {
    return null;
  }

  return (
    <div className={`splash-screen ${isClosing ? "is-closing" : ""}`}>
      <div className="splash-backdrop"></div>
      <div className="splash-flower-rain" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="splash-card reveal visible">
        <img className="splash-ganesha" src={ganeshaImg} alt="Ganesha illustration" />
        <p className="eyebrow">திருமண அழைப்பிதழ்</p>
        <h1>
          J. Rajesh <span className="splash-heart">❤️</span> V. Kavitha
        </h1>
        <p className="splash-copy">Together with our families, we invite you to celebrate a sacred beginning.</p>
        <button className="open-button" type="button" onClick={onOpenInvitation}>
          Open Invitation
        </button>
      </div>
    </div>
  );
}
