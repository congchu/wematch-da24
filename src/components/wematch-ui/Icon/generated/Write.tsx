import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgWrite extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} d="M10.988 1.111l4.544 4.558c.074.074.12.164.138.26a.504.504 0 01-.13.485l-8.603 8.352-.035.03A.5.5 0 016.5 15h-5a.5.5 0 01-.5-.5v-4l.006-.079a.495.495 0 01.084-.263l.064-.078 3.52-3.473a.503.503 0 01.709.002c.172.173.191.44.057.634l-.06.071L2 10.648 1.999 14H6.29l5.067-4.919-4.165-4.13a.497.497 0 01-.145-.318.493.493 0 01.08-.372l.058-.07 3.056-3.05a.502.502 0 01.087-.07l-.048.042a.5.5 0 01.708 0zm-.36 1.055L8.225 4.564l3.85 3.82 2.414-2.345-3.861-3.873z" /></svg>
  }

}
