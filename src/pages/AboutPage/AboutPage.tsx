import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <h2 className="about-title">Pokemon Seacrh</h2>
      <p className="about-author">Author: Artsiom Luksha</p>
      <a
        className="about-link"
        href="https://rs.school/"
        target="_blank"
        rel="noopener noreferrer"
      >
        RS School React Course
      </a>
    </div>
  );
};

export default AboutPage;