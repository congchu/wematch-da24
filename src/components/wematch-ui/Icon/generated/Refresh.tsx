import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgRefresh extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} d="M0 8l2.5-4L5 8H3a6 6 0 102.549-4.909.566.566 0 01-.275.075.5.5 0 01-.222-.948l-.045.032A7 7 0 112 8H0z" /></svg>
  }

}
