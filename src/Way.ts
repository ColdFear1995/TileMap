class TileNode {

    public x:number;
    public y:number;
    public f:number;
    public g:number;
    public h:number;
    public walkable:boolean = true;
    public parent:TileNode;
    public costMultiplier:number = 1.0;

    public constructor(x:number,y:number) {

        this.x = x;
        this.y = y;
    }

}

class Grid {

    public _startNode:TileNode;
    public _endNode:TileNode;
    public _nodes;
    public _numCols:number;
    public _numRows:number;

    public constructor(numCols:number,numRows:number) {

        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = new Array();

        for(var i = 0; i<this._numCols; i++) {

            this._nodes[i] =  new Array();
            for(var j=0; j<this._numRows; j++) {
                this._nodes[i][j] = new TileNode(i,j);
            }
        }
    }

    public getNode(x:number,y:number):TileNode {

        return this._nodes[x][y] as TileNode;
    }

    public setEndNode(x:number,y:number):void {

        this._endNode = this._nodes[x][y] as TileNode; 
    }

    public getEndNode():TileNode {

        return this._endNode;
    }

    public setStartNode(x:number,y:number):void {

        this._startNode = this._nodes[x][y] as TileNode;
    }

    public getStartNode():TileNode {

        return this._startNode;
    }

    public setWalkable(x:number,y:number,value:boolean) {

        this._nodes[x][y].walkable = value;
    }

    public getNumCols():number {

        return this._numCols;
    }

    public getNumRows():number {

        return this._numRows;
    }

}


class AStar {

		  _openList: TileNode[] = [];//Array<TileNode>//

		  _closedList: TileNode[] = [];  //已考察表

		  _grid: Grid;

		  _startNode: TileNode;
		  _endNode: TileNode;

		  _path: TileNode[] = [];

	_heuristic: Function = this.diagonal;

		  _straightCost: number = 1.0;
		  _diagCost: number = Math.SQRT2;

	constructor() {

	}
	public findPath(grid: Grid): Boolean {
		this._grid = grid;
		this._openList = new Array();
		this._closedList = new Array();

		this._startNode = this._grid._startNode;
		this._endNode = this._grid._endNode;

		this._startNode.g = 0;
		this._startNode.h = this._heuristic(this._startNode);
		this._startNode.f = this._startNode.g + this._startNode.h;

		return this.search();
	}

	public search(): Boolean {

		var currentNode: TileNode = this._startNode;

		while (currentNode != this._endNode) {

			var startX: number = Math.max(0, currentNode.x - 1);
			var endX: number = Math.min(this._grid._numCols - 1, currentNode.x + 1);

			var startY: number = Math.max(0, currentNode.y - 1);
			var endY: number = Math.min(this._grid._numRows - 1, currentNode.y + 1);

			for (var i: number = startX; i <= endX; i++) {

				for (var j: number = startY; j <= endY; j++) {
					var test: TileNode = this._grid._nodes[i][j];
					if (test == currentNode || !test.walkable||!this._grid._nodes[currentNode.x][test.y].walkable||!this._grid._nodes[test.x][currentNode.y].walkable)
						{continue;}

					var cost: number = this._straightCost;
					if (!((currentNode.x == test.x) || (currentNode.y == test.y))) {
						cost = this._diagCost;
					}

					var g: number = currentNode.g + cost;
					var h: number = this._heuristic(test);
					var f: number = g + h;

					if (this.isOpen(test) || this.isClosed(test)) {
						if (test.f > f) {
							test.f = f;
							test.g = g;
							test.h = h;
							test.parent = currentNode;
						}
					} else {
						test.f = f;
						test.g = g;
						test.h = h;
						test.parent = currentNode;
						this._openList.push(test);
					}
				}
			}


			this._closedList.push(currentNode); 

			if (this._openList.length == 0) {

				return false;
			}

			this._openList.sort(function (a, b) {
				return a.f - b.f;
			});
			
			currentNode = this._openList.shift() as TileNode;

		}

		this.buildPath();

		return true;
	}

    public getpath():any{

        return this._path;
    }

	

	public isOpen(node: TileNode): Boolean {
		for (var i: number = 0; i < this._openList.length; i++) {
			if (this._openList[i] == node) {
				return true;
			}
		}
		return false;
			//return this._openList.indexOf(node) > 0 ? true : false;
	}

	

	public isClosed(node: TileNode): Boolean {
		for (var i: number = 0; i < this._closedList.length; i++) {
			if (this._closedList[i] == node) {
				return true;
			}
		}
		return false;
//return this._closedList.indexOf(node) > 0 ? true : false;
	}
	


    public buildPath(): void {

		this._path = new Array();
		var node: TileNode = this._endNode;
		this._path.push(node);
		while (node != this._startNode) {
			node = node.parent;
			this._path.unshift(node);  //开头加入
		}
	}

	public manhattan(node: TileNode): number {
		return Math.abs(this._endNode.x - node.x) * this._straightCost + Math.abs(this._endNode.y - node.y) * this._straightCost;
	}

	public euclidian(node: TileNode): number {
		var dx: number = this._endNode.x - node.x;
		var dy: number = this._endNode.y - node.y;

		return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
	}


	public diagonal(node: TileNode): number {
		var dx: number = Math.abs(this._endNode.x - node.x);
		var dy: number = Math.abs(this._endNode.y - node.y);

		var diag: number = Math.min(dx, dy);
		var straight: number = dx + dy;

		return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
	}

	public visited(): TileNode[] {
		return this._closedList.concat(this._openList);
	}

	public validNode(node: TileNode, currentNode: TileNode): Boolean {
		if (currentNode == node || !node.walkable) return false;

		if (!this._grid._nodes[currentNode.x][node.y].walkable) return false;

		if (!this._grid._nodes[node.x][currentNode.y].walkable) return false;

		return true;
	}
}