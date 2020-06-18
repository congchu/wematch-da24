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
export default class SvgTruck extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><g transform="translate(-1 -5)" fill="none" fillRule="evenodd"><rect fill={this.props.color} fillRule="nonzero" x={12} y={5.333} width={10.667} height={1.333} rx={0.667} /><rect fill={this.props.color} fillRule="nonzero" x={5.333} y={8.667} width={6} height={1.333} rx={0.667} /><path d="M11.333 9.333v8a.667.667 0 11-1.333 0v-8a.667.667 0 111.333 0zM22.667 6v11.333a.667.667 0 01-1.334 0V6a.667.667 0 111.334 0z" fill={this.props.color} fillRule="nonzero" /><rect fill={this.props.color} fillRule="nonzero" transform="rotate(90 2 15.333)" x={-0.667} y={14.667} width={5.333} height={1.333} rx={0.667} /><path d="M6.5 9.769l-3.97 3.928a.719.719 0 01-.978.031.618.618 0 01-.029-.906l3.97-3.928a.719.719 0 01.978-.032.618.618 0 01.03.907z" fill={this.props.color} fillRule="nonzero" /><rect fill={this.props.color} fillRule="nonzero" x={10} y={16.667} width={5} height={1.333} rx={0.667} /><rect fill={this.props.color} fillRule="nonzero" x={18} y={16.667} width={4.667} height={1.333} rx={0.667} /><rect fill={this.props.color} fillRule="nonzero" x={1.333} y={16.667} width={3.333} height={1.333} rx={0.667} /><circle stroke={this.props.color} strokeWidth={4} cx={6.333} cy={17.333} r={1} /><circle stroke={this.props.color} strokeWidth={4} cx={16.667} cy={17.333} r={1} /></g></svg>;
  }

}