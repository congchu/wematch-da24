import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgDown extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} d="M14.651 5.49l-6.29 6.162a.505.505 0 01-.71-.004l-.045-.054-6.101-6.097a.5.5 0 01-.058-.638l.058-.07a.5.5 0 01.707 0l5.805 5.8 5.923-5.803a.505.505 0 01.711.004.495.495 0 010 .7z" /></svg>
  }

}
