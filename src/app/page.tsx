'use client';

import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function Home() {
  const collectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const collection = collectionRef.current;
    if (collection === null) return;

    const cards = collection.querySelectorAll('div');

    const intervals = Array.from(cards).map((card, i, arr) => {
      let animateCount = 0;
      gsap.set(card, {
        x: -16 * i,
        y: 16 * i,
      });

      const interval = setInterval(() => {
        // 下に着いたら
        gsap.set(card, {
          zIndex: (animateCount + i) % arr.length,
        });

        if (animateCount % arr.length === arr.length - i - 1) {
          gsap
            .timeline()
            .to(card, {
              x: '-=16',
              y: '+=16',
              duration: 1,
              autoAlpha: 0,
            })
            .set(card, {
              x: 0,
              y: 0,
            });
        } else {
          gsap.to(card, {
            x: '-=16',
            y: '+=16',
            duration: 1,
            autoAlpha: 1,
          });
        }

        animateCount++;
      }, 2000);

      return interval;
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles['flash-card-collection']} ref={collectionRef}>
        <div className={styles['flash-card-item']}>
          <Image
            src="https://picsum.photos/id/237/300/200"
            alt=""
            width="300"
            height="200"
          />
        </div>
        <div className={styles['flash-card-item']}>
          <Image
            src="https://picsum.photos/id/236/300/200"
            alt=""
            width="300"
            height="200"
          />
        </div>
        <div className={styles['flash-card-item']}>
          <Image
            src="https://picsum.photos/id/235/300/200"
            alt=""
            width="300"
            height="200"
          />
        </div>
        <div className={styles['flash-card-item']}>
          <Image
            src="https://picsum.photos/id/234/300/200"
            alt=""
            width="300"
            height="200"
          />
        </div>
        <div className={styles['flash-card-item']}>
          <Image
            src="https://picsum.photos/id/233/300/200"
            alt=""
            width="300"
            height="200"
          />
        </div>
        <div className={styles['flash-card-item']}>
          <Image
            src="https://picsum.photos/id/232/300/200"
            alt=""
            width="300"
            height="200"
          />
        </div>
        <div className={styles['flash-card-item']}>
          <Image
            src="https://picsum.photos/id/231/300/200"
            alt=""
            width="300"
            height="200"
          />
        </div>
      </div>
    </div>
  );
}
