'use client';

import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './page.module.css';

const offset = 16;

export default function Home() {
  const collectionRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;

    const collection = collectionRef.current;
    if (collection === null) return;

    const cards = collection.querySelectorAll('div');

    cards.forEach((card, i) => {
      console.log('register', i);

      gsap.set(card, {
        x: -offset * i,
        y: offset * i,
      });

      const timeline = gsap.timeline({
        repeat: -1,
      });
      for (let j = 1; j <= cards.length; j++) {
        const position = i + j > cards.length ? i + j - cards.length : i + j;
        const nextPosition = {
          x: -offset * position,
          y: offset * position,
        };

        timeline.set(card, { zIndex: position });

        if (position === cards.length) {
          // 下についたとき

          timeline
            .to(card, {
              ...nextPosition,
              autoAlpha: 0,
              duration: 1,
              ease: 'power4.out',
            })
            .set(card, {
              x: 0,
              y: 0,
            });
        } else {
          // それ以外の時

          timeline.to(card, {
            ...nextPosition,
            autoAlpha: 1,
            duration: 1,
            ease: 'power4.out',
          });
        }

        timeline.to(card, { duration: 1 });
      }
    });
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
