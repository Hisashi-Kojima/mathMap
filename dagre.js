const data = {
    nodes: [
        {
            id: 'math',
            label: '数学',
        },
        {
            id: 'number',
            label: '数',
        },
        {
            id: 'shape',
            label: '図形',
        },
        {
            id: 'complexNumber',
            label: '複素数',
        },
        {
            id: 'realNumber',
            label: '実数',
        },
        {
            id: 'imaginaryNumber',
            label: '虚数',
        },
        {
            id: 'area',
            label: '面積',
        },
        {
            id: 'volume',
            label: '体積',
        },
        {
            id: 'rationalNumber',
            label: '有理数',
        },
        {
            id: 'irrationalNumber',
            label: '無理数',
        },
        {
            id: 'integer',
            label: '整数',
        },
        {
            id: 'fraction',
            label: '分数',
        },
        {
            id: 'oddNumber',
            label: '奇数',
        },
        {
            id: 'evenNumber',
            label: '偶数',
        },
        {
            id: 'primeNumber',
            label: '素数',
        },
        {
            id: 'naturalNumber',
            label: '自然数',
        },
        {
            id: 'decimal',
            label: '小数',
        },
        {
            id: 'repeatingDecimal',
            label: '循環小数',
        },
        {
            id: 'nonRepeatingDecimal',
            label: '非循環小数',
        },
        {
            id: 'pi',
            label: '円周率',
        },
        {
            id: 'e',
            label: 'ネイピア数',
        },
        {
            id: 'transcendentalNumber',
            label: '超越数',
        },
        {
            id: 'absoluteValue',
            label: '絶対値',
        },
        {
            id: 'distance',
            label: '距離',
        },
        {
            id: 'expression',
            label: '数式',
        },
        {
            id: 'equality',
            label: '等式',
        },
        {
            id: 'inequality',
            label: '不等式',
        },
        {
            id: 'identity',
            label: '恒等式',
        },
        {
            id: 'equation',
            label: '方程式',
        },
        {
            id: 'algebraicEquation',
            label: '代数方程式',
        },
        {
            id: 'functionalEquation',
            label: '関数方程式',
        },
        {
            id: 'differentialEquation',
            label: '微分方程式',
        },
        {
            id: 'ordinaryDifferentialEquation',
            label: '常微分方程式',
        },
        {
            id: 'partialDifferentialEquation',
            label: '偏微分方程式',
        },
        {
            id: 'SIRModel',
            label: 'SIRモデル',
        },
        {
            id: 'RSACrypto',
            label: 'RSA暗号',
        },
        {
            id: 'congruence',
            label: '整数の合同',
        },
        {
            id: 'calculation',
            label: '計算',
        },
        {
            id: 'elementaryArithmetic',
            label: '四則演算',
        },
        {
            id: 'addition',
            label: '加法',
        },
        {
            id: 'subtraction',
            label: '減法',
        },
        {
            id: 'multiplication',
            label: '乗法',
        },
        {
            id: 'division',
            label: '除法',
        },
        {
            id: 'modulo',
            label: '剰余演算',
        },
        {
            id: 'differentiation',
            label: '微分',
        },
        {
            id: 'integration',
            label: '積分',
        },
        {
            id: 'set',
            label: '集合',
        },
        {
            id: 'map',
            label: '写像',
        },
        {
            id: 'function',
            label: '関数',
        },
        {
            id: 'trigonometricFunction',
            label: '三角関数',
        },
        {
            id: 'sin',
            label: 'sin',
        },
        {
            id: 'cos',
            label: 'cos',
        },
        {
            id: 'tan',
            label: 'tan',
        },
        {
            id: 'cosSimilarity',
            label: 'cos類似度',
        },
        {
            id: 'probability',
            label: '確率',
        },
        {
            id: 'permutation',
            label: '順列',
        },
        {
            id: 'combination',
            label: '組み合わせ',
        },
        {
            id: 'gacha',
            label: 'ガチャ',
        },
        {
            id: 'exponentiation',
            label: 'べき乗',
        },
        {
            id: 'log',
            label: '対数',
        },
        {
            id: 'locationEstimation',
            label: '位置推定',
        },
        {
            id: 'graphTheory',
            label: 'グラフ理論',
        },
        {
            id: 'tensor',
            label: 'テンソル',
        },
        {
            id: 'vector',
            label: 'ベクトル',
        },
        {
            id: 'matrix',
            label: '行列',
        },
        {
            id: 'pageRank',
            label: 'ページランク',
        },
        {
            id: 'quaternion',
            label: '四元数',
        },
        {
            id: 'rotation',
            label: '回転',
        },
        {
            id: 'rotationMatrix',
            label: '回転行列',
        },
        {
            id: 'angle',
            label: '角',
        },
        {
            id: 'eulerAngles',
            label: 'オイラー角',
        },
        {
            id: 'NLP',
            label: '自然言語処理',
        },
        {
            id: 'compoundInterest',
            label: '複利',
        },
        {
            id: 'limit',
            label: '極限',
        },
        {
            id: 'ratio',
            label: '比',
        },
        {
            id: 'trigonometricRatios',
            label: '三角比',
        },
        {
            id: 'goldenRatio',
            label: '黄金比',
        },
        {
            id: 'silverRatio',
            label: '白銀比',
        },
        {
            id: 'paperSizeRatio',
            label: '用紙のサイズ',
        },
        {
            id: 'monaLisa',
            label: 'モナ・リザ',
        },
        {
            id: 'numericalSequence',
            label: '数列',
        },
        {
            id: 'arithmeticSequence',
            label: '等差数列',
        },
        {
            id: 'geometricSequence',
            label: '等比数列',
        },
        {
            id: 'fibonacciSequence',
            label: 'フィボナッチ数列',
        },
        {
            id: 'recurrenceRelation',
            label: '漸化式',
        },
        {
            id: 'sequenceOfDifferences',
            label: '階差数列',
        },
        {
            id: 'mean',
            label: '平均',
        },
        {
            id: 'variance',
            label: '分散',
        },
        {
            id: 'summation',
            label: '総和',
        },
        {
            id: 'productOfSequence',
            label: '総乗',
        },
        {
            id: 'series',
            label: '級数',
        },
        {
            id: 'taylorSeries',
            label: 'テイラー級数',
        },
        {
            id: 'maclaurinSeries',
            label: 'マクローリン級数',
        },
        {
            id: 'fourierSeries',
            label: 'フーリエ級数',
        },
        {
            id: 'laplaceEquation',
            label: 'ラプラス方程式',
        },
        {
            id: 'diffusionEquation',
            label: '拡散方程式',
        },
        {
            id: 'maxwellEquations',
            label: 'マクスウェルの方程式',
        },
        {
            id: 'theoryOfRelativity',
            label: '相対性理論',
        },
        {
            id: 'GPS',
            label: 'GPS',
        },
        {
            id: 'plane',
            label: '平面',
        },
        {
            id: 'surface',
            label: '曲面',
        },
        {
            id: 'body',
            label: '立体',
        },
        {
            id: 'polygon',
            label: '多角形',
        },
        {
            id: 'circle',
            label: '円',
        },
        {
            id: 'ball',
            label: '球',
        },
        {
            id: 'pyramid',
            label: '角錐',
        },
        {
            id: 'prism',
            label: '角柱',
        },
        {
            id: 'cylinder',
            label: '円柱',
        },
        {
            id: 'sphere',
            label: '球面',
        },
        {
            id: 'sphericalTrigonometry',
            label: '球面三角法',
        },
        {
            id: 'commonLog',
            label: '常用対数',
        },
        {
            id: 'naturalLog',
            label: '自然対数',
        },
    ],
    edges: [
        {
            source: 'math',
            target: 'number',
        },
        {
            source: 'math',
            target: 'shape',
        },
        {
            source: 'number',
            target: 'quaternion',
        },
        {
            source: 'quaternion',
            target: 'complexNumber',
        },
        {
            source: 'complexNumber',
            target: 'realNumber',
        },
        {
            source: 'complexNumber',
            target: 'imaginaryNumber',
        },
        {
            source: 'shape',
            target: 'area',
        },
        {
            source: 'shape',
            target: 'volume',
        },
        {
            source: 'realNumber',
            target: 'rationalNumber',
        },
        {
            source: 'realNumber',
            target: 'irrationalNumber',
        },
        {
            source: 'rationalNumber',
            target: 'integer',
        },
        {
            source: 'rationalNumber',
            target: 'fraction',
        },
        {
            source: 'integer',
            target: 'oddNumber',
        },
        {
            source: 'integer',
            target: 'evenNumber',
        },
        {
            source: 'integer',
            target: 'primeNumber',
        },
        {
            source: 'integer',
            target: 'naturalNumber',
        },
        {
            source: 'realNumber',
            target: 'decimal',
        },
        {
            source: 'decimal',
            target: 'realNumber',
        },
        {
            source: 'decimal',
            target: 'repeatingDecimal',
        },
        {
            source: 'decimal',
            target: 'nonRepeatingDecimal',
        },
        {
            source: 'irrationalNumber',
            target: 'nonRepeatingDecimal',
        },
        {
            source: 'nonRepeatingDecimal',
            target: 'irrationalNumber',
        },
        {
            source: 'nonRepeatingDecimal',
            target: 'pi',
        },
        {
            source: 'nonRepeatingDecimal',
            target: 'e',
        },
        {
            source: 'complexNumber',
            target: 'transcendentalNumber',
        },
        {
            source: 'transcendentalNumber',
            target: 'pi',
        },
        {
            source: 'transcendentalNumber',
            target: 'e',
        },
        {
            source: 'number',
            target: 'absoluteValue',
        },
        {
            source: 'shape',
            target: 'distance',
        },
        {
            source: 'absoluteValue',
            target: 'distance',
        },
        {
            source: 'math',
            target: 'expression',
        },
        {
            source: 'expression',
            target: 'equality',
        },
        {
            source: 'expression',
            target: 'inequality',
        },
        {
            source: 'equality',
            target: 'identity',
        },
        {
            source: 'equality',
            target: 'equation',
        },
        {
            source: 'equation',
            target: 'algebraicEquation',
        },
        {
            source: 'equation',
            target: 'functionalEquation',
        },
        {
            source: 'functionalEquation',
            target: 'differentialEquation',
        },
        {
            source: 'differentialEquation',
            target: 'ordinaryDifferentialEquation',
        },
        {
            source: 'differentialEquation',
            target: 'partialDifferentialEquation',
        },
        {
            source: 'ordinaryDifferentialEquation',
            target: 'SIRModel',
        },
        {
            source: 'primeNumber',
            target: 'RSACrypto',
        },
        {
            source: 'integer',
            target: 'congruence',
        },
        {
            source: 'congruence',
            target: 'RSACrypto',
        },
        {
            source: 'math',
            target: 'calculation',
        },
        {
            source: 'calculation',
            target: 'elementaryArithmetic',
        },
        {
            source: 'elementaryArithmetic',
            target: 'addition',
        },
        {
            source: 'elementaryArithmetic',
            target: 'subtraction',
        },
        {
            source: 'elementaryArithmetic',
            target: 'multiplication',
        },
        {
            source: 'elementaryArithmetic',
            target: 'division',
        },
        {
            source: 'division',
            target: 'modulo',
        },
        {
            source: 'modulo',
            target: 'congruence',
        },
        {
            source: 'calculation',
            target: 'differentiation',
        },
        {
            source: 'calculation',
            target: 'integration',
        },
        {
            source: 'differentiation',
            target: 'differentialEquation',
        },
        {
            source: 'math',
            target: 'set',
        },
        {
            source: 'set',
            target: 'map',
        },
        {
            source: 'set',
            target: 'function',
        },
        {
            source: 'map',
            target: 'function',
        },
        {
            source: 'function',
            target: 'map',
        },
        {
            source: 'function',
            target: 'trigonometricFunction',
        },
        {
            source: 'trigonometricFunction',
            target: 'sin',
        },
        {
            source: 'trigonometricFunction',
            target: 'cos',
        },
        {
            source: 'trigonometricFunction',
            target: 'tan',
        },
        {
            source: 'cos',
            target: 'cosSimilarity',
        },
        {
            source: 'calculation',
            target: 'probability',
        },
        {
            source: 'calculation',
            target: 'permutation',
        },
        {
            source: 'calculation',
            target: 'combination',
        },
        {
            source: 'probability',
            target: 'gacha',
        },
        {
            source: 'multiplication',
            target: 'exponentiation',
        },
        {
            source: 'exponentiation',
            target: 'log',
        },
        {
            source: 'log',
            target: 'locationEstimation',
        },
        {
            source: 'set',
            target: 'graphTheory',
        },
        {
            source: 'number',
            target: 'tensor',
        },
        {
            source: 'tensor',
            target: 'vector',
        },
        {
            source: 'tensor',
            target: 'matrix',
        },
        {
            source: 'probability',
            target: 'pageRank',
        },
        {
            source: 'quaternion',
            target: 'rotation',
        },
        {
            source: 'matrix',
            target: 'rotationMatrix',
        },
        {
            source: 'rotationMatrix',
            target: 'rotation',
        },
        {
            source: 'shape',
            target: 'angle',
        },
        {
            source: 'angle',
            target: 'eulerAngles',
        },
        {
            source: 'eulerAngles',
            target: 'rotation',
        },
        {
            source: 'vector',
            target: 'NLP',
        },
        {
            source: 'e',
            target: 'compoundInterest',
        },
        {
            source: 'calculation',
            target: 'limit',
        },
        {
            source: 'math',
            target: 'ratio',
        },
        {
            source: 'ratio',
            target: 'trigonometricRatios',
        },
        {
            source: 'trigonometricFunction',
            target: 'trigonometricRatios',
        },
        {
            source: 'ratio',
            target: 'goldenRatio',
        },
        {
            source: 'ratio',
            target: 'silverRatio',
        },
        {
            source: 'goldenRatio',
            target: 'monaLisa',
        },
        {
            source: 'silverRatio',
            target: 'paperSizeRatio',
        },
        {
            source: 'irrationalNumber',
            target: 'goldenRatio',
        },
        {
            source: 'irrationalNumber',
            target: 'silverRatio',
        },
        {
            source: 'number',
            target: 'numericalSequence',
        },
        {
            source: 'numericalSequence',
            target: 'arithmeticSequence',
        },
        {
            source: 'numericalSequence',
            target: 'geometricSequence',
        },
        {
            source: 'numericalSequence',
            target: 'fibonacciSequence',
        },
        {
            source: 'fibonacciSequence',
            target: 'goldenRatio',
        },
        {
            source: 'equality',
            target: 'recurrenceRelation',
        },
        {
            source: 'numericalSequence',
            target: 'recurrenceRelation',
        },
        {
            source: 'numericalSequence',
            target: 'sequenceOfDifferences',
        },
        {
            source: 'addition',
            target: 'mean',
        },
        {
            source: 'division',
            target: 'mean',
        },
        {
            source: 'mean',
            target: 'variance',
        },
        {
            source: 'addition',
            target: 'summation',
        },
        {
            source: 'multiplication',
            target: 'productOfSequence',
        },
        {
            source: 'summation',
            target: 'series',
        },
        {
            source: 'series',
            target: 'taylorSeries',
        },
        {
            source: 'taylorSeries',
            target: 'maclaurinSeries',
        },
        {
            source: 'series',
            target: 'fourierSeries',
        },
        {
            source: 'partialDifferentialEquation',
            target: 'laplaceEquation',
        },
        {
            source: 'partialDifferentialEquation',
            target: 'diffusionEquation',
        },
        {
            source: 'partialDifferentialEquation',
            target: 'maxwellEquations',
        },
        {
            source: 'maxwellEquations',
            target: 'theoryOfRelativity',
        },
        {
            source: 'theoryOfRelativity',
            target: 'GPS',
        },
        {
            source: 'shape',
            target: 'plane',
        },
        {
            source: 'shape',
            target: 'surface',
        },
        {
            source: 'shape',
            target: 'body',
        },
        {
            source: 'elementaryArithmetic',
            target: 'area',
        },
        {
            source: 'elementaryArithmetic',
            target: 'volume',
        },
        {
            source: 'plane',
            target: 'polygon',
        },
        {
            source: 'plane',
            target: 'circle',
        },
        {
            source: 'circle',
            target: 'pi',
        },
        {
            source: 'body',
            target: 'ball',
        },
        {
            source: 'body',
            target: 'pyramid',
        },
        {
            source: 'body',
            target: 'prism',
        },
        {
            source: 'body',
            target: 'cylinder',
        },
        {
            source: 'ball',
            target: 'sphere',
        },
        {
            source: 'surface',
            target: 'sphere',
        },
        {
            source: 'sphere',
            target: 'sphericalTrigonometry',
        },
        {
            source: 'log',
            target: 'commonLog',
        },
        {
            source: 'log',
            target: 'naturalLog',
        },
        {
            source: 'e',
            target: 'naturalLog',
        },
    ],
};
  
const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 800;
const nodeWidth = 120;
const nodeHeight = 20;
const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    fitView: true,
    modes: {
        default: ['drag-canvas', 'drag-node', 'activate-relations'],
    },
    layout: {
        type: 'force',
        preventOverlap: true,
        linkDistance: 200,
    },
    defaultNode: {
        size: 40,
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
});
graph.data(data);
graph.render();

if (typeof window !== 'undefined')
    window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
