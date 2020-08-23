import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgCheckOn extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill="#1672F7" d="M14.008 1.958L5.901 11.85 2.043 8.34l-.028-.022a1.013 1.013 0 00-1.418.206 1.177 1.177 0 00.15 1.574l4.428 4.031c.037.033.037.033.076.063.04.03.082.057.126.08l.034.026c.438.263.99.17 1.306-.217l8.85-10.8a1.04 1.04 0 00-.035-1.358l-.11-.105a1.004 1.004 0 00-1.414.14z" /></svg>
  }

}
