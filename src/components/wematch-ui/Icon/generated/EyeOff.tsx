import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgEyeOff extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill="#161C1D" d="M14.743.757a.5.5 0 010 .707l-2.459 2.458c1.794.93 3.216 2.338 3.216 3.88 0 2.718-4.402 4.98-7.5 4.98-1.07 0-2.875-.346-3.743-.834L1.307 14.9a.5.5 0 11-.706-.707L5.295 9.5a3.869 3.869 0 01-.43-1.788c0-1.918 1.356-3.5 3.071-3.5.721 0 1.38.28 1.9.747l.691-.692C9.661 3.962 8.773 3.782 8 3.782c-2.575 0-6.5 2.038-6.5 4.02 0 .625.434 1.23 1.348 2.001l.203.168-.007.007a.499.499 0 11-.701.706l-.345-.293C1.003 9.515.5 8.75.5 7.803c0-2.714 4.445-5.02 7.5-5.02 1.027 0 2.202.255 3.313.697L14.036.757a.5.5 0 01.707 0zM11.527 4.68l-1.055 1.055a3.84 3.84 0 01.535 1.977c0 1.917-1.356 3.5-3.071 3.5-.792 0-1.508-.338-2.05-.89l-.889.886c.73.3 2.202.575 3.003.575 2.618 0 6.5-1.995 6.5-3.98 0-1.166-1.34-2.346-2.973-3.123zM9.735 6.472l-3.141 3.14c.364.375.835.599 1.342.599 1.125 0 2.071-1.104 2.071-2.5 0-.453-.1-.876-.272-1.24zM7.936 5.21c-1.125 0-2.071 1.103-2.071 2.5 0 .37.066.72.185 1.033l3.077-3.077a1.834 1.834 0 00-1.191-.456z" /></svg>
  }

}
