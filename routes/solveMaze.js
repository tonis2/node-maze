function solve(playfield, start, end) {
  let Xmax = Math.max(...playfield.map(item => item.x)),
      Xmin = Math.min(...playfield.map(item => item.x)),
      Ymax = Math.max(...playfield.map(item => item.y)),
      Ymin = Math.min(...playfield.map(item => item.y));
  console.log(Ymax);
  this.returnType = (x,y) => {
    if(x < Xmin || y < Ymin || x > Xmax || y > Ymax ) {
      return "wall"
    }
   let filteredData = playfield.filter( data => (data.x == x) && (data.y == y));
   return filteredData[0].type;
  }
  this.changeType = (x,y) => {
        let filteredData = playfield.filter( data => (data.x == x) && (data.y == y));
        if(filteredData[0].type == "start" || filteredData[0].type == "end") {
          return;
        }
        playfield = playfield.filter( data => (data.x != x) && (data.y != y));
        playfield.push({x:x, y:y, type:"visited"});
  }
  this.move = (x,y) => {
      console.log(x,y);
      let nextMoves = [],
          moves;
      this.moveDown = () => {
        console.log("move down");
        let type = this.returnType(x, y+1);
        console.log(type);
        if(type == "empty" || type == "visited") {
          nextMoves.push({ x:x, y:y+1, visited: type == "visited" ? true: false });
        }
      }
      this.moveUp = () => {
        console.log("move up");
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
      moves.forEach( move => {
        move();
      })
      console.log(nextMoves);
      this.move(nextMoves[0].x, nextMoves[0].y);

  }
  this.move(start.x, start.y);
}

const solveMaze = (data ) => {
   return new Promise ((resolve, reject) => {
      let playfield = data.playfield;
      let start = data.start[0];
      let end = data.end[0];
      let startPos = new Object();
      let endPos = new Object();
      startPos.x = start.x;
      startPos.y = start.y;
      startPos.type = "start";
      endPos.x = end.x;
      endPos.y = end.y;
      endPos.type = "end";
      playfield.push(startPos, endPos);
      solve(playfield, startPos, endPos);
      resolve("yMax");
  });
}

module.exports = {
  solveMaze
}
