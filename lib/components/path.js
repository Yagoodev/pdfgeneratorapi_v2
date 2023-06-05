export function generateVectorPathStrokeContent(doc, paths) {
  paths.map(path => {
    doc.path(path)
      .stroke()
  })
}

export function generateVectorPathStrokeContentTranslate(doc, path, translate) {
  const horizontal = translate.horizontal;
  const vertical = translate.vertical;

  doc.path(path)
    .translate(horizontal, vertical)
    .stroke()
}

export function generateVectorPathFillContent(doc, paths) {
  paths.map(path => {
    doc.path(path)
      .fill()
  })
}