var puzzleTemplate = buildPuzzle();

// From dailysudoku.com/sudoku/play.shtml on March 17, 2017
var testPuzzle = [[4,0,8,0,0,0,0,6,7],
				  [0,2,0,0,0,8,0,0,0],
				  [0,0,0,7,5,0,0,0,0],
				  [8,0,5,0,7,4,0,2,0],
				  [2,0,0,0,0,0,0,0,5],
				  [0,4,0,5,6,0,3,0,8],
				  [0,0,0,0,1,9,0,0,0],
				  [0,0,0,8,0,0,0,9,0],
				  [5,6,0,0,0,0,1,0,3]];


$(document).ready(function(){

	showPuzzle(puzzleTemplate);
	console.log(testPuzzle);

})

// Creates an array(rows) of arrays (column values) representing a sudoku puzzle

function buildPuzzle() {
	var puzzle = [];
	var i = 1;
	for(var y=0; y<9; y++) {
		puzzle[y] = [];
		for(var x=0; x<9; x++) {
			puzzle[y][x] = 0;
		}
	}
	return puzzle;
};

// Creates HTML array with row id mapped to row and td id mapped to column

function showPuzzle(puzzleTemplate) {
	// Append rows to table(id=puzzle)
	for(var x = 0; x < (puzzleTemplate.length); x++) {
		jQuery("<tr/>", {
			id: x,
		}).appendTo("#puzzle");
	}

	// Append td to each row
	for(var y = 0; y < (puzzleTemplate.length); y++) {
		jQuery("<td/>", {
		class: "box",
		id: y,	
		}).appendTo("tr");
	}
};

function solvePuzzle(puzzle) {

};