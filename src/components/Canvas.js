import React, { useRef, useEffect } from 'react'
import { evaluate } from '../model';

const getColorIndicesForCoord = (x, y, width) => {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

const Canvas = props => {

  const { painting, width, height, downsample } = props

  const canvasRef = useRef(null)

  const draw = (ctx, painting) => {

    let imageData = ctx.createImageData(width, height)
  
    for (let x = 0; x < width; ++x) {
      for (let y = 0; y < height; ++y) {
  
        let colorIndices = getColorIndicesForCoord(x, y, width);
  
        let redIndex = colorIndices[0];
        let greenIndex = colorIndices[1];
        let blueIndex = colorIndices[2];
        let alphaIndex = colorIndices[3];
  
        const red = evaluate(painting.genotype, { 'x': Math.trunc(x / downsample), 'y': Math.trunc(y / downsample), 'r': 255, 'g': 0, 'b': 0, 'a': 0 }) % 256
        const green = evaluate(painting.genotype, { 'x': Math.trunc(x / downsample), 'y': Math.trunc(y / downsample), 'r': 0, 'g': 255, 'b': 0, 'a': 0 }) % 256
        const blue = evaluate(painting.genotype, { 'x': Math.trunc(x / downsample), 'y': Math.trunc(y / downsample), 'r': 0, 'g': 0, 'b': 255, 'a': 0 }) % 256
        const alpha = evaluate(painting.genotype, { 'x': Math.trunc(x / downsample), 'y': Math.trunc(y / downsample), 'r': 0, 'g': 0, 'b': 0, 'a': 255 }) % 256
  
        imageData.data[redIndex] = red
        imageData.data[greenIndex] = green
        imageData.data[blueIndex] = blue
        imageData.data[alphaIndex] = alpha
      }
    }
  
    ctx.putImageData(imageData, 0, 0)
  }

  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    //Our draw come here

    draw(context, painting)
  }, [draw])
  
  return <canvas ref={canvasRef} width={width} height={height} />
}

export default Canvas