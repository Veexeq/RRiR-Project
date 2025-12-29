import { FemIntegration } from "./FemIntegration";
import { GaussElimination } from "./GaussElimination";
import type { Matrix, Vector, ChartData } from "./types";

// Solves the differential equation for electromagnetic potential using
// FEM with n finite elements
export class Solver {

  // Returns data for any chart-drawing software (an array of {x, y} objects)
  public static solve(n: number): ChartData {

    const domain = [0.0, 3.0];
    const h = (domain[1] - domain[0]) / n;
    const nodeCount = n + 1;

    // Initialize K and F with zeroes
    const K: Matrix = Array.from({ length: nodeCount }, () => Array(nodeCount).fill(0));
    const F: Vector = new Array(nodeCount).fill(0);

    // Loop throughout all finite elements
    for (let i = 0; i < n; i++) {

      // This element's data
      const leftNodeIdx = i;
      const rightNodeIdx = i + 1;
      const xStart = i * h;

      // Constructing local 2x2 matrix and 2x1 vector for this element
      // We can establish where to put results from local elements integration
      // in global matrix and vector via globalRow and globalCol
      for (let p = 0; p < 2; p++) {

        const globalRow = p === 0 ? leftNodeIdx : rightNodeIdx;

        F[globalRow] += FemIntegration.integrateLoad(xStart, h, p);

        for (let q = 0; q < 2; q++) {

          const globalCol = q === 0 ? leftNodeIdx : rightNodeIdx;

          K[globalRow][globalCol] += FemIntegration.integrateStiffness(h, p, q);
        }
      }
    }

    // Now, after we've finished agregating the matrix equation from local elements,
    // we can take boudary conditions into consideration (as explained in 'theory' page)
    
    // 1. Robin condition
    K[0][0] += -1.0;
    F[0] += -5.0;

    // 2. Dirichlet condition
    for (let i = 0; i < nodeCount - 1; i++) {
      K[n][i] = 0.0;
    }

    K[n][n] = 1.0;
    F[n] = 2.0;

    // Solve the system of equations
    const phi: Vector = GaussElimination.solve(K, F);
    return this.constructData(phi, nodeCount, h);
  }

  private static constructData(phi: Vector, nodeCount: number, h: number): ChartData {

    const data: ChartData = [];
    for (let node = 0; node < nodeCount; node++) {
      
      const x = node * h;
      const val = phi[node];

      data.push({ x: x, val: val });
    }

    return data;
  }
}
