/**
 * source/targetのnode/edgeのIDを集める関数。
 * @param {object} graph - G6 graph.
 * @param {Array<string>} collected - array of collected source/target nodeId.
 * @param {Array<string>} uncollected - array of uncollected source/target nodeId.
 * @param {Boolean} isSource - true when collect source nodeId.
 */
function collectID(graph, collected, uncollected, isSource){
    const new_uncollected = [];
    for(let neighboringNodeId of uncollected){
        const node = graph.findById(neighboringNodeId);
        const nodeId = node._cfg.id;

        collected.push(nodeId);

        const edges = node._cfg.edges;
        for(let edge of edges){
            // HACK: classを使えばisSourceの条件分岐が不要になりそう。
            if(isSource){
                const sourceId = edge._cfg.model.source;
                // 1. 小数<->実数のようにお互いを指しているパターン
                // 2. 複数のuncollectedNodeがcollected、uncollectedに含まれていないnodeを指しているパターン
                // への対応条件
                if(!collected.includes(sourceId) && !new_uncollected.includes(sourceId)){
                    new_uncollected.push(sourceId);
                    graph.setItemState(edge, 'active', true);
                }
            }else{
                const targetId = edge._cfg.model.target;
                if(!collected.includes(targetId) && !new_uncollected.includes(targetId)){
                    new_uncollected.push(targetId);
                    graph.setItemState(edge, 'active', true);
                }
            }
        }
        if(new_uncollected.length > 0){
            collectID(graph, collected, new_uncollected, isSource);
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
                fill: 'yellow',
                stroke: '#ff8c00',
            },
            'nodeState:target': {
                fill: '#7fff00',
                stroke: '#006400',
            },
            'nodeState:irrelevant': {
                opacity: 0.5,
            },
        },
        defaultEdge: {
            type: 'polyline',
            size: 1,
            color: '#e2e2e2',
            style: {
                endArrow: {
                    path: 'M 0,0 L 8,4 L 8,-4 Z',
                    fill: '#e2e2e2',
                },
                radius: 20,
            },
        },
        edgeStateStyles: {
            active: {
                lineWidth: 3,
            }
        },
    });
    graph.data(data);
    graph.render();
    
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
