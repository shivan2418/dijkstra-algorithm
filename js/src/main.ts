import Node from './classes/node';
const _ = require('lodash');

const sample_input= "1163751742\n" +
"1381373672\n" +
"2136511328\n" +
"3694931569\n" +
"7463417111\n" +
"1319128137\n" +
"1359912421\n" +
"3125421639\n" +
"1293138521\n" +
"2311944581";

function parse_input(input:string): Node[] {

    let nodes: Node[] = [];

    let x = 0;
    let y = 0;

    let rows = input.split('\n');

    rows.forEach( (row,index) => {

        Array.from(row).forEach( (char) => {
            let cost = parseInt(char);
            let node = new Node(x,y,cost);
            nodes.push(node);
            x++;
        });
        y++;
    });

    _.first(nodes)!.start=true;
    _.last(nodes)!.end=true;

    // add adjacent nodes
    nodes.forEach( (node) => {
        node.up = node.get_up(nodes);
        node.down = node.get_down(nodes);
        node.left = node.get_left(nodes);
        node.right = node.get_right(nodes);
    });

    return nodes;

}



parse_input(sample_input);