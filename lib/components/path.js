function generateVectorPathStrokeContent(doc, paths) {
  paths.map(path => {
    doc.path(path)
      .stroke()
  })
}

function generateVectorPathFillContent(doc, paths) {
  paths.map(path => {
    doc.path(path)
      .fill()
  })
}

export {
  generateVectorPathStrokeContent,
  generateVectorPathFillContent
}