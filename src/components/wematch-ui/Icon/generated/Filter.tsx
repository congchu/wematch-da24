import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgFilter extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} d="M13.5 2a.5.5 0 110 1H3.56l4.476 4.786 2.88-3.068a.5.5 0 01.635-.08l.072.057a.499.499 0 01.08.634l-.056.072L8.542 8.71v5.79a.5.5 0 11-1 0V8.722L2.086 2.887a.5.5 0 01-.037-.638l.061-.068.022-.018A.499.499 0 012.5 2h11z" /></svg>
  }

}
