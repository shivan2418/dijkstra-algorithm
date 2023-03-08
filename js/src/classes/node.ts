const _ = require('lodash');

export default class Node {
    up?: Node;
    down?: Node;
    left?: Node;
    right?: Node;

    start:boolean = false;
    end:boolean = false;

    visited:boolean = false;

    distance_from_start:number = Infinity;
    previous_node?:Node;

    toString():string {
        return `(${this.x},${this.y})`;
    }

    constructor(public x:number, public y:number, public cost:number) {
    }

    get_distance_to_previous(previous:Node){

        let cost = previous.cost + this.cost;
        return cost;
    }

    get_distance_from_start(arrived_via?:Node):number {

        let cost = this.cost;
        let previous = this.previous_node || arrived_via as Node;

        while (!previous!.start) {
            cost += previous!.cost;
            previous = previous!.previous_node!;
        }
        return cost;
    }

    get_neighbors():Node[] {
        let neighbors:Node[] = [];
        if (this.up) neighbors.push(this.up);
        if (this.down) neighbors.push(this.down);
        if (this.left) neighbors.push(this.left);
        if (this.right) neighbors.push(this.right);
        return neighbors;
    }

    get_unvisited_neighbors():Node[] {
        let neighbors = this.get_neighbors();
        return neighbors.filter( (neighbor) => !neighbor.visited );
    }

    static get_optimal_path(nodes:Node[]){
        let end_node = _.find(nodes, {end:true});
        let path:Node[] = [];
        let current_node = end_node;
        while (!current_node!.start) {
            path.push(current_node!);
            current_node = current_node!.previous_node;
        }
        path.push(current_node!);
        return path;
    }


    static get_next_node_to_visit(nodes:Node[]):Node|undefined {

        nodes = nodes.filter( (node) => !node.visited );
        nodes = nodes.sort( (a,b) => a.distance_from_start - b.distance_from_start );
        return _.first(nodes);
    }

    get_up(nodes:Node[]):Node|undefined {
        return _find_node(this.x,this.y-1,nodes);
    }

    get_down(nodes:Node[]):Node|undefined {
        return _find_node(this.x,this.y+1,nodes);
    }

    get_left(nodes:Node[]):Node|undefined {
        return _find_node(this.x-1,this.y,nodes);
    }

    get_right(nodes:Node[]):Node|undefined {
        return _find_node(this.x+1,this.y,nodes);
    }
}

function _find_node(x:number,y:number,nodes:Node[]): Node|undefined {
    return nodes.find( node => node.x===x && node.y===y);
}
