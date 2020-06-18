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
export default class SvgIconSad extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><defs><linearGradient x1="0%" y1="65.125%" x2="100%" y2="34.875%" id="IconSad_svg__a"><stop stopColor="#2CCBCB" offset="0%" /><stop stopColor="#1689F7" offset="100%" /></linearGradient></defs><g fill="none"><path d="M72 24h8c0 22.091-17.909 40-40 40S0 46.091 0 24h8c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32zm4-4a4 4 0 014 4c0 22.091-17.909 40-40 40S0 46.091 0 24l.005-.2A4 4 0 018 24c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32l.005-.2A4 4 0 0176 20z" fill="url(#IconSad_svg__a)" transform="matrix(1 0 0 -1 0 84)" /><circle fill="#1672F7" cx={20} cy={4} r={4} /><circle fill="#1672F7" cx={60} cy={4} r={4} /><circle fill="#FFF" opacity={0.4} cx={4} cy={60} r={4} /><circle fill="#1672F7" cx={76} cy={60} r={4} /></g></svg>;
  }

}