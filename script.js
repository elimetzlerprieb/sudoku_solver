$(document).ready(function(){

	var masterPuzzle = buildPuzzle();
	showPuzzle();


})

// Creates an array(rows) of arrays (column values) representing a sudoku puzzle

function buildPuzzle() {
	var arr = [];
	var i = 1;
	for(var y=0; y<9; y++) {
		arr[y] = [];
		for(var x=0; x<9; x++) {
			arr[y][x] = i;
			i++;
		}
	}
	
	console.log(arr);
};

// Uses the above array to construct html elements representing the puzzle

function showPuzzle() {

};