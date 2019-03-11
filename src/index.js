module.exports = function solveSudoku(matrix) {
  // your solution

  return solveAll(checkArray(matrix));

  function solveAll(matrix) {
    arr1 = matrix.map(a => ([...a]));
    var error = false;
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr1.length; j++) {
        for (var k = 0; k < arr1[i][j].length; k++) {
          arr1[i][j] = arr1[i][j][k];
          error = false;
          arr1 = checkArray(arr1);
          if (wrongSet(arr1)) {
            arr1 = matrix.map(a => ([...a]));
            error = true;
            break;
          }
        }
      }
    }
    return arr1;
  };

  function simpleSolve(matrix) {
    var boolean = false;
    var arr = [];
    var mas = [];
    var arr1 = matrix.map(a => ([...a]));
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr1.length; j++) {
        if (arr1[i][j] == 0 || (typeof arr1[i][j] == typeof mas)) {
          var a = seachInBlock(matrix, i, j);
          var b = seachHorizontal(matrix, i);
          var c = seachVertical(matrix, j);
          arr = seachSameElementsTree(a, b, c);
          if (arr.length == 1) {
            arr1[i][j] = arr[0];
            boolean = true;
          } else {
            arr1[i][j] = arr;
          }
        }
      }
    }
    return [arr1, boolean];
  };

  function checkArray(arr1) {
    var boolean = false;
    var mas=[];
    arr1 = simpleSolve(arr1)[0];
    if (simpleSolve(arr1)[1] == true) {
      boolean = true;
    }
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr1.length; j++) {
        for (var k = 0; k < arr1[i][j].length; k++) {
          if (checkHorizontal(arr1, i, j, k) == true) {
            arr1[i][j] = arr1[i][j][k];
            boolean = true;
            arr1 = simpleSolve(arr1)[0];
            break;
          }
          if (checkVertical(arr1, i, j, k) == true) {
            arr1[i][j] = arr1[i][j][k];
            boolean = true;
            arr1 = simpleSolve(arr1)[0];
            break;
          }
          if (checkInBlock(arr1, i, j, k) == true) {
            arr1[i][j] = arr1[i][j][k];
            boolean = true;
            arr1 = simpleSolve(arr1)[0];
            break;
          } 
        }
      }
    }
    if (boolean == true) {
      return checkArray(arr1);
    } else {
      return arr1;
    }
  };

  function checkHorizontal(matrix, index, jIndex, kIndex) {
    for (var j = 0; j < matrix.length; j++) {
      for (var k = 0; k < matrix[index][j].length; k++) {
        if (jIndex!=j) { 
          if (matrix[index][jIndex][kIndex] == matrix[index][j][k]) {
            return false;
          }
        }
      }
    }
    for (var j = 0; j < matrix.length; j++) {
      if (matrix[index][jIndex][kIndex] == matrix[index][j]) {
        return false;
      }
    }
    return true;
  };

  function checkVertical(matrix, index, jIndex, kIndex) {
    for (var i = 0; i < matrix.length; i++) {
      for (var k = 0; k < matrix[i][jIndex].length; k++) {
        if (i!=index) { 
          if (matrix[index][jIndex][kIndex] == matrix[i][jIndex][k]) {
            return false;
          }
        }
      }
    }
  for (var i = 0; i < matrix.length; i++) {
    if (matrix[index][jIndex][kIndex] == matrix[i][jIndex]) {
      return false;
    }
  }
  return true;
  };

  function checkInBlock(matrix, index, jIndex, kIndex) {
    for (var i = Math.floor(index/3)*3; i < Math.floor(index/3)*3+3; i++) {
      for (var j = Math.floor(jIndex/3)*3; j < Math.floor(jIndex/3)*3+3; j++) {
        for (var k = 0; k < matrix[i][j].length; k++) {
          if (i!=index || j!=jIndex) { 
            if (matrix[index][jIndex][kIndex] == matrix[i][j][k]) {
              return false;
            }
          }
        }
      }
    }
    for (var i = Math.floor(index/3)*3; i < Math.floor(index/3)*3+3; i++) {
      for (var j = Math.floor(jIndex/3)*3; j < Math.floor(jIndex/3)*3+3; j++) {
        if (matrix[index][jIndex][kIndex] == matrix[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  function seachHorizontal(matrix, i) {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return seachDiffElements(arr, matrix[i]);
  };

  function seachVertical(matrix, j) {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var arrVertical = [];
    for (var i = 0; i < matrix.length; i++) {
      arrVertical.push(matrix[i][j]);
    }
    return seachDiffElements(arr, arrVertical);
  };

  function seachInBlock(matrix, k, l) {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var arr1 = [];
    for (var i = Math.floor(k/3)*3; i < Math.floor(k/3)*3+3; i++) {
      for (var j = Math.floor(l/3)*3; j < Math.floor(l/3)*3+3; j++) {
        arr1.push(matrix[i][j]);
      }
    }
    return seachDiffElements(arr, arr1);;
  };

  function wrongSet(matrix) {
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix.length; j++) {
        if (matrix[i][j] == 0) {
          return true;
        }
      }
    }
    return false;
  };

  function seachSameElementsTree(arr1, arr2, arr3) {
    var arr = [];
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        for (var k = 0; k < arr3.length; k++) {
          if (arr1[i] === arr2[j] && arr2[j]===arr3[k]) {
            arr.push(arr1[i]);
          }
        }
      }
    }
    return arr;
  };

  function seachDiffElements(arr1, arr2) {
    return arr1.filter(el => arr2.indexOf(el) == -1);
  }
}
