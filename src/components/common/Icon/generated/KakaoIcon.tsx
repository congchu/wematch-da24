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
export default class SvgKakaoIcon extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><defs><path id="KakaoIcon_svg__a" d="M0 .15h34.694v32.19H0z" /></defs><g fill="none" fillRule="evenodd"><g transform="translate(0 .51)"><mask id="KakaoIcon_svg__b" fill="#fff"><use xlinkHref="#KakaoIcon_svg__a" /></mask><path fill="#391C1C" d="M17.346.15C7.765.15 0 6.336 0 13.967c0 4.85 3.14 9.114 7.888 11.58l-1.31 6.793 7.501-4.806c1.058.161 2.15.248 3.267.248 9.58 0 17.348-6.185 17.348-13.815S26.927.15 17.346.15" mask="url(#KakaoIcon_svg__b)" /></g><path fill="#FFE500" d="M10.193 10.206H5.09c-.408 0-.741.317-.741.708 0 .39.333.71.741.71h1.808v5.99c0 .465.348.844.775.844.425 0 .77-.38.77-.843v-5.992h1.75c.41 0 .743-.32.743-.71 0-.39-.333-.707-.743-.707m2.047 5.274l1.18-2.655 1.182 2.655H12.24zm4.876 1.796l-2.909-6.55v-.002a1.4 1.4 0 00-.363-.4c-.001 0-.004 0-.005-.003a.658.658 0 00-.118-.068l-.003-.001c-.005-.003-.007-.003-.01-.006a.748.748 0 00-.288-.062.751.751 0 00-.287.062l-.01.006-.002.001a.74.74 0 00-.12.068c0 .003-.002.003-.004.003-.163.119-.325.317-.36.4l-2.911 6.552a.857.857 0 00-.033.64.741.741 0 00.705.517.846.846 0 00.76-.52l.527-1.185h3.471l.526 1.184c.14.315.44.52.763.52.104 0 .204-.02.298-.062a.752.752 0 00.407-.454.867.867 0 00-.034-.64zm5.707-.157H19.37v-5.95c0-.473-.354-.856-.788-.856-.434 0-.786.383-.786.855v6.58h.007c.027.515.27.75.779.75h4.241c.363 0 .657-.31.657-.69 0-.379-.294-.69-.657-.69m7.274-.127l-2.516-3.173 1.933-1.963c.407-.411.492-.988.191-1.285a.641.641 0 00-.46-.175c-.28 0-.588.143-.821.382l-2.737 2.763v-2.286c0-.559-.386-1.015-.858-1.015-.474 0-.86.456-.86 1.015v6.272c0 .56.386 1.015.86 1.015.472 0 .858-.455.858-1.015V15.74l.754-.766 2.39 3.018c.21.264.512.424.806.424.167 0 .32-.052.441-.148a.74.74 0 00.266-.577 1.117 1.117 0 00-.247-.7" /></g></svg>;
  }

}