import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgPlus extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} d="M7.984 9.552a.5.5 0 01.5.5v5.44a.5.5 0 11-1 0v-5.44a.5.5 0 01.5-.5zM8 0a.5.5 0 01.5.5V7h7a.5.5 0 110 1H.5a.5.5 0 010-1h7V.5A.5.5 0 018 0z" /></svg>
  }

}
