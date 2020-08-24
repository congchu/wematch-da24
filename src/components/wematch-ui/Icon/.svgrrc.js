module.exports = {
  dimensions: true,
  replaceAttrValues: {
    '#121212': '{this.props.color}'
  },
  svgProps: {
    width: '{this.props.size}',
    height: '{this.props.size}',
    style: '{this.props.style}',
    className: '{this.props.className}',
    viewBox: '0 0 16 16'
  },
  expandProps: false,
  prettier: false
}