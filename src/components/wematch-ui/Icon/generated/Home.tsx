import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgHome extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} fillRule="evenodd" d="M11 9.5V14h3V6.5a.5.5 0 111 0v8a.5.5 0 01-.41.492L14.5 15h-13a.5.5 0 01-.5-.5v-8c0-.102.03-.197.083-.276a.563.563 0 01.187-.313L7.277.833a.634.634 0 01.12-.08.525.525 0 01.612-.058l.079.057 4.582 3.98a.457.457 0 010 .646.528.528 0 01-.634.084l-.083-.06L7.79 1.788 2 6.664V14h3V9.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5zm-1 .5H6v4h4v-4z" /></svg>
  }

}
