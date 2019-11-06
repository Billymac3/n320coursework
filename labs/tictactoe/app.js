var app = new Vue({
  el: "#app",
  data: {
    gameOver: false,
    // playerTurnIndicator: true,
    playerTurn: "X",
    grid: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
  },
  methods: {
    selectCell: function(row, col) {
      //an if to make sure you don't use a space twice
      if (this.grid[row][col] == 0 && this.gameOver == false) {
        //copy grid to a temporary variable
        var tempGrid = this.grid.slice(0);

        //modify the copied grid
        tempGrid[row][col] = this.playerTurn;

        //replaces the grid with the copied version of the tempgrid
        //so it updates and becomes the current grid
        this.grid = tempGrid;

        //swap player turn
        //cool syntax to use instead of if statements, thanks Travis!
        this.playerTurn = this.playerTurn == "X" ? "O" : "X";

        //check for win
        this.checkWin();
      }
    },
    checkWin: function() {
      //loop through all cols to check
      //if win found, set gameOver to true to announce there was a winner
      for (var row = 0; row < this.grid.length; row++) {
        for (var i = 0; i < this.grid[row].length; i++) {
          //   checks for a match left or right
          if (row - 2 >= 0) {
            if (
              this.grid[row - 2][i] == this.grid[row - 1][i] &&
              this.grid[row - 1][i] == this.grid[row][i] &&
              this.grid[row][i] == this.grid[row - 2][i] &&
              (this.grid[row][i] == "X" || this.grid[row][i] == "O")
            ) {
              this.gameOver = true;
              this.winningplayer = this.playerTurn;

              break;
            }
          }
          //    looks for matches up and down
          if (i - 2 >= 0) {
            if (
              this.grid[row][i - 2] == this.grid[row][i - 1] &&
              this.grid[row][i - 1] == this.grid[row][i] &&
              this.grid[row][i] == this.grid[row][i - 2] &&
              (this.grid[row][i] == "X" || this.grid[row][i] == "O")
            ) {
              this.gameOver = true;
              this.winningplayer = this.playerTurn;
              break;
            }
          }
          //   checks for a diagonal match from top left to bottom right
          if (row - 2 >= 0 && i - 2 >= 0) {
            if (
              this.grid[row - 2][i - 2] == this.grid[row - 1][i - 1] &&
              this.grid[row][i] == this.grid[row][i] &&
              this.grid[row][i] == this.grid[row - 2][i - 2] &&
              (this.grid[row][i] == "X" || this.grid[row][i] == "O")
            ) {
              this.gameOver = true;
              this.winningplayer = this.playerTurn;

              break;
            }
          }
          //   checks for a diagonal match from top right to bottom left
          if (row - 2 >= 0 && i + 3 <= this.grid[row].length) {
            if (
              this.grid[row - 2][i + 2] == this.grid[row - 1][i + 1] &&
              this.grid[row][i] == this.grid[row][i] &&
              this.grid[row][i] == this.grid[row - 2][i + 2] &&
              (this.grid[row][i] == "X" || this.grid[row][i] == "O")
            ) {
              this.gameOver = true;
              this.winningplayer = this.playerTurn;
              break;
            }
          }
        }
      }
    }
  }
});
