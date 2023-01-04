export default class Node {
    up?: Node;
    down?: Node;
    left?: Node;
    right?: Node;

    start:boolean = false;
    end:boolean = false;

    constructor(public x:number, public y:number, public cost:number) {
    }

    get_neighbors():Node[] {
        let neighbors:Node[] = [];
        if (this.up) neighbors.push(this.up);
        if (this.down) neighbors.push(this.down);
        if (this.left) neighbors.push(this.left);
        if (this.right) neighbors.push(this.right);
        return neighbors;
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
