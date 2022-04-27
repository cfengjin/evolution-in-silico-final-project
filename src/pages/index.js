import React, { useState } from "react"
import { Link } from "gatsby"
import Grid from "../components/Grid"
import Description from "../components/Description"

// styles
const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

// markup
const ProjectPage = () => {
  // const [numPaintings, setNumPaintings] = useState(4)
  const [probTerminal, setProbTerminal] = useState(0.2)
  const [mutationProb, setMutationProb] = useState(1)
  const [maxDepth, setMaxDepth] = useState(5)
  const [width, setWidth] = useState(80)
  const [height, setHeight] = useState(80)
  const [downsample, setDownsample] = useState(5)
  return (
    <main style={pageStyles}>
      <title>Project</title>
      <h1 style={headingStyles}>Project</h1>
      <Grid 
        // numPaintings={numPaintings}
        probTerminal={probTerminal}
        mutationProb={mutationProb}
        maxDepth={maxDepth}
        width={width}
        height={height}
        downsample={downsample}
      />
      {/* <div>
        Number of paintings:
        <input type="number" value={numPaintings} onChange={e => setNumPaintings(e.target.value)} />
      </div> */}
      <div>
        Terminal node probability:
        <input type="range" min="0" max="1" step="0.1" value={probTerminal} onChange={e => setProbTerminal(e.target.value)} />
        {probTerminal}
      </div>
      <div>
        Mutation probability:
        <input type="range" min="0" max="1" step="0.1" value={mutationProb} onChange={e => setMutationProb(e.target.value)} />
        {mutationProb}
      </div>
      <div>
        Maximum depth:
        <input type="number" value={maxDepth} onChange={e => setMaxDepth(e.target.value)} />
      </div>
      <div>
        Painting width:
        <input type="number" value={width} onChange={e => setWidth(e.target.value)} />
      </div>
      <div>
        Painting height:
        <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
      </div>
      <div>
        Upsample rate:
        <input type="number" value={downsample} onChange={e => setDownsample(e.target.value)} />
      </div>
      <Description />
    </main>
  )
}

export default ProjectPage
