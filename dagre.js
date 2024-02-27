const includeColor = 'purple';
const relateColor = 'orangered';
const equalColor = 'lime';

class Edge{
    /**
     * ノードを集めるためにエッジを初期化。
     * @param {object} edge - G6 edge.
     * @param {Boolean} collectSource - true when collect only source node. false when collect only target node.
     */
    constructor(edge, collectSource){
        this.edge = edge;

        if(collectSource){
            this.neighboringNodeId = edge._cfg.model.source;
        }else{
            this.neighboringNodeId = edge._cfg.model.target;
        }
    }

    /**
     * エッジとノードを集める関数。
     * @param {object} graph - G6 graph.
     * @param {object} nodeId - original nodeId.
     * @param {Array<Map<string>>} collected - array of collected source/target nodeId.
     * @param {Array<Map<string>>} new_uncollected - array of uncollected source/target nodeId.
     * @param {Number} nodeOpacity - collected node opacity. greater than irrelevant node.
     */
    collectEdgeAndNode(graph, nodeId, collected, new_uncollected, nodeOpacity){
        // A edge has 2 nodes (source ID and target ID).
        // One of them is nodeId.
        if(nodeId != this.neighboringNodeId){
            graph.setItemState(this.edge, 'active', true);

            // 1. 小数<->実数のようにお互いを指しているパターン
            // 2. 複数のuncollectedNodeがcollected、uncollectedに含まれていないnodeを指しているパターン
            // への対応条件
            const neighboringNodeId = (map) => map.nodeId === this.neighboringNodeId;
            if(!collected.some(neighboringNodeId) &&
               !new_uncollected.some(neighboringNodeId)){
                new_uncollected.push(
                    {'nodeId': this.neighboringNodeId, 'opacity': nodeOpacity} 
                );
            }
        }
    }
}


class EdgeAttr{
    /**
     * init.
     * @param {string} edgeColor
     * @param {Boolean} isEqual - true when edge means equal.
     * @param {Boolean} isActive - true when edge is active.
     */
    constructor(edgeColor, isEqual, isActive){
        this.arrowWidth = 8;
        this.arrowLength = 15;
        this.arrowOffset = 0;
        this.path = G6.Arrow.vee(this.arrowWidth, this.arrowLength, this.arrowOffset);

        this.isEqual = isEqual;

        if(isActive){
            this.edge = {
                lineWidth: 3,
                stroke: edgeColor,
                endArrow: {
                    path: this.path,
                },
            };
        }else{
            this.edge = {
                lineWidth: 1,
                stroke: 'gray',
                opacity: 0.5,
                endArrow: {
                    path: this.path,
                },
            };
        }
    }

    getAttr(){
        if(this.isEqual){
            this.edge['startArrow'] = {
                path: this.path,
            };
        }
        return this.edge;
    }
}

/**
 * nodeOpacityを計算する関数。
 * nodeOpacity is greater than irrelevantNodeOpacity.
 * @param {Number} nodeOpacity - collected node opacity.
 * @param {Number} irrelevantNodeOpacity - irrelevant node opacity.
 */
function calcNodeOpacity(nodeOpacity, irrelevantNodeOpacity){
    const opacityRange = nodeOpacity - irrelevantNodeOpacity;
    if (opacityRange <= 0){
        throw new RangeError('nodeOpacity is less than irrelevantNodeOpacity!');
    }
    return irrelevantNodeOpacity + opacityRange * 0.85;
}


/**
 * source/targetのnode/edgeのIDを集める関数。
 * @param {object} graph - G6 graph.
 * @param {Array<Map<string>>} collected - array of collected source/target nodeId.
 * @param {Array<Map<string>>} uncollected - array of uncollected source/target nodeId.
 * @param {Boolean} collectSource - true when collect source nodeId.
 * @param {Number} nodeOpacity - collected node opacity. greater than irrelevant node.
 * @param {Number} irrelevantNodeOpacity - irrelevant node opacity.
 */
function collectID(graph, collected, uncollected, collectSource, nodeOpacity, irrelevantNodeOpacity){
    const new_uncollected = [];
    for(let map of uncollected){
        const node = graph.findById(map.nodeId);
        const nodeId = node._cfg.id;

        collected.push(map);
        
        const newNodeOpacity = calcNodeOpacity(nodeOpacity, irrelevantNodeOpacity);
        const edges = node._cfg.edges;
        for(let raw_edge of edges){
            const edge = new Edge(raw_edge, collectSource);
            edge.collectEdgeAndNode(graph, nodeId, collected, new_uncollected, newNodeOpacity);
        }
        if(new_uncollected.length > 0){
            collectID(graph, collected, new_uncollected, collectSource, newNodeOpacity, irrelevantNodeOpacity);
        }
    }
}


// new G6.Graph()のnodeStateStylesなどの箇所でラベルの色の指定をしたかったが、
// 反映されなかったので関数にしている。
function updateNodeColor(graph, node, color){
    graph.updateItem(node, {
        labelCfg: {
            style: {
                fill: color
            }
        }
    });
}

// もとのnodeから離れているほどnode文字と透過率を薄くしている。
function updateNode(graph, node, opacity){
    const color_num = Math.floor((1 - opacity) * 255);
    const color_hex = color_num.toString(16);
    const color = '#' + color_hex + color_hex + color_hex;
    graph.updateItem(node, {
        labelCfg: {
            style: {
                fill: color,
                opacity: opacity
            }
        }
    });
}


/**
 * 概念同士の関係性を見やすくする関数。
 * @param {object} graph - G6 graph.
 * @param {object} node - clicked node.
 * @param {Number} irrelevantNodeOpacity - 無関係なノードのopacity。
 */
function visualizeRelationship(graph, node, irrelevantNodeOpacity){
    const uncollected_sources = []
    const uncollected_targets = []

    const nodeId = node._cfg.id;
    const edges = node._cfg.edges;
    const nodeOpacity = calcNodeOpacity(1, irrelevantNodeOpacity);
    for(let edge of edges){
        const sourceNodeId = edge._cfg.model.source;

        if(sourceNodeId == nodeId){
            uncollected_targets.push({
                'nodeId': edge._cfg.model.target,
                'opacity': nodeOpacity
            });
        }else{
            uncollected_sources.push({
                'nodeId': sourceNodeId,
                'opacity': nodeOpacity
            });
        }
        graph.setItemState(edge, 'active', true);
    }
    
    const firstNodeMap = {'nodeId': nodeId, 'opacity': 1};
    const sources = [firstNodeMap];
    collectID(graph, sources, uncollected_sources, true, nodeOpacity, irrelevantNodeOpacity);
    const targets = [firstNodeMap];
    collectID(graph, targets, uncollected_targets, false, nodeOpacity, irrelevantNodeOpacity);

    graph.findAll('node', n => {
        graph.setItemState(n, 'nodeState', 'irrelevant');
        updateNodeColor(graph, n, 'gray');
    });
    for(let map of sources){
        const n = graph.findById(map.nodeId);
        graph.setItemState(n, 'nodeState', 'source');
        updateNode(graph, n, map.opacity);
    }
    for(let map of targets){
        const n = graph.findById(map.nodeId);
        graph.setItemState(n, 'nodeState', 'target');
        updateNode(graph, n, map.opacity);
    }
}


// 全てのノード、エッジの状態を初期状態に戻す。
function resetState(graph){
    graph.findAllByState('node', 'active').forEach(node => {
        graph.setItemState(node, 'active', false);
    });
    graph.findAllByState('edge', 'active').forEach(edge => {
        graph.setItemState(edge, 'active', false);
    });

    graph.findAllByState('node', 'nodeState:source').forEach(node => {
        graph.clearItemStates(node, ['nodeState:source']);
        updateNode(graph, node, 1);
    });
    graph.findAllByState('node', 'nodeState:target').forEach(node => {
        graph.clearItemStates(node, ['nodeState:target']);
        updateNode(graph, node, 1);
    });
    graph.findAllByState('node', 'nodeState:irrelevant').forEach(node => {
        graph.clearItemStates(node, ['nodeState:irrelevant']);
        updateNode(graph, node, 1);
    });
}


function getLegend(){
    const legendData = {
        edges: [
            {
                id: "include",
                label: "包含",
                order: 0,
                style: {
                    width: 30,
                    stroke: includeColor,
                    endArrow: true
                }
            },
            {
                id: "relate",
                label: "関連",
                order: 1,
                style: {
                    width: 30,
                    stroke: relateColor,
                    endArrow: true
                }
            },
            {
                id: "equal",
                label: "同値",
                order: 2,
                style: {
                    width: 30,
                    stroke: equalColor,
                    startArrow: true,
                    endArrow: true
                }
            },
        ]
    };
    return new G6.Legend({
        data: legendData,
        containerStyle: {
            fill: 'lavender'
        }
    });
}


function getNodeMenu(){
    return new G6.Menu({
        // position offset of menu upper left corner.
        offsetX: 10,
        offsetY: -50,
        itemTypes: ['node'],
        getContent(e) {
            return `<ul>
                <li>このノードを隠す</li>
                <li>小学校レベルまで表示</li>
                <li>中学校レベルまで表示</li>
                <li>高校レベルまで表示</li>
                <li>すべて表示</li>
                <li>この項目について</li>
            </ul>`;
        },
        handleMenuClick(target, item) {
            switch(target.textContent){
                case 'この項目について':
                    const nodeId = item._cfg.id;
                    window.location.href = nodeId + '.html';
                    break;
            }
        },
    });
}


/**
 * dataをもとにグラフを書く関数。
 * @param {object} data - ノードとエッジの情報を持つJSON。
 */
function main(data){
    const legend = getLegend();
    const nodeMenu = getNodeMenu();

    const irrelevantNodeOpacity = 0.5;
    G6.registerBehavior('custom-activate-relations', {
        getDefaultCfg(){
            return {
                multiple: false,
                trigger: 'click',
                activateState: 'selected'
            }
        },
        getEvents(){
            return {
                'node:click': 'onNodeClick',
                'canvas:click': 'onCanvasClick'
            }
        },
        onNodeClick(e){
            const node = e.item;
            // Get the configurations by this.
            // If you do not allow multiple nodes to be 'active', cancel the 'active' state for other nodes
            if(!this.multiple){
                resetState(graph);
            }
            // activate the clicked node.
            graph.setItemState(node, 'active', true);
            visualizeRelationship(graph, node, irrelevantNodeOpacity);
        },
        onCanvasClick(e){
            // shouldUpdate can be overrode by users.
            // Returning true means turning the 'active' to be false for all the nodes.
            if(this.shouldUpdate(e)){
                resetState(graph);
            }
        }
    });
    
    
    const container = document.getElementById('container');
    const width = container.scrollWidth;
    const height = container.scrollHeight || 1000;
    const graph = new G6.Graph({
        container: 'container',
        width,
        height,
        fitView: true,
        modes: {
            default: ['drag-canvas', 'drag-node', 'custom-activate-relations'],
        },
        layout: {
            type: 'force',
            preventOverlap: true,
            linkDistance: 200,
        },
        defaultNode: {
            size: 40,
        },
        nodeStateStyles: {
            'nodeState:source': {
                fill: 'cyan',
                stroke: 'dodgerblue',
            },
            'nodeState:target': {
                fill: 'gold',
                stroke: 'chocolate',
            },
            'nodeState:irrelevant': {
                opacity: irrelevantNodeOpacity,
            },
        },
        plugins: [legend, nodeMenu],
    });

    /**
     * edgeを初期化する関数。
     * @param {string} name - assume only 'active'.
     * @param {Boolean} value - true when active. false when inactive.
     * @param {object} item - edge.
     * @param {string} edgeColor - edge color.
     * @param {Boolean} isEqual - true when edge means equal.
     */
    function initState(name, value, item, edgeColor, isEqual){
        const group = item.get('group');
        const keyShape = group.find((ele) => ele.get('name') === 'edge-shape');
        if(name == 'active'){
            const edgeAttr = new EdgeAttr(edgeColor, isEqual, value);
            keyShape.attr(edgeAttr.getAttr());
        }else{
            console.log('error in initState().');
            console.log(name);
        }
    }

    G6.registerEdge('relate', {
        setState: (name, value, item) => {
            initState(name, value, item, relateColor, false);
        },
    }, 'relate-line');

    G6.registerEdge('include', {
        setState: (name, value, item) => {
            initState(name, value, item, includeColor, false);
        },
    }, 'include-line');

    G6.registerEdge('equal', {
        setState: (name, value, item) => {
            initState(name, value, item, equalColor, true);
        },
    }, 'equal-line');

    graph.data(data);
    graph.render();

    // init
    // これがないと最初に表示されるエッジがdefaultのものでアローもない。
    graph.findAll('edge', (edge) => {
        graph.setItemState(edge, 'active', false);
    });

    if (typeof window !== 'undefined')
        window.onresize = () => {
            if (!graph || graph.get('destroyed')) return;
            if (!container || !container.scrollWidth || !container.scrollHeight) return;
            graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    
}


fetch('data.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        main(data);
    })
    .catch(error => {
        console.error(error);
    });
