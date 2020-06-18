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
export default class SvgPrevious extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><g fill="none" fillRule="evenodd"><path d="M9.618 19.85L.151 10.4a.513.513 0 01-.134-.496.505.505 0 01.139-.258L9.619.151a.513.513 0 11.726.726L1.23 10.025l9.115 9.098a.513.513 0 11-.726.727z" fill={this.props.color} fillRule="nonzero" /><path d="M0-2h24v24H0z" /></g></svg>;
  }

}