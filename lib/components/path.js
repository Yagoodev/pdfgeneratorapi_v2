export function generateVectorPathAll(doc, paths) {
  paths.map(path => {
    doc.path(path)
      .stroke()
  })
}