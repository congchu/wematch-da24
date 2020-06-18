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
export default class SvgNextArrow extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><path d="M1.669 13.646l.003-.003 6.16-6.286a.505.505 0 00-.004-.71L7.773 6.6 1.676.501a.5.5 0 00-.707.707l5.8 5.804-5.804 5.924a.505.505 0 00.004.71.495.495 0 00.7 0z" fill="#666" /></svg>;
  }

}