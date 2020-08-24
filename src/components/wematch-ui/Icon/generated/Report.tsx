import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgReport extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} fillRule="evenodd" d="M10.5 0a.5.5 0 01.5.5v2a.5.5 0 01-.41.492L10.5 3h-5a.5.5 0 01-.5-.5V2H3v13h10V1.5a.5.5 0 111 0v14a.5.5 0 01-.41.492L13.5 16h-11a.5.5 0 01-.5-.5v-14a.5.5 0 01.5-.5H5V.5a.5.5 0 01.5-.5h5zm-1 10a.5.5 0 110 1h-3a.5.5 0 110-1h3zm-1-2a.5.5 0 010 1h-2a.5.5 0 010-1h2zm1-2a.5.5 0 010 1h-3a.5.5 0 010-1h3zm.5-5H6v1h4V1z" /></svg>
  }

}
