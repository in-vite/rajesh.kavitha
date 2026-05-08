import React from "react";

export default function FamilySection() {
  return (
    <section className="section family-section track-section" data-step="03" id="family">
      <div className="section-heading reveal">
        <p className="eyebrow">With Blessings Of Family</p>
        <h3>Rooted in love, guided by elders</h3>
      </div>
      <div className="family-layout">
        <article className="family-card reveal">
          <div className="family-ornament"></div>
          <p className="panel-label">Groom Family</p>
          <p>Mr. Jaganathan</p>
          <p>Mrs. Deivanayagi (Late)</p>
          <p className="place-name">Mathur</p>
        </article>
        <article className="family-card reveal">
          <div className="family-ornament"></div>
          <p className="panel-label">Bride Family</p>
          <p>Mr. K. Venkatesan</p>
          <p>Mrs. V. Prema</p>
          <p className="place-name">Ambattur</p>
        </article>
      </div>
    </section>
  );
}
