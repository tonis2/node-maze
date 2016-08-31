function solve(playfield, start, end) {
  return new Promise((resolve, reject) =>  {
  let Xmax = Math.max(...playfield.map(item => item.x)),
      Xmin = Math.min(...playfield.map(item => item.x)),
      Ymax = Math.max(...playfield.map(item => item.y)),
      Ymin = Math.min(...playfield.map(item => item.y)),
      finished = false,
      lastTypes = { x:null,y:null },
      path = [];
this.returnType = (x,y) => {
    if(x < Xmin || y < Ymin || x > Xmax || y > Ymax ) {
      return "wall"
    }
   let filteredData = playfield.filter( data => (data.x == x) && (data.y == y));
   if(filteredData[0].type == "end") {
     finished = true;
     return;
   }
   return filteredData[0].type;
 }
  this.changeType = (x,y) => {
    let type = this.returnType(x,y);
    playfield.forEach( data => {
      if((data.x == x) && (data.y == y)) {
          data.type = "visited";
      }
    });
  }
  this.solutionPath = (x,y) => {
       let filteredData = path.filter( data => (data.x == x) && (data.y == y));
       if(filteredData.length > 0) {
          path.forEach( (item, index) => {
            if(item.x === lastTypes.x && (item.y === lastTypes.y)) {
              path.splice(index, 1);
            }
          });
       } else {
         path.push({ x:x, y:y })
       }
        lastTypes.x = x;
        lastTypes.y = y;
  }
  this.move = (x,y) => {
     this.changeType(x,y);
     this.solutionPath(x,y);
      let nextMoves = [],
          moves;
      this.moveDown = () => {
        let type = this.returnType(x, y+1);
        if(type == "empty" || type == "visited") {
          nextMoves.push({ x:x, y:y+1, visited: type == "visited" ? true: false });
        }
      }
      this.moveUp = () => {
        let type = this.returnType(x, y-1);
        if(type == "empty" || type == "visited") {
          nextMoves.push({ x:x, y:y-1, visited: type == "visited" ? true: false });
        }
      }
      this.moveLeft = () => {
        let type = this.returnType(x-1, y);
        if(type == "empty" || type == "visited") {
          nextMoves.push({ x:x-1, y:y, visited: type == "visited" ? true: false });
        }
      }
      this.moveRight = () => {
        let type = this.returnType(x+1, y);
        if(type == "empty" || type == "visited") {
          nextMoves.push({ x:x+1, y:y, visited: type == "visited" ? true: false });
        }
      }
      moves = [this.moveDown, this.moveUp, this.moveLeft, this.moveRight];
      moves.forEach( move => { move(); });
      if(!finished) {
      if(nextMoves[0].visited && nextMoves.length > 1) {
        let notVisited = nextMoves.filter( item => { return item.visited === false });
        if(notVisited.length > 0) {
          this.move(notVisited[0].x, notVisited[0].y);
        } else {
          this.move(nextMoves[0].x, nextMoves[0].y);
        }
      } else {
        this.move(nextMoves[0].x, nextMoves[0].y);
      }
    } else {
      path.push({x:end.x, y: end.y});
      resolve(path);
    }
  }
  this.move(start.x, start.y);
 });
}

const solveMaze = (data ) => {
   return new Promise ((resolve, reject) => {
      let playfield = data.playfield;
      let start = data.start[0];
      let end = data.end[0];
      playfield.forEach( item => {
        if(item.x == start.x && (item.y == start.y)) {
          item.type = "start";
        } else if (item.x == end.x && (item.y == end.y)) {
          item.type = "end";
        }
      });
      solve(playfield, start, end).then( solution => {
          resolve(solution);
      });
  });
}

module.exports = {
  solveMaze
}
