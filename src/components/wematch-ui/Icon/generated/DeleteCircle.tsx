import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgDeleteCircle extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><g fill="none" fillRule="evenodd"><circle cx={8} cy={8} r={8}
        fill="#BCC0C6" fillRule="nonzero" /><path fill="#FFF" d="M5.854 5.146l2.121 2.122 2.121-2.122a.5.5 0 01.638-.057l.07.057a.5.5 0 01.057.638l-.058.07-2.121 2.121 2.121 2.121a.5.5 0 01-.707.707L7.975 8.682l-2.121 2.121a.5.5 0 01-.638.058l-.07-.058a.5.5 0 01-.057-.638l.057-.069 2.122-2.121-2.122-2.121a.5.5 0 11.708-.708z" /></g></svg>
  }

}
