import P5, { Image, Vector } from 'p5';

import { MissionStatistics } from '../Types/Statistics.type';
import { getRandomElement } from '@/lib/utils';
import { memory, tidy } from '@tensorflow/tfjs';
import Atlas from './Drawable/Atlas';
import Instructions from './Instructions';
import Rocket from './Drawable/Rocket';
import Rocketeer from './Rocketeer';

export default class Mission {
  private readonly p5: P5;
  private readonly images: Map<string, Image>;

  private readonly atlas: Atlas;
  private readonly rocketeers: Rocketeer[] = [];

  private instructions: Instructions[] = [];
  private winningInstructions: Instructions[] = [];

  private statistics: MissionStatistics;

  private trails: Vector[] = [];

  constructor(p5: P5, images: Map<string, Image>, atlas: Atlas) {
    this.p5 = p5;
    this.images = images;
    this.atlas = atlas;
    this.statistics = {
      generation: 0,
      fitness: 0,
      reached: 0,
      maxtravel: 0,
      lifespan: 0,
      tensors: 0,
    };
  }

  create(
    generation: number,
    lifespan: number,
    rocketeers: number,
    variations: number
  ): void {
    this.statistics = {
      ...this.statistics,
      generation,
      lifespan,
    };

    let count = 0;

    for (let variation = 0; variation < variations; variation += 1) {
      if (!this.instructions[variation]) {
        this.instructions[variation] = new Instructions(variation);
      }

      for (let rocketeer = 0; rocketeer < rocketeers; rocketeer += 1) {
        this.rocketeers[count] = new Rocketeer(
          this.atlas,
          new Rocket(this.p5, this.images),
          variation
        );

        count += 1;
      }
    }
  }

  evaluate(lifespan: number): void {
    let maxfit = 0;
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      maxfit = Math.max(rocketeer.calcFitness(this.p5, lifespan), maxfit);
    });

    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      rocketeer.normalizeFitness(maxfit);
    });
  }

  selection(variations: number): void {
    const variationFitness: { variation: number; fitness: number }[] = [];
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      if (!variationFitness[rocketeer.getVariation()]) {
        variationFitness[rocketeer.getVariation()] = {
          variation: rocketeer.getVariation(),
          fitness: 0,
        };
      }
      variationFitness[rocketeer.getVariation()].fitness +=
        rocketeer.getFitness();
    });

    this.winningInstructions = variationFitness
      .sort((a, b) => b.fitness - a.fitness)
      .slice(0, variations / 2)
      .map(
        ({ variation }, index: number) =>
          new Instructions(index, this.instructions[variation].getWeights())
      );

    this.instructions.map((instruction: Instructions) => instruction.dispose());

    this.statistics = {
      ...this.statistics,
      fitness: Math.floor(
        variationFitness.sort((a, b) => b.fitness - a.fitness)[0].fitness
      ),
      tensors: memory().numTensors,
    };

    console.log(this.statistics);
  }

  reproduction(variations: number): void {
    tidy(() => {
      this.instructions[0] = new Instructions(
        0,
        this.winningInstructions[0].getWeights()
      );

      for (let variation = 1; variation < variations; variation += 1) {
        const weightsA = getRandomElement(
          this.winningInstructions
        ).getWeights();
        const weightsB = getRandomElement(
          this.winningInstructions
        ).getWeights();

        this.instructions[variation] = new Instructions(
          variation,
          weightsA.map((tensor, index) => tensor.add(weightsB[index]).div(2))
        );

        this.instructions[variation].mutate();
      }

      this.winningInstructions.forEach((instruction: Instructions) =>
        instruction.dispose()
      );
    });
  }

  run(p5: P5, step: number): void {
    this.atlas.render(this.p5, this.statistics, this.trails);

    let reached = 0;
    let maxtravel = 0;

    const inputs: number[][][] = [];
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      if (!inputs[rocketeer.getVariation()]) {
        inputs[rocketeer.getVariation()] = [];
      }
      inputs[rocketeer.getVariation()].push(rocketeer.getInputs(step));
    });

    const predictions: number[][][] = [];
    this.instructions.forEach((instruction: Instructions) => {
      if (!predictions[instruction.getVariation()]) {
        predictions[instruction.getVariation()] = [];
      }
      predictions[instruction.getVariation()] = instruction.getPredictions(
        inputs[instruction.getVariation()]
      );
    });

    this.trails = [];
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      const prediction: number[] =
        predictions[rocketeer.getVariation()].shift() || [];

      rocketeer.update(step, p5.createVector(prediction[0], prediction[1]));

      this.trails.push(rocketeer.getRocketPosition());

      reached += rocketeer.getVisits();

      maxtravel = Math.floor(
        Math.max(maxtravel, rocketeer.getRocketTravelled())
      );
    });

    this.statistics = {
      ...this.statistics,
      reached,
      maxtravel,
    };
  }
}
