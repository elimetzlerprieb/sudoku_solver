var dim = 9; // size of sudoku puzzle


$(document).ready(function(){
	showGrid("puzzle")
	showGrid("solution")

	clickToGetRandom()
	clickToGetBlank()
	clickToGetUserPuzzle()
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
	// Append rows to table with "name". id corresponds to row index
	for(var x = 0; x < dim; x++) {
		jQuery("<tr/>", {
			id: "r"+x+name,
		}).appendTo("[id="+name+"]");

		// Append td to each row. id corresponds to coumn index
		for(var y = 0; y < dim; y++) {
			jQuery("<td/>", {
			class: name + "box",
			id: "c" + y + name,
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
	for(var x = 0; x < dim; x++) {
		puzzle[x] = [];
		for(var y = 0; y < dim; y++) {
			puzzle[x][y] = $("tr[id=r"+x+name+"] > td[id=c"+y+name+"]").text();
		}
	}
	return puzzle
};


// Retrieves puzzles and fills in HTML grids with values
function clickToGetRandom() {
	$(document).on("click","#random",function(){
		var testPuzzle = convertSeed(getSeed(0));
		console.log(testPuzzle.join("\n"))
		updateGrid("puzzle",testPuzzle)
		updateGrid("solution",testPuzzle)
	})
};

function clickToGetBlank() {
	$(document).on("click","#blank",function(){
		var blank = [[0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0]];
		console.log(blank.join("\n"))
		updateGrid("puzzle",blank)
		updateGrid("solution",blank)
	})
};

function clickToGetUserPuzzle() {
	$(document).on("click","#input",function() {
		var input = prompt('Please input your puzzle. 0 for blanks. Commas at end of lines');
		console.log(input)
		var puzzle = input.split(',')
		for(i=0; i<puzzle.length; i++) {
			puzzle[i] = puzzle[i].split('');
		}

		for(var x = 0; x < puzzle.length; x++) {
			for(var y = 0; y < puzzle.length; y++) {
				puzzle[x][y] = parseInt(puzzle[x][y])
			}
		}
		console.log(puzzle.join("\n"))
		console.log('Yeah!')
		updateGrid("puzzle",puzzle)
		updateGrid("solution",puzzle)
	})
};

// Set of seed puzzles of differernt difficulties
function getSeed(n=0) {
	if(n==0){n=Math.floor((Math.random()*5)+1)}
	var seeds = [];
	
	// easy
	seeds[1] = [["i","a","d","h","0","0","b","0","0"],
	["e","0","0","0","0","0","0","i","0"],
	["0","c","g","0","e","b","0","0","0"],
	["0","0","0","b","0","0","c","0","h"],
	["a","f","h","0","g","0","e","b","i"],
	["g","0","c","0","0","h","0","0","0"],
	["0","0","0","a","c","0","i","h","0"],
	["0","i","0","0","0","0","0","0","b"],
	["0","0","e","0","0","i","a","d","c"]]

	// medium
	seeds[2] = [["0","h","0","0","0","d","0","a","e"],
	["0","0","c","0","0","i","g","0","h"],
	["0","0","0","0","e","0","0","d","0"],
	["0","0","i","g","0","f","0","0","b"],
	["0","0","0","0","b","0","0","0","0"],
	["h","0","0","a","0","e","c","0","0"],
	["0","i","0","0","d","0","0","0","0"],
	["c","0","h","i","0","0","d","0","0"],
	["f","g","0","h","0","0","0","i","0"]]

	// hard
	seeds[3] = [["0","0","g","d","0","b","0","0","e"],
	["0","0","0","0","0","0","b","0","0"],
	["0","0","d","i","0","f","a","0","0"],
	["0","0","c","0","0","g","0","0","i"],
	["0","a","h","0","0","0","e","g","0"],
	["g","0","0","h","0","0","c","0","0"],
	["0","0","b","f","0","a","d","0","0"],
	["0","0","i","0","0","0","0","0","0"],
	["d","0","0","e","0","i","h","0","0"]]

	// evil 
	seeds[4] = [["g","0","0","0","0","0","0","0","h"],
	["0","0","e","h","0","g","f","0","0"],
	["0","h","0","0","i","0","0","a","0"],
	["0","a","0","0","h","0","0","i","0"],
	["0","0","g","c","0","b","d","0","0"],
	["0","d","0","0","f","0","0","b","0"],
	["0","g","0","0","a","0","0","e","0"],
	["0","0","f","b","0","i","a","0","0"],
	["b","0","0","0","0","0","0","0","d"]]

	// extreme evil
	seeds[5] = [["0","0","i","0","0","e","0","0","b"],
	["0","a","0","0","i","0","0","f","0"],
	["b","0","0","h","0","0","d","0","0"],
	["i","0","0","d","0","0","c","0","0"],
	["0","c","0","0","b","0","0","h","0"],
	["0","0","b","0","0","c","0","0","e"],
	["0","0","f","0","0","b","0","0","c"],
	["0","e","0","0","a","0","0","g","0"],
	["a","0","0","f","0","0","h","0","0"]]
	console.log(n)
	return seeds[n]
};

// Changes seed into an array, rotates integer values 
function convertSeed(seed) {
	var k = Math.floor(Math.random()*10)
	for(var x = 0; x < (seed.length); x++) {
		for(var y = 0; y < (seed.length); y++) {
			if(seed[x][y] == "a"){seed[x][y] = ((0+k)%9)+1}
			else if(seed[x][y] =="b"){seed[x][y] = ((1+k)%9)+1}
			else if(seed[x][y] =="c"){seed[x][y] = ((2+k)%9)+1}
			else if(seed[x][y] =="d"){seed[x][y] = ((3+k)%9)+1}
			else if(seed[x][y] =="e"){seed[x][y] = ((4+k)%9)+1}
			else if(seed[x][y] =="f"){seed[x][y] = ((5+k)%9)+1}
			else if(seed[x][y] =="g"){seed[x][y] = ((6+k)%9)+1}
			else if(seed[x][y] =="h"){seed[x][y] = ((7+k)%9)+1}
			else if(seed[x][y] =="i"){seed[x][y] = ((8+k)%9)+1}  
		}
	}
	return seed
};

// On click: reads current HTML puzzle into an array and solves array before updating solution grid 
function clickToSolve() {
	$(document).on("click","#solve",function(){
		puzzle = readGrid("puzzle")
		var solvedPuzzle = solvePuzzle(puzzle)
		updateGrid("solution",solvedPuzzle)
	})
};

// On click: read current HTML puzzle into an array and makes solution grid identical 
function clickToReset() {
	$(document).on("click","#reset",function(){
		puzzle = readGrid("puzzle")
		updateGrid("solution",puzzle);
	})
};

// Recursively solve the sudoku puzzle using a backtracking method
function solvePuzzle(puzzle,x=0,y=0) {
	// Check to see if the puzzle has been filled in
	var coord = findEmpty(puzzle);

	// Non-base case (puzzle is not filled in); attempt to fill in value, if succesive, calle recursive function
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
	// Base case: puzzle is solved (filled with correct values), return puzzle 
	else if(coord == false){
		console.log("Solved!")
		return puzzle
	}
};

// Looks for an empty cell. Returns coordinates of empty cell or false if array is full
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
	for(var j = 0; j < dim; j++){
		if(puzzle[x][j] == i){return false}
	}
	return true
};

// Checks to make sure integer is not already in column
function checkColumn(puzzle,x,y,i){
	for(var k = 0; k < dim; k++){
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


