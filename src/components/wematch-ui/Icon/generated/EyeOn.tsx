import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgEyeOn extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill="#161C1D" d="M8 2.782c3.08 0 7.5 2.302 7.5 5.02 0 2.718-4.402 4.98-7.5 4.98-1.133 0-3.09-.388-3.886-.922a.5.5 0 11.504-.853l.01-.01c.383.369 2.386.785 3.372.785 2.618 0 6.5-1.995 6.5-3.98 0-1.99-3.9-4.02-6.5-4.02-2.575 0-6.5 2.038-6.5 4.02 0 .625.434 1.23 1.348 2.001l.203.168a.544.544 0 01.178.395.5.5 0 01-.886.318l-.345-.293C1.003 9.515.5 8.75.5 7.803c0-2.714 4.445-5.02 7.5-5.02zm-.064 1.429c1.715 0 3.071 1.582 3.071 3.5 0 1.917-1.356 3.5-3.071 3.5s-3.071-1.583-3.071-3.5c0-1.918 1.356-3.5 3.071-3.5zm0 1c-1.125 0-2.071 1.103-2.071 2.5 0 1.396.946 2.5 2.071 2.5 1.125 0 2.071-1.104 2.071-2.5 0-1.397-.946-2.5-2.071-2.5z" /></svg>
  }

}
