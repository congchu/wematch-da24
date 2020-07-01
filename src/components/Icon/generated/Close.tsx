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
export default class SvgClose extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><path fill={this.props.color} d="M15.091 14.03l6.659 6.66a.749.749 0 11-1.06 1.06l-6.66-6.659a.749.749 0 111.061-1.06zm-12-12l8.744 8.745 8.69-8.69a.749.749 0 111.06 1.06L3.091 21.64a.749.749 0 11-1.06-1.06l8.744-8.745L2.03 3.091a.749.749 0 111.061-1.06z" /></svg>;
  }

}