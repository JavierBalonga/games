import { GameContext, GameElement } from "../../../abstract/game-engine";

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  update: (particle: Particle) => void;
}

export default class ParticleEmitter extends GameElement {
  particles: Record<string, Particle>;
  constructor() {
    super();
    this.particles = {};
  }

  update(context: GameContext): void {
    Object.values(this.particles).forEach((particle) => {
      particle.update(particle);
      context.renderer.beginPath();
      context.renderer.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        2 * Math.PI,
        false
      );
      context.renderer.fillStyle = particle.color;
      context.renderer.fill();
    });
  }

  emit(particles: Particle[], duration: number = 1000): void {
    const particleIds = particles.map((particle) => {
      const id: string = Math.random().toString(36).substring(2, 9);
      this.particles[id] = particle;
      return id;
    });
    setTimeout(() => {
      particleIds.forEach((id) => {
        delete this.particles[id];
      });
    }, duration);
  }
}
