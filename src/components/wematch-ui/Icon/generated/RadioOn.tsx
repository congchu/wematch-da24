import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgRadioOn extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill="#1672F7" fillRule="evenodd" d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 3.333a4.667 4.667 0 10.214.005L8 3.333z" /></svg>
  }

}
