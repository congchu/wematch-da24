import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgNext extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} d="M9.669 14.646l6.162-6.289a.505.505 0 00-.003-.71l-.055-.046-6.097-6.1a.5.5 0 00-.638-.059l-.07.058a.5.5 0 000 .707l5.8 5.805-5.803 5.924a.505.505 0 00.004.71.495.495 0 00.7 0z" /></svg>
  }

}
