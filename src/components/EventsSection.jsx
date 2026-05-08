import React from "react";

export default function EventsSection({ eventData, marriageCountdown, receptionCountdown }) {
  return (
    <section className="section events-section track-section" data-step="04" id="events">
      <div className="section-heading reveal">
        <p className="eyebrow">Celebration Details</p>
        <h3>Save these auspicious moments</h3>
      </div>

      {eventData.map((event) => (
        <div key={event.label} className={`event-card reveal ${event.accent ? "accent-card" : ""}`}>
          <div className="event-meta">
            <p className="panel-label">{event.label}</p>
            <h4>{event.title}</h4>
            <p>{event.date}</p>
            <p>{event.time}</p>
            <div className="countdown-timer">{event.label === "Marriage" ? marriageCountdown : receptionCountdown}</div>
          </div>
          <div className="event-detail">
            <p>{event.body}</p>
            <div className="event-actions">
              {event.label === "Marriage" ? (
                <a
                  className="event-link event-link-secondary"
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rajesh%20%26%20Kavitha%20Wedding&dates=20260625T020000Z/20260625T033000Z&details=Wedding%20ceremony%20of%20J.%20Rajesh%20and%20V.%20Kavitha&location=Arulmigu%20Balamurugan%20Temple"
                  target="_blank"
                  rel="noreferrer"
                >
                  Add to Calendar
                </a>
              ) : null}
            </div>
            <div className="map-embed">
              <iframe
                src={event.mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${event.title} map`}
              ></iframe>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
