import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgSearch extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} d="M7 1a6 6 0 014.592 9.861l3.437 3.5a.5.5 0 01.055.635l-.061.072a.496.496 0 01-.632.058l-.072-.06-3.764-3.834a.5.5 0 01.004-.703l-.005-.011a5 5 0 10-2.544 1.38.5.5 0 01.251.965l.002.004A6 6 0 117 1z" /></svg>
  }

}
