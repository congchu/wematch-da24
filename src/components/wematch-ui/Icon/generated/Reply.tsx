import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgReply extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} fillRule="evenodd" d="M15.03 8.558a.498.498 0 01-.088.242l-.057.07-2.829 2.828a.5.5 0 01-.765-.638l.058-.07 1.987-1.987H1.5a.5.5 0 01-.5-.5V4.5a.5.5 0 011 0v3.503h11.318l-1.969-1.97a.5.5 0 01.707-.706l2.829 2.828a.498.498 0 01.144.311v.092z" /></svg>
  }

}
