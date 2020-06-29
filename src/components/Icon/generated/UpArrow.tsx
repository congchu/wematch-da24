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
export default class SvgUpArrow extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><path d="M14.651 10.949l-6.29-6.163a.505.505 0 00-.71.004l-.045.054-6.101 6.097a.5.5 0 00-.058.638l.058.07a.5.5 0 00.707 0l5.805-5.8 5.923 5.803a.505.505 0 00.711-.004.495.495 0 000-.7z" fill={this.props.color} /></svg>;
  }

}