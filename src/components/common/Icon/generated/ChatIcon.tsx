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
export default class SvgChatIcon extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><defs><filter x="-11.6%" y="-26.5%" width="123.1%" height="169.4%" filterUnits="objectBoundingBox" id="ChatIcon_svg__a"><feOffset dy={4} in="SourceAlpha" result="shadowOffsetOuter1" /><feGaussianBlur stdDeviation={5} in="shadowOffsetOuter1" result="shadowBlurOuter1" /><feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1" /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" in="shadowBlurOuter1" /></filter><path d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0h107c11.046 0 20 8.954 20 20s-8.954 20-20 20h1l-9 9-9-9H20z" id="ChatIcon_svg__b" /></defs><g transform="translate(10 6)" fill="none" fillRule="evenodd"><use fill="#000" filter="url(#ChatIcon_svg__a)" xlinkHref="#ChatIcon_svg__b" /><path stroke="#1672F7" d="M127 40.293v.207h1l-.354-.854-.646.647zm-8 8l-.354.353h.708l-.354-.353z" strokeLinejoin="inherit" fill="#FFF" /></g></svg>;
  }

}