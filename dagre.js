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
     * @param {Array<string>} collected - array of collected source/target nodeId.
     * @param {Array<string>} new_uncollected - array of uncollected source/target nodeId.
     */
    collectEdgeAndNode(graph, nodeId, collected, new_uncollected){
        // A edge has 2 nodes (source ID and target ID).
        // One of them is nodeId.
        if(nodeId != this.neighboringNodeId){
            graph.setItemState(this.edge, 'active', true);

            // 1. 小数<->実数のようにお互いを指しているパターン
            // 2. 複数のuncollectedNodeがcollected、uncollectedに含まれていないnodeを指しているパターン
            // への対応条件
            if(!collected.includes(this.neighboringNodeId) &&
               !new_uncollected.includes(this.neighboringNodeId)){
                new_uncollected.push(this.neighboringNodeId);
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
 * source/targetのnode/edgeのIDを集める関数。
 * @param {object} graph - G6 graph.
 * @param {Array<string>} collected - array of collected source/target nodeId.
 * @param {Array<string>} uncollected - array of uncollected source/target nodeId.
 * @param {Boolean} collectSource - true when collect source nodeId.
 */
function collectID(graph, collected, uncollected, collectSource){
    const new_uncollected = [];
    for(let neighboringNodeId of uncollected){
        const node = graph.findById(neighboringNodeId);
        const nodeId = node._cfg.id;

        collected.push(nodeId);

        const edges = node._cfg.edges;
        for(let raw_edge of edges){
            const edge = new Edge(raw_edge, collectSource);
            edge.collectEdgeAndNode(graph, nodeId, collected, new_uncollected);
        }
        if(new_uncollected.length > 0){
            collectID(graph, collected, new_uncollected, collectSource);
        }
    }
};


/**
 * dataをもとにグラフを書く関数。
 * @param {object} data - ノードとエッジの情報を持つJSON。
 */
function main(data){
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
        // 全てのノード、エッジの状態を初期状態に戻す。
        resetState(){
            graph.findAllByState('node', 'active').forEach(node => {
                graph.setItemState(node, 'active', false);
            });
            graph.findAllByState('edge', 'active').forEach(edge => {
                graph.setItemState(edge, 'active', false);
            });
    
            graph.findAllByState('node', 'nodeState:source').forEach(node => {
                graph.clearItemStates(node, ['nodeState:source']);
            });
            graph.findAllByState('node', 'nodeState:target').forEach(node => {
                graph.clearItemStates(node, ['nodeState:target']);
            });
            graph.findAllByState('node', 'nodeState:irrelevant').forEach(node => {
                graph.clearItemStates(node, ['nodeState:irrelevant']);
                this.updateNodeColor(node, 'black');
            });
        },
        // new G6.Graph()のnodeStateStylesなどの箇所でラベルの色の指定をしたかったが、
        // 反映されなかったので関数にしている。
        updateNodeColor(node, color){
            graph.updateItem(node, {
                labelCfg: {
                    style: {
                        fill: color
                    }
                }
            });
        },
        onNodeClick(e){
            const graph = this.graph;
            const node = e.item;
            // Get the configurations by this.
            // If you do not allow multiple nodes to be 'active', cancel the 'active' state for other nodes
            if(!this.multiple){
                this.resetState();
            }
            // activate the clicked node.
            graph.setItemState(node, 'active', true);
    
            const uncollected_sources = []
            const uncollected_targets = []
    
            const nodeId = node._cfg.id;
            const edges = node._cfg.edges;
            for(let edge of edges){
                const sourceNodeId = edge._cfg.model.source;
    
                if(sourceNodeId == nodeId){
                    uncollected_targets.push(edge._cfg.model.target);
                }else{
                    uncollected_sources.push(sourceNodeId);
                }
                graph.setItemState(edge, 'active', true);
            }
            
            const sources = [nodeId];
            collectID(graph, sources, uncollected_sources, true);
            const targets = [nodeId];
            collectID(graph, targets, uncollected_targets, false);
    
            graph.findAll('node', n => {
                graph.setItemState(n, 'nodeState', 'irrelevant');
                this.updateNodeColor(n, 'gray');
            })
            for(let nodeId of sources){
                const n = graph.findById(nodeId);
                graph.setItemState(n, 'nodeState', 'source');
                this.updateNodeColor(n, 'black');
            }
            for(let nodeId of targets){
                const n = graph.findById(nodeId);
                graph.setItemState(n, 'nodeState', 'target');
                this.updateNodeColor(n, 'black');
            }
        },
        onCanvasClick(e){
            // shouldUpdate can be overrode by users.
            // Returning true means turning the 'active' to be false for all the nodes.
            if(this.shouldUpdate(e)){
                this.resetState();
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
                opacity: 0.5,
            },
        },
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
            initState(name, value, item, 'orangered', false);
        },
    }, 'relate-line');

    G6.registerEdge('include', {
        setState: (name, value, item) => {
            initState(name, value, item, 'purple', false);
        },
    }, 'include-line');

    G6.registerEdge('equal', {
        setState: (name, value, item) => {
            initState(name, value, item, 'lime', true);
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
