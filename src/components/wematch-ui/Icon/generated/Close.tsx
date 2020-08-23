import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgClose extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} d="M10.06 9.354l4.44 4.439a.5.5 0 01-.707.707l-4.44-4.44a.5.5 0 01.708-.706zm-8-8l5.83 5.83 5.793-5.794a.5.5 0 11.707.707L2.06 14.427a.5.5 0 01-.706-.707l5.83-5.83-5.83-5.83a.5.5 0 11.707-.706z" /></svg>
  }

}
