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
export default class SvgProfileDefault extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><path d="M.036 35.846l.044-.58c.854-9.19 8.431-16.43 17.766-16.755l.654-.011A9.25 9.25 0 019.581 6.788a1.188 1.188 0 011.113-.791 1.156 1.156 0 011.053 1.633l.005.001a6.937 6.937 0 103.524-4.526l-.404.23a1.13 1.13 0 01-.66.21 1.156 1.156 0 01-.404-2.24l-.011-.019a9.25 9.25 0 115.22 17.2l-.517.014c9.633 0 17.546 7.362 18.42 16.767l.025.302.014.102.006.174-.01-.001-.01.14a1.157 1.157 0 01-2.292-.138h-.006c-.592-8.402-7.595-15.033-16.147-15.033S2.945 27.444 2.353 35.844l-.007-.001-.016.191a1.157 1.157 0 01-2.294-.189z" fill="#FFF" /></svg>;
  }

}