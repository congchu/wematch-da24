import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgCheckCircleOn extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><g fill="none" fillRule="evenodd"><circle cx={8} cy={8} r={8}
        fill="#1672F7" fillRule="nonzero" /><path fill="#FFF" d="M12.006 4.856a.53.53 0 01.156.66l-.066.102-4.668 5.623-.042.044-.018.026a.453.453 0 01-.633.1l-.043-.035-2.649-2.473a.578.578 0 01-.072-.764.453.453 0 01.633-.1l.042.036 2.268 2.116 4.295-5.238a.58.58 0 01.797-.097z" /></g></svg>
  }

}
