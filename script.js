var templatePuzzle = buildPuzzle();

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

console.log(testPuzzle);

$(document).ready(function(){

	showPuzzle(templatePuzzle);
	clickToSolve(testPuzzle);
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
function showPuzzle(puzzle) {
	// Append rows to table(id=puzzle)
	for(var x = 0; x < (puzzle.length); x++) {
		jQuery("<tr/>", {
			id: x,
		}).appendTo("#puzzle");
	}

	// Append td to each row
	for(var y = 0; y < (puzzle.length); y++) {
		jQuery("<td/>", {
		class: "box",
		id: y,	
		}).appendTo("tr");
	}
};

function clickToSolve(puzzle) {
	$("#solve").click(function() {
		var solvedPuzzle = solvePuzzle(puzzle);
		console.log(solvedPuzzle);
	})
};

// Recursively solve the sudoku puzzle using a backtracking method
function solvePuzzle(puzzle) {
	var coord = findEmpty(puzzle);

	if(coord == false){
		console.log("Sudoku Solved!")
		console.log(puzzle)
		return
	}
	
	x = coord[0];
	y = coord[1];

	console.log(x)
	console.log(y)

	copyPuzzle = puzzle;

	for(var i = 1; i < 10; i++){
		if(i==10){return false}

		copyPuzzle[x][y] = i;
		if((checkRow(copyPuzzle,x,y,i)==false) || (checkColumn(copyPuzzle,x,y,i)==false) || (check3x3(copyPuzzle,x,y,i)==false)) {
			continue
		} else if((checkRow(copyPuzzle,x,y,i)==true) && (checkColumn(copyPuzzle,x,y,i)==true) && (check3x3(copyPuzzle,x,y,i)==true)) {
			solvePuzzle(copyPuzzle);
			continue
		} 
	}


	console.log(puzzle)
};
 
function findEmpty(puzzle){
	for(var x = 0; x < (puzzle.length); x++) {
		for(var y = 0; y < (puzzle.length); y++) {
			if (puzzle[x][y] == 0) {
				return[x, y]
			}
		}
	}
	return false
};

/*
function assignValue(puzzle,x,y){
	for(var i = 1; i < 10; i++){
		puzzle[x][y] = i;
		if((checkRow(puzzle,x,y,i)==false) || (checkColumn(puzzle,x,y,i)==false) || (check3x3(puzzle,x,y,i)==false)) {
			continue;
		} else if((checkRow(puzzle,x,y,i)==true) && (checkColumn(puzzle,x,y,i)==true) && (check3x3(puzzle,x,y,i)==true)) {
			solvePuzzle(puzzle);
			continue;
		} else {return false}
	}
};
*/

function checkRow(puzzle,x,y,i){
	for(var j = 0; j < 9; j++){
		if(j==y){
			continue
		} else if(puzzle[x][j] == i){
			return false;
		}
	}
	return true;

};

function checkColumn(puzzle,x,y,i){
	for(var k = 0; k < 9; k++){
		if(k==x){
			continue
		} else if(puzzle[k][y] == i){
			return false
		}
	}
	return true
};

function check3x3(puzzle,x,y,i){
	if ((x<3) && (y<3)){
		xx = 3;
		yy = 3;
	} else if ((x<3) && (y<6)){ //Grid2
		xx = 3;
		yy = 6;
	} else if ((x<3) && (y<9)){ //Grid3
		xx = 3;
		yy = 9;
	} else if ((x<6) && (y<3)){ //Grid4
		xx = 6;
		yy = 3;
	} else if ((x<6) && (y<6)){ //Grid5
		xx = 6;
		yy = 6;
	} else if ((x<6) && (y<9)){ //Grid6
		xx = 6;
		yy = 9;
	} else if ((x<9) && (y<3)){ //Grid7
		xx = 9;
		yy = 3;
	} else if ((x<9) && (y<6)){ //Grid8
		xx = 9;
		yy = 6;
	} else if ((x<9) && (y<9)){ //Grid9
		xx = 9;
		yy = 9;
	}	

	for (var j = (xx-3); j < xx; j++) {
		for (var k = (yy-3); k < yy; k++) {
			if((x==j)&&(y==k)) {
				continue
			} else if(puzzle[j][k] == i) {
				return false
			}
		}
	}
	return true 
};


