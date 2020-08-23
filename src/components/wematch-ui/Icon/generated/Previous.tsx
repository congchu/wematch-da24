import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgPrevious extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} d="M6.307 14.293L.144 8.003a.505.505 0 01.004-.71l.055-.045L6.3 1.147a.5.5 0 01.638-.059l.069.058a.5.5 0 010 .708l-5.8 5.805 5.804 5.923a.505.505 0 01-.004.71.495.495 0 01-.7 0z" /></svg>
  }

}
