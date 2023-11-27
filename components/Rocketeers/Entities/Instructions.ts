import * as tf from '@tensorflow/tfjs';
import { Evolution } from '../Helpers/Config';
import {
  Sequential,
  Tensor,
  layers,
  randomNormal,
  sequential,
  tensor2d,
  tidy,
} from '@tensorflow/tfjs';

class Instructions {
  private readonly variant: number;
  private readonly network: Sequential;

  constructor(variant: number, weights?: Tensor[]) {
    this.variant = variant;
    this.network = sequential({
      layers: [
        layers.dense({
          units: 32,
          inputShape: [4],
          activation: 'sigmoid',
        }),
        layers.dense({
          units: 2,
          activation: 'tanh',
        }),
      ],
    });

    if (weights) {
      this.network.setWeights(weights);
    }
  }

  mutate(): void {
    tidy(() => {
      const mutatedWeights = this.network.getWeights().map((tensor) => {
        const shape = tensor.shape;
        const values = tensor.dataSync().slice();

        for (let i = 0; i < values.length; i++) {
          if (Math.random() < Evolution.MUTATION_RATE) {
            values[i] +=
              randomNormal([1]).dataSync()[0] * Evolution.MUTATION_RATE;
          }
        }
        return tf.tensor(values, shape);
      });
      this.network.setWeights(mutatedWeights);
    });
  }

  getPredictions(inputs: number[][]): number[][] {
    return tidy(() => {
      const xs = tensor2d(inputs);
      const ys = <Tensor>this.network.predict(xs);
      const outputData = ys.dataSync();
      const reshapedOutput: number[][] = [];
      for (let i = 0; i < outputData.length; i += 2) {
        reshapedOutput.push([outputData[i], outputData[i + 1]]);
      }
      return reshapedOutput;
    });
  }

  getVariation(): number {
    return this.variant;
  }

  getWeights(): Tensor[] {
    return this.network.getWeights().slice();
  }

  dispose(): void {
    this.network.dispose();
  }
}

export default Instructions;
