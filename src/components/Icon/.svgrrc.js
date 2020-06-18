module.exports = {
  dimensions: true,
  replaceAttrValues: {
    '#121212': '{this.props.color}'
  },
  svgProps: {
    width: '{this.props.width}',
    height: '{this.props.height}',
    style: '{this.props.style}',
    className: '{this.props.className}',
  },
  expandProps: false,
  prettier: false
}