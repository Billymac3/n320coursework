var app = new Vue({
  el: "#app",
  data: {
    gameOver: false,
    playerTurn: 1,
    grid: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 3, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0]
    ]
  },
  methods: {
    selectCell: function(row, col) {

        // get the row to place the puck at
        var moveRow = this.lowestMove(col);
        if(moveRow > 0) {
      // copy grid to a temporary var
      var tempGrid = this.grid.slice(0);

      // modify the cloned version
      tempGrid[row][col] = this.playerTurn;

      // replace
      this.grid = tempGrid;

      //   swap player turn
      this.playerTurn = this.playerTurn == 1 ? 2 : 1;

      this.checkWin();
    },
    checkWin: function() {
      // loop through all columns to check
      // if win found, set over to be true
    },
    lowestMove: function(col) {
      for (var row = 6; row >= 0; row--) {
        if (this.grid[row][col] == 0) {
          // if it is free, return the row index
          return row;
        }
      }
    }
  }
});
