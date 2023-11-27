import P5, { Vector } from 'p5';

import Atlas from './Drawable/Atlas';
import Obstacle from './Drawable/Obstacles/Obstacle';
import Rocket from './Drawable/Rocket';
import Target from './Drawable/Target';

type JourneyType = {
  distance: number;
  closest: number;
  reached: number;
};
export default class Rocketeer {
  private readonly atlas: Atlas;
  private readonly rocket: Rocket;

  private readonly variation: number;

  private readonly journey: JourneyType = {
    distance: 0,
    closest: Infinity,
    reached: 0,
  };
  private readonly logbook: Map<number, JourneyType> = new Map<
    number,
    JourneyType
  >();
  private closest: number | undefined = undefined;
  private visits = 0;
  private crashed = 0;
  private fitness = 0;

  constructor(atlas: Atlas, rocket: Rocket, variation: number) {
    this.atlas = atlas;
    this.rocket = rocket;
    this.variation = variation;
  }

  normalizeFitness(maxfit: number): void {
    this.fitness /= maxfit;
  }

  calcFitness(p5: P5, lifespan: number): number {
    this.fitness = 0;
    this.atlas.getTargets().forEach((target: Target, index: number) => {
      const journey: JourneyType = this.logbook.get(index) || {
        ...this.journey,
      };
      if (journey.closest === Infinity) return;

      if (journey.reached > 0) {
        this.fitness += p5.width;
        this.fitness += p5.map(journey.reached, 0, lifespan, lifespan, 0);
      }
    });

    const closest = this.closest === undefined ? -1 : this.closest;
    const journey = this.logbook.get(closest) || {
      ...this.journey,
    };

    if (this.visits === this.atlas.getTargets().length) {
      this.fitness **= 2;
    } else if (journey.distance > 0) {
      this.fitness += p5.map(journey.distance, 0, lifespan, lifespan, 0);
    }

    this.fitness *= Math.max(1, 10 ** this.visits);

    if (this.crashed > 0 && this.visits !== this.atlas.getTargets().length) {
      this.fitness /= Math.max(10, 10 ** this.visits);
    }

    return this.fitness;
  }

  update(step: number, pos: Vector): void {
    if (this.crashed > 0) {
      this.rocket.crash();
      return;
    }

    this.rocket.update(pos);

    this.atlas.getObstacles().forEach((obstacle: Obstacle) => {
      if (this.rocket.hasCrashedInto(obstacle)) {
        this.crashed = step;
      }
    });

    if (this.crashed > 0 || this.rocket.isOffScreen()) {
      this.crashed = step;
      return;
    }

    this.rocket.draw(this.variation === 0);
  }

  getInputs(step: number): number[] {
    this.atlas.getTargets().forEach((target: Target, index: number) => {
      if (this.closest === undefined) {
        this.closest = index;
      }
      const journey: JourneyType = this.logbook.get(index) || {
        ...this.journey,
      };
      if (journey.reached > 0) return;

      const distance = this.rocket.distanceTo(
        target.getPosition(),
        target.getDiameter()
      );
      const closest = Math.min(distance, journey.closest);
      if (index === this.closest && distance <= target.getDiameter()) {
        journey.reached = step;
        this.closest = undefined;
        this.visits += 1;
      }
      this.logbook.set(index, {
        ...journey,
        distance,
        closest,
      });
    });

    return [
      this.rocket.getPosition().x,
      this.rocket.getPosition().y,
      this.logbook.get(this.closest || 0)?.distance || 0,
      this.visits,
    ];
  }

  getFitness(): number {
    return this.fitness;
  }

  getVisits(): number {
    return this.visits;
  }

  getRocketPosition(): Vector {
    return this.rocket.getPosition();
  }

  getRocketTravelled(): number {
    return this.rocket.getTravelled();
  }

  getVariation(): number {
    return this.variation;
  }
}
