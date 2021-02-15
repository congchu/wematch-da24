import * as React from 'react';
import { black } from 'styles/colors';
interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgDownArrow extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: '#333333',
    width: 16,
    height: 16
  };

  public render() {
    return(
        <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7L8 10L12 7" stroke={this.props.color} stroke-linecap="round"/>
          <path d="M2 9V14H14V9" stroke={this.props.color} stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 10V2" stroke={this.props.color} stroke-linecap="round"/>
        </svg>
        )


  }

}