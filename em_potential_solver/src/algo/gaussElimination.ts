import type { Matrix, Vector } from "./types";

export class GaussElimination {

  private static precisionRounder(val: number, precision: number): number {
  
    const factor = Math.pow(10, precision);
    return Math.round((val + Number.EPSILON) * factor) / factor;
  }

  // Solves K*w = F, returns w
  public static solve(stiffnessMatrix: Matrix, forcesVector: Vector): Vector {

    const n = stiffnessMatrix.length;

    // Values in [-ZERO_MARGIN; +ZERO_MARGIN] are treated as zeros 
    // (essential in handling singular matrices)
    const ZERO_MARGIN = 1e-10;

    // Deep-copying input not to override the original data
    // ('...' generally does a shallow-copy, but with a primitive it works as a deep-copy)
    const K: Matrix = stiffnessMatrix.map(row => [...row]);
    const F: Vector = [...forcesVector];

    // Stage no. 1: upper triangular matrix
    for (let col = 0; col < n; col++) {

      // Find the pivot for this column, begin on the main diagonal
      let maxRow = col;
      for (let row = col + 1; row < n; row++) {
        maxRow = Math.abs(K[row][col]) > Math.abs(K[maxRow][col]) ? row : maxRow;
      }

      // Swap rows of K and F if the pivot is different from the initial one
      if (maxRow !== col) {

        // Swapping entire rows at once using array destructuring
        [K[col], K[maxRow]] = [K[maxRow], K[col]];
        [F[col], F[maxRow]] = [F[maxRow], F[col]];
      }

      // If the new pivot (now on the diagonal, after the swap) is 0,
      // then the matrix is singular and the system of equations is
      // either undetermined or inconsistent
      if (Math.abs(K[col][col]) < ZERO_MARGIN) {
        throw new Error("The system of equations is not determined");
      }

      // Zero all the elements below the diagonal
      for (let row = col + 1; row < n; row++) {

        const factor = K[row][col] / K[col][col];

        // Subtract one row from another, but take into consideration that
        // colums smaller than 'col' are already zeroed and are not affected
        for (let i = col; i < n; i++) {
          K[row][i] -= factor * K[col][i];
        }
        F[row] -= factor * F[col];
      }
    }

    // Stage no. 2: retrieve the solutions vector
    const w: Vector = new Array(n).fill(0);

    for (let row = n - 1; row >= 0; row--) {

      // Calculate the remaining value on the left side of the equation 
      // besides the w_i we want to compute
      let sum = 0;
      for (let col = row + 1; col < n; col++) {
        sum += K[row][col] * w[col];
      }

      // Calculate the w_i
      w[row] = this.precisionRounder((F[row] - sum) / K[row][row], 2);
    }

    return w;
  }
}
