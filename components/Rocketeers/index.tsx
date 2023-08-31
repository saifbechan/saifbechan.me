'use client';

import { useEffect, useRef } from 'react';

import P5, { Image } from 'p5';

import { Explosion, Obstacles, Planets, Ships } from './Helpers/Config';
import Atlas from './Entities/Drawable/Atlas';
import Mission from './Entities/Mission';

const Rocketeers = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputEl: any = useRef(null);

  useEffect(() => {
    const rocketeers = 100;
    let steps = 600;
    let generation = 1;
    let step = 0;

    let mission: Mission;

    const images: Map<string, Image> = new Map<string, Image>();

    if (inputEl.current !== null) {
      inputEl.current.remove();
      inputEl.current = null;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const p5 = require('p5');
    inputEl.current = new p5((p: P5) => {
      p.preload = (): void => {
        if (process.env.NODE_ENV === 'test') return;

        Object.values(Ships).forEach((ship: string) => {
          images.set(ship, p.loadImage(`images/${ship}.png`));
        });

        Object.values(Planets).forEach((planet: string) => {
          images.set(planet, p.loadImage(`images/${planet}.png`));
        });

        Object.values(Obstacles).forEach((layout: string) => {
          images.set(layout, p.loadImage(`images/${layout}.png`));
        });

        images.set(
          Explosion.SPRITE,
          p.loadImage(`images/${Explosion.SPRITE}.png`)
        );
      };

      p.setup = (): void => {
        const canvas = p.createCanvas(p.windowWidth - 4, p.windowHeight - 4);
        canvas.attribute('role', 'rocketeers');

        mission = new Mission(
          p,
          images,
          new Atlas(
            p,
            images,
            p.createGraphics(p.windowWidth - 4, p.windowHeight - 4)
          )
        );
        mission.init(generation, steps, rocketeers);
      };

      p.draw = (): void => {
        p.background(20, 21, 38);
        mission.run(step);
        step += 1;
        if (step === steps) {
          mission.evaluate(steps);

          step = 0;
          generation += 1;
          if (generation >= 80) {
            steps = 1600;
          } else if (generation >= 40) {
            steps = 1400;
          } else if (generation >= 20) {
            steps = 1000;
          } else if (generation >= 5) {
            steps = 800;
          }

          mission.init(generation, steps, rocketeers);
        }
      };

      p.windowResized = (): void => {
        window.location.reload();
      };
    });
  }, []);

  return null;
};

export default Rocketeers;
