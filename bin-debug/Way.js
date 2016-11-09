var TileNode = (function () {
    function TileNode(x, y) {
        this.walkable = true;
        this.costMultiplier = 1.0;
        this.x = x;
        this.y = y;
    }
    var d = __define,c=TileNode,p=c.prototype;
    return TileNode;
}());
egret.registerClass(TileNode,'TileNode');
var Grid = (function () {
    function Grid(numCols, numRows) {
        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = new Array();
        for (var i = 0; i < this._numCols; i++) {
            this._nodes[i] = new Array();
            for (var j = 0; j < this._numRows; j++) {
                this._nodes[i][j] = new TileNode(i, j);
            }
        }
    }
    var d = __define,c=Grid,p=c.prototype;
    p.getNode = function (x, y) {
        return this._nodes[x][y];
    };
    p.setEndNode = function (x, y) {
        this._endNode = this._nodes[x][y];
    };
    p.getEndNode = function () {
        return this._endNode;
    };
    p.setStartNode = function (x, y) {
        this._startNode = this._nodes[x][y];
    };
    p.getStartNode = function () {
        return this._startNode;
    };
    p.setWalkable = function (x, y, value) {
        this._nodes[x][y].walkable = value;
    };
    p.getNumCols = function () {
        return this._numCols;
    };
    p.getNumRows = function () {
        return this._numRows;
    };
    return Grid;
}());
egret.registerClass(Grid,'Grid');
var AStar = (function () {
    function AStar() {
        this._openList = []; //Array<TileNode>//
        this._closedList = []; //已考察表
        this._path = [];
        this._heuristic = this.diagonal;
        this._straightCost = 1.0;
        this._diagCost = Math.SQRT2;
    }
    var d = __define,c=AStar,p=c.prototype;
    p.findPath = function (grid) {
        this._grid = grid;
        this._openList = new Array();
        this._closedList = new Array();
        this._startNode = this._grid._startNode;
        this._endNode = this._grid._endNode;
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        return this.search();
    };
    p.search = function () {
        var currentNode = this._startNode;
        while (currentNode != this._endNode) {
            var startX = Math.max(0, currentNode.x - 1);
            var endX = Math.min(this._grid._numCols - 1, currentNode.x + 1);
            var startY = Math.max(0, currentNode.y - 1);
            var endY = Math.min(this._grid._numRows - 1, currentNode.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._grid._nodes[i][j];
                    if (test == currentNode || !test.walkable || !this._grid._nodes[currentNode.x][test.y].walkable || !this._grid._nodes[test.x][currentNode.y].walkable) {
                        continue;
                    }
                    var cost = this._straightCost;
                    if (!((currentNode.x == test.x) || (currentNode.y == test.y))) {
                        cost = this._diagCost;
                    }
                    var g = currentNode.g + cost;
                    var h = this._heuristic(test);
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = currentNode;
                        }
                    }
                    else {
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
            currentNode = this._openList.shift();
        }
        this.buildPath();
        return true;
    };
    p.getpath = function () {
        return this._path;
    };
    p.isOpen = function (node) {
        for (var i = 0; i < this._openList.length; i++) {
            if (this._openList[i] == node) {
                return true;
            }
        }
        return false;
        //return this._openList.indexOf(node) > 0 ? true : false;
    };
    p.isClosed = function (node) {
        for (var i = 0; i < this._closedList.length; i++) {
            if (this._closedList[i] == node) {
                return true;
            }
        }
        return false;
        //return this._closedList.indexOf(node) > 0 ? true : false;
    };
    p.buildPath = function () {
        this._path = new Array();
        var node = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node); //开头加入
        }
    };
    p.manhattan = function (node) {
        return Math.abs(this._endNode.x - node.x) * this._straightCost + Math.abs(this._endNode.y - node.y) * this._straightCost;
    };
    p.euclidian = function (node) {
        var dx = this._endNode.x - node.x;
        var dy = this._endNode.y - node.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    };
    p.diagonal = function (node) {
        var dx = Math.abs(this._endNode.x - node.x);
        var dy = Math.abs(this._endNode.y - node.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    };
    p.visited = function () {
        return this._closedList.concat(this._openList);
    };
    p.validNode = function (node, currentNode) {
        if (currentNode == node || !node.walkable)
            return false;
        if (!this._grid._nodes[currentNode.x][node.y].walkable)
            return false;
        if (!this._grid._nodes[node.x][currentNode.y].walkable)
            return false;
        return true;
    };
    return AStar;
}());
egret.registerClass(AStar,'AStar');
//# sourceMappingURL=Way.js.map