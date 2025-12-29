import type { GaussPoint } from './types';

// Numerical integration implementation using Gauss-Legendre quadrature
export class FemIntegration {

  // Gauss-Legendre quadrature config
  // Source: https://en.wikipedia.org/wiki/Gaussian_quadrature
  private static gaussPoints: GaussPoint[] = [
    { xi: -1 / Math.sqrt(3), weight: 1.0 },
    { xi: 1 / Math.sqrt(3), weight: 1.0 }
  ];

  /* 
    Additional functions necessary in computing integrals in this exercise:
    1. Function rho(x), epsilon_r(x) are defined in exercise's content
    2. Shape functions are hat functions defined in the 'theory' page
  */

  private static shapeFunction(xi: number, k: number): number {
    
    if (xi < -1 || 1 < xi) {
      throw new Error(`A basis function is defined over [-1, 1]`);
    }

    switch (k) {
      case 0:
        return (1 - xi) / 2;
      case 1:
        return (1 + xi) / 2;
      default:
        throw new Error(`${k} is not a valid node index`);
    }
  }

  private static shapeFunctionDeriv(xi: number, k: number): number {
    
    if (xi < -1 || 1 < xi) {
      throw new Error(`A basis function derivative is defined over [-1, 1]`);
    }

    switch (k) {
      case 0:
        return -0.5;
      case 1:
        return 0.5;
      default:
        throw new Error(`${k} is not a valid node index`);
    }
  }

  private static epsilon_r(x: number): number {

    if (0 <= x && x <= 1) {
      return 10;
    } else if (1 < x && x <= 2) {
      return 5;
    } else if (2 < x && x <= 3) {
      return 1;
    }

    throw new Error(`epsilon_r(x) is defined over [0,3], it's undefined for ${x}`);
}

  private static rho(x: number): number {

    if (0 <= x && x <= 3) {
      return 1;
    }

    throw new Error(`rho(x) is defined over [0,3], it's undefined for ${x}`);
  }

  /*
    Numerical integration of the local stiffness matrix and the load vector.
    h: length of the element
    p, q: local nodes (can be either 0 or 1)
  */

  public static integrateStiffness(h: number, p: number, q: number): number {

    let sum = 0.0;

    for (const point of this.gaussPoints) {

      // Compute values of de_1(xi)/dxi, de_2(xi)/dxi
      const de_p = this.shapeFunctionDeriv(point.xi, p);
      const de_q = this.shapeFunctionDeriv(point.xi, q);
    
      sum += point.weight * (2.0 / h) * de_p * de_q;
    }

    return sum;
  }

  public static integrateLoad(xStart: number, h: number, p: number) {

    let sum = 0.0;

    for (const point of this.gaussPoints) {

      // Find global x (pre-transform) to recover epsilon_r(x) in this Gauss-point
      const xGlobal = xStart + (h / 2.0) * (1.0 + point.xi);

      const e_p = this.shapeFunction(point.xi, p);
      const eps = this.epsilon_r(xGlobal);
      const rh = this.rho(xGlobal);

      sum += point.weight * (h / 2.0) * (rh / eps) * e_p;
    }

    return sum;
  }
}
