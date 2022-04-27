import React, { useState, useEffect } from 'react'
import Canvas from "./Canvas"
import { mutate, Painting, generatePaintings } from "../model.js"

const containerStyles = {
  display: 'flex',
  flexWrap: 'wrap'
}

const Grid = props => {

  const { numPaintings, probTerminal, mutationProb, maxDepth, width, height, downsample } = props

  const [paintings, setPaintings] = useState(generatePaintings(numPaintings, probTerminal, maxDepth));
  const [selectedPainting, setSelectedPainting] = useState(paintings[0]);

  // select and mutate
  const selectPainting = (i, e) => {
    const painting = paintings[i]
    let newPopulation = []
    for (let i = 0; i < numPaintings; ++i) {
      const newPainting = new Painting(probTerminal, maxDepth, mutate(mutationProb, probTerminal, maxDepth, painting.genotype))
      newPopulation.push(newPainting)
    }
    setSelectedPainting(painting)
    setPaintings(newPopulation)
  }
  
  let canvases = []
  for (let i = 0; i < numPaintings; ++i) {
    canvases.push(<div onClick={e => selectPainting(i, e)} key={i}><Canvas painting={paintings[i]} width={width} height={height}/></div>)
  }

  return (
    <>
      <Canvas painting={selectedPainting} width={width} height={height} downsample={downsample} />
      <div style={containerStyles}>{canvases}</div>
    </>
  )
}

export default Grid