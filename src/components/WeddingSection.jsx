import React from "react";
import groomImg from "../assets/groom1.jpeg";
import brideImg from "../assets/bride1.jpeg";
import coupleArtImg from "../assets/couple.png";

export default function WeddingSection({
  marriageCountdown,
  receptionCountdown,
  countdownDays,
  countdownHours,
  countdownMins,
  countdownSecs
}) {
  return (
    <section className="section wedding-events-section track-section" data-step="02" id="couple">
      <div className="section-heading reveal">
        <p className="eyebrow">Sacred Moments</p>
        <h3>Celebrate with us</h3>
      </div>
      <div className="wedding-cards-grid">
        <div className="wedding-event-card reveal">
          <p className="event-tag">Ceremony</p>
          <h4>Marriage Ceremony</h4>
          <div className="event-details">
            <p className="event-date">25 June 2026</p>
            <p className="event-time">7:30 AM - 9:00 AM</p>
            <p className="event-venue">Arulmigu Balamurugan Temple</p>
          </div>
          <div className="countdown-badge">{marriageCountdown}</div>
        </div>
        <div className="wedding-event-card reveal">
          <p className="event-tag">Reception</p>
          <h4>Wedding Reception</h4>
          <div className="event-details">
            <p className="event-date">26 June 2026</p>
            <p className="event-time">6:00 PM onwards</p>
            <p className="event-venue">ICF Integral Club</p>
          </div>
          <div className="countdown-badge">{receptionCountdown}</div>
        </div>
      </div>

      <div className="countdown-section-card reveal">
        <div className="countdown-section-header">
          <p className="eyebrow">Time Until Your Celebration</p>
          <h3>The Grand Moment Awaits</h3>
        </div>
        <div className="countdown-display">
          <div className="countdown-item">
            <span className="countdown-value">{countdownDays}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{countdownHours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{countdownMins}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{countdownSecs}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
      </div>

      <div className="section-heading reveal">
        <p className="eyebrow">The Couple</p>
        <h3>Two hearts, one sacred promise</h3>
      </div>
      <div className="split-panel couple-grid">
        <article className="panel reveal">
          <div className="couple-photo-wrapper">
            <img src={groomImg} alt="J. Rajesh - Groom" className="couple-photo" />
          </div>
          <p className="panel-label">Groom</p>
          <h4>J. Rajesh</h4>
        </article>
        <article className="panel panel-image reveal">
          <img src={coupleArtImg} alt="Bride and groom portrait artwork" />
        </article>
        <article className="panel reveal">
          <div className="couple-photo-wrapper">
            <img src={brideImg} alt="V. Kavitha - Bride" className="couple-photo" />
          </div>
          <p className="panel-label">Bride</p>
          <h4>V. Kavitha</h4>
        </article>
      </div>
    </section>
  );
}
