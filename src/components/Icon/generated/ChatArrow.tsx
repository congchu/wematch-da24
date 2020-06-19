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
export default class SvgChatArrow extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><g fill="none" fillRule="evenodd"><path fill="#FFF" d="M0 0l10 10.232L20 0z" /><path fill="#1672F7" fillRule="nonzero" d="M20 1L10 11 0 1h20zm-1.415 0H1.414l8.585 8.585L18.585 1z" /><path fill="#FFF" d="M0 0h20v1H0z" /></g></svg>;
  }

}