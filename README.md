# Rocketeers :rocket::man_astronaut::woman_astronaut:

![saifbechan.github.io ci](https://github.com/saifbechan/saifbechan.github.io/workflows/saifbechan.github.io%20ci/badge.svg)

## What do the rocketeers do?

The rocketeers use a genetic learning algorithm do explore a map of targets and obstacles. The main purpose of the Rocketeer is to explore as many planets without getting hit.

## How does the genetic learning algorithm work?

First we start a mission with a set of rocketeers. All rocketeers have the same lifespan, the time they stay alive. Each Rocketeer gets assigned a set of random instructions and a spaceship. The Rocketeer has to do exactly what the instructions tell them. At the end of the run we evaluate the mission and see which Rocketeers did the best. Based on this group of successful Rocketeers we start a new group.

## What technologies are used?

- This is a super simple learning algorithm build in Typescript/Javascript.
- The animations and drawing are done with p5js.
- The site itself uses React.
- Server side rendering is done with Next.js.

---

#### Inspiration & Credits

Inspiration for this idea came from an episode of The Coding Train [@CodingTrain](https://github.com/CodingTrain). Thanks [@shiffman](https://github.com/shiffman) for this great content.
