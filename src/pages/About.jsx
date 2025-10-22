import React from "react";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <img
              src="https://thewanderingafro.com/wp-content/uploads/2025/02/1738711778297_filtered-scaled.jpeg"
              alt="About Ganda Coffee"
            />
          </div>
          <div className="about-text">
            <h2 className="section-title">Our Story</h2>
            <p>
              At <strong>Ganda Coffee</strong>, we believe that every cup tells a story. We
              started with a simple passion: to bring the rich, aromatic flavors of
              locally-sourced coffee to our community.
            </p>
            <p>
              We meticulously select beans from the finest local farms, ensuring each
              brew supports local communities and delivers an unforgettable taste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
