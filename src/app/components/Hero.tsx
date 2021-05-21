import React from 'react';
import styles from './Hero.module.css';

type HeroProps = {
  title: string;
  imgSrc: string;
  subtitle: string;
};

function Hero({ title, subtitle, imgSrc }: HeroProps): JSX.Element {
  return (
    <header className={styles.hero}>
      <img src={imgSrc} alt="" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
}

export default Hero;
