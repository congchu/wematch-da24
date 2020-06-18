function template(
  { template },
  opts,
  { componentName, jsx }
) {
  const typeScriptTpl = template.smart({ plugins: ['typescript', 'classProperties'] })

  return typeScriptTpl.ast`
import * as React from 'react'
import { black } from 'styles/colors'


interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}


export default class ${componentName} extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16,
  }

  public render() {
    return (
      ${jsx}
    )
  }
}
`
}

module.exports = template
