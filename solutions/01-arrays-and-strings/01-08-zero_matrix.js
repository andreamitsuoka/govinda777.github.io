function zero_matrix(matrix) {
  // Cracking the Coding Interview 1.8
  // Write an algorithm such that if an element in an MxN matrix is 0, 
  // its entire row and column are set to 0.

  let zero_rows = [];
  let zero_columns = [];

  // Find the row and column of every 0 in the original matrix
  for (let [r, row] of matrix.entries()) {
    for (let [c, value] of row.entries()) {
      if (value === 0) {
        zero_rows.push(r);
        zero_columns.push(c);
      }
    }
  }
  // Iterate through the matrix and replace the appropriate values with 0
  for (let [r, row] of matrix.entries()) {
    for (let [c, value] of row.entries()) {
      if (zero_rows.includes(r) || zero_columns.includes(c)) {
        matrix[r][c] = 0;
      }
    }
  }
}
