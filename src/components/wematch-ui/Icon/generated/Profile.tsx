import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgProfile extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill={this.props.color} d="M.016 15.501l.019-.25a8.001 8.001 0 017.682-7.246L8 8a4 4 0 01-3.857-5.065.514.514 0 01.481-.342.5.5 0 01.456.706l.002.001a3 3 0 101.524-1.957l-.175.1a.5.5 0 11-.46-.878l-.005-.01a4 4 0 112.258 7.438L8 8a8 8 0 017.965 7.25l.011.131.006.045.003.075-.005-.001-.004.06a.5.5 0 01-.99-.06h-.004a7 7 0 00-13.964 0h-.004l-.007.083a.5.5 0 01-.991-.082z" /></svg>
  }

}
