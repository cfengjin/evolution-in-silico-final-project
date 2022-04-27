class Node {
  constructor(type) {
    this.parent = null
    this.type = type
    this.depth = 0
    this.children = []
  }
}

// Terminal nodes
class ConstNode extends Node {
  constructor(value) {
    super('const')
    this.value = value
  }
}

class VarNode extends Node {
  constructor(name) {
    super('var')
    this.name = name
  }
}

// Function nodes
class MultiArgFuncNode extends Node {
  constructor(name, argCount) {
    super(name)
    this.argCount = argCount
  }
}

class TwoArgFuncNode extends Node {
  constructor(name) {
    super(name)
    this.argCount = 2
  }
}

const TERMINAL_SET = [new ConstNode(1/16), new ConstNode(1/8), new ConstNode(1/4), new ConstNode(1/2), new ConstNode(1), new ConstNode(2), new ConstNode(4), new ConstNode(8), new ConstNode(16), new VarNode('x'), new VarNode('y'), new VarNode('r'), new VarNode('g'), new VarNode('b'), new VarNode('a')]
const FUNCTION_SET = [new TwoArgFuncNode('add'),
                      new TwoArgFuncNode('sub'),
                      new TwoArgFuncNode('mult'),
                      new TwoArgFuncNode('pow'),
                      new MultiArgFuncNode('sq', 1),
                      new MultiArgFuncNode('sqr', 1),
                      new TwoArgFuncNode('max'),
                      new TwoArgFuncNode('min'),
                      new MultiArgFuncNode('relu', 1),
                      new MultiArgFuncNode('cos', 1),
                      new MultiArgFuncNode('sin', 1)]

// Individual utils

export const evaluate = (node, params) => {
  switch (node.type) {
    case 'const':
      return node.value
    case 'var':
      return params[node.name]
    case 'add':
      const addends = node.children.map(child => evaluate(child, params))
      return addends.reduce((partialSum, a) => partialSum + a, 0)
    case 'sub':
      const subends = node.children.map(child => evaluate(child, params))
      return subends.reduce((partialSum, a) => partialSum - a, 2 * subends[0])
    case 'mult':
      const factors = node.children.map(child => evaluate(child, params))
      return factors.reduce((partialProd, a) => partialProd * a, 0)
    case 'pow':
      const parts = node.children.map(child => evaluate(child, params))
      return parts[0] ^ parts[1]
    case 'sq':
      const a = node.children.map(child => evaluate(child, params))
      return a[0] ^ 2
    case 'sqr':
      const b = node.children.map(child => evaluate(child, params))
      return Math.sqrt(b)
    case 'max':
      return Math.max(...node.children.map(child => evaluate(child, params)))
    case 'min':
      return Math.min(...node.children.map(child => evaluate(child, params)))
    case 'relu':
      let array = node.children.map(child => evaluate(child, params))
      array.push(0)
      return Math.max(...array)
    case 'sin':
      const c = node.children.map(child => evaluate(child, params))
      return Math.sin(c)
    case 'cos':
      const d = node.children.map(child => evaluate(child, params))
      return Math.cos(d)
    default:
      console.log('huh')
  }
}

const addChild = (parent, child) => {
  child.depth = parent.depth + 1
  child.parent = parent
  parent.children.push(child)
}

const growRandom = (probTerminal, maxDepth, currNode=null, currDepth=0) => {
  let newNode = null
  if (Math.random() < probTerminal || currDepth == maxDepth - 1) {
    const newClassInstance = TERMINAL_SET[Math.floor(Math.random() * TERMINAL_SET.length)]
    newNode = JSON.parse(JSON.stringify(newClassInstance))
    newNode.depth = currDepth
    newNode.parent = currNode
  } else {
    const newClassInstance = FUNCTION_SET[Math.floor(Math.random() * FUNCTION_SET.length)]
    newNode = JSON.parse(JSON.stringify(newClassInstance))
    newNode.depth = currDepth
    newNode.parent = currNode
    for (let i = 0; i < newNode.argCount; ++i) {
      addChild(newNode, growRandom(newNode, currDepth+1))
    }
  }
  return newNode
}

const nodesInGenotype = currNode => {
  let nodeList = [currNode]
  let visitorIndex = 0
  while (visitorIndex < nodeList.length) {
    if (nodeList[visitorIndex].children.length) {
      nodeList = nodeList.concat(nodeList[visitorIndex].children)
    }
    ++visitorIndex
  }
  return nodeList
}

export const mutate = (mutProb, probTerminal, maxDepth, genotype) => {
  if (Math.random() < mutProb) {
    const nodes = nodesInGenotype(genotype)
    let currNode = nodes[Math.floor(Math.random() * nodes.length)]

    if (!currNode.parent) {
      return growRandom(probTerminal, maxDepth)
    }

    const newNode = growRandom(probTerminal, maxDepth, currNode.parent, currNode.depth)
    const index = currNode.parent.children.indexOf(currNode);
    if (index > -1) {
      currNode.parent.children.splice(index, 1); // 2nd parameter means remove one item only
    }
    addChild(currNode.parent, newNode)
  }

  // const leafNodes = nodesInGenotype(genotype).filter(node => node.children.length === 0)
  // let currNode = leafNodes[Math.floor(Math.random() * leafNodes.length)]

  // while (Math.random() < mutProb && currNode.parent) {
  //   currNode = currNode.parent
  // }

  // if (!currNode.parent) {
  //   return growRandom(probTerminal, maxDepth)
  // }

  // const newNode = growRandom(probTerminal, maxDepth, currNode.parent, currNode.depth)
  // const index = currNode.parent.children.indexOf(currNode);
  // if (index > -1) {
  //   currNode.parent.children.splice(index, 1); // 2nd parameter means remove one item only
  // }
  // addChild(currNode.parent, newNode)

  return genotype
}

// Individual painting

export class Painting {
  constructor(probTerminal, maxDepth, genotype=null) {
    this.probTerminal = probTerminal
    this.maxDepth = maxDepth
    this.genotype = !genotype ? growRandom(probTerminal, maxDepth) : genotype
    this.fitness = null
  }
}

// Population utils
        
// const update_fitnesses = (paintings, fitness_function) => {
//     let fitnesses = []
//     paintings.population.forEach(painting => {
//       painting.fitness = fitness_function(painting)
//       fitnesses.push(painting.fitness)
//     })
//     return fitnesses
// }

// const do_timestep = (paintings, fitness_function, selection_function, mutation_prob) => {
//   fitness_list = paintings.update_fitnesses(fitness_function)



//   selected_individuals = [selection_function(paintings.population) 
//                           for _ in range(paintings.pop_size)]
    
//     for individual_idx in range(len(selected_individuals)):
//         individual = selected_individuals[individual_idx].deepcopy()
        
//         if random.random() < mutation_prob:
//             individual.mutate()
        
//         selected_individuals[individual_idx] = individual
    
//     paintings.population = selected_individuals
    
//     return fitness_list
// }

// Population of paintings

export const generatePaintings = (popSize, probTerminal, maxDepth) => {
  console.log('generate')
  let paintings = []
  for (let i = 0; i < popSize; ++i) {
    paintings.push(new Painting(probTerminal, maxDepth))
  }
  return paintings
}

export class Paintings {
  constructor(popSize, probTerminal, maxDepth) {
    this.popSize = popSize
    this.probTerminal = probTerminal
    this.maxDepth = maxDepth
    this.population = []
    for (let i = 0; i < popSize; ++i) {
      this.population.push(new Painting(probTerminal, maxDepth))
    }
  }
}
