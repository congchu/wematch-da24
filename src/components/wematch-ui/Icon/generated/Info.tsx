import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgInfo extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill="#BCC0C6" d="M8 0a8 8 0 110 16A8 8 0 018 0zm.632 5.604H7.368V13h1.264V5.604zM8.01 2.91c-.246 0-.432.07-.557.212a.755.755 0 00-.188.52.73.73 0 00.188.512c.125.137.311.205.557.205.246 0 .433-.068.56-.205a.722.722 0 00.192-.512.747.747 0 00-.191-.52c-.128-.141-.315-.212-.56-.212z" opacity={0.848} /></svg>
  }

}
