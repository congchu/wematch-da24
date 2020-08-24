import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgPlusCircleHover extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><g fill="none" fillRule="evenodd"><circle cx={8} cy={8} r={8}
        fill="#1672F7" /><path fill="#FFF" fillRule="nonzero" d="M7.984 9.552a.5.5 0 01.5.5v4a.5.5 0 11-1 0v-4a.5.5 0 01.5-.5zM8 2a.5.5 0 01.5.5V7h5a.5.5 0 110 1h-11a.5.5 0 010-1h5V2.5A.5.5 0 018 2z" /></g></svg>
  }

}
