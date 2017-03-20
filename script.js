//puzzle = buildPuzzle()

// From dailysudoku.com/sudoku/play.shtml on March 17, 2017
/*puzzle = [[4,0,8,0,0,0,0,6,7],
		  [0,2,0,0,0,8,0,0,0],
		  [0,0,0,7,5,0,0,0,0],
		  [8,0,5,0,7,4,0,2,0],
		  [2,0,0,0,0,0,0,0,5],
		  [0,4,0,5,6,0,3,0,8],
		  [0,0,0,0,1,9,0,0,0],
		  [0,0,0,8,0,0,0,9,0],
		  [5,6,0,0,0,0,1,0,3]];

console.log(unsolvedPuzzle.join("\n"));
*/
$(document).ready(function(){
	showGrid('puzzle')
	showGrid('solution')

	clickToGetPuzzle()
	clickToSolve()
	clickToReset()
})



/*
function copyPuzzle(puzzle) {
	var newPuzzle = puzzle.map(function(arr) {
		return arr.slice();
	});
	return newPuzzle
}
*/


// Creates HTML array
function showGrid(name) {
	// Append rows to table
	for(var x = 0; x < 9; x++) {
		jQuery("<tr/>", {
			id: 'r'+x+name,
		}).appendTo("[id="+name+"]");

		// Append td to each row
		for(var y = 0; y < 9; y++) {
			jQuery("<td/>", {
			class: "box",
			id: 'c' + y + name,
			}).appendTo("tr[id=r"+x+name+"]");
		}
	}
};

// Updates HTML grid with new values
function updateGrid(name,puzzle) {
	for(var x = 0; x < (puzzle.length); x++) {
		for(var y = 0; y < (puzzle.length); y++) {
			$("tr[id=r"+x+name+"] > td[id=c"+y+name+"]").text(puzzle[x][y])
		}
	}
}; 

// Reads HTML grid and generates an array
function readGrid(name) {
	var puzzle = [];
	for(var x = 0; x < 9; x++) {
		puzzle[x] = [];
		for(var y = 0; y < 9; y++) {
			puzzle[x][y] = $("tr[id=r"+x+name+"] > td[id=c"+y+name+"]").text();
		}
	}
	console.log(puzzle)
	return puzzle
};


// Loads puzzle 
function clickToGetPuzzle() {
	$(document).on("click","#random",function(){
		testPuzzle = [[4,0,8,0,0,0,0,6,7],
				  [0,2,0,0,0,8,0,0,0],
				  [0,0,0,7,5,0,0,0,0],
				  [8,0,5,0,7,4,0,2,0],
				  [2,0,0,0,0,0,0,0,5],
				  [0,4,0,5,6,0,3,0,8],
				  [0,0,0,0,1,9,0,0,0],
				  [0,0,0,8,0,0,0,9,0],
				  [5,6,0,0,0,0,1,0,3]];
		updateGrid('puzzle',testPuzzle)
		updateGrid('solution',testPuzzle)
		console.log(testPuzzle.join("\n"))
	})
};

// On click: parses current HTML puzzle into an array and solves array before updating solution grid 
function clickToSolve() {
	$(document).on("click","#solve",function(){
		puzzle = readGrid('puzzle')
		var solvedPuzzle = solvePuzzle(puzzle)
		updateGrid('solution',solvedPuzzle)
	})
};

// On click: parses current HTML puzzle into an array and makes solution grid identical 
function clickToReset() {
	$(document).on("click","#reset",function(){
		puzzle = readGrid('puzzle')
		updateGrid('solution',puzzle);
	})
};

// Recursively solve the sudoku puzzle using a backtracking method
function solvePuzzle(puzzle,x=0,y=0) {
	// Check to see if the puzzle has been filled in
	var coord = findEmpty(puzzle);

	// Non-base case: puzzle is not solved (not filled)
	if(coord != false){
		x = coord[0];
		y = coord[1];
		for(var i = 1; i < 10; i++){
			if((checkRow(puzzle,x,y,i)==true) && (checkColumn(puzzle,x,y,i)==true) && (check3x3(puzzle,x,y,i)==true)) {
				puzzle[x][y] = i;
				if(solvePuzzle(puzzle)) {return puzzle}
				puzzle[x][y] = 0;				
			}
		}
		return false 
	} 
	// Base case: puzzle is solved (filled with correct values)
	else if(coord == false){
		console.log("Solved!")
		return puzzle
	}
};
 

// Looks for an empty cell. Returns false if array is full 
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

// Checks to make sure integer is not already in row
function checkRow(puzzle,x,y,i){
	for(var j = 0; j < 9; j++){
		if(puzzle[x][j] == i){return false}
	}
	return true
};

// Checks to make sure integer is not already in column
function checkColumn(puzzle,x,y,i){
	for(var k = 0; k < 9; k++){
		if(puzzle[k][y] == i){return false}
	}
	return true
};

// Checks to make sure integer is not in appropriate 3x3 space (grids labeled left to right, top to bottom)
function check3x3(puzzle,x,y,i){ //Grid 1
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
			if(puzzle[j][k] == i) {return false}
		}
	}
	return true 
};


