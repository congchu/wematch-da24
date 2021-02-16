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
export default class SvgDotInDot extends React.PureComponent<IconProps> {
    public static defaultProps: IconProps = {
        color: '#1672F7',
        width: 18,
        height: 18
    };

    public render() {
        return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}
                    viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill={this.props.color} fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.3 22.7C17.3751 22.7 22.3 17.7751 22.3 11.7C22.3 5.62487 17.3751 0.7 11.3 0.7C5.22487 0.7 0.3 5.62487 0.3 11.7C0.3 17.7751 5.22487 22.7 11.3 22.7ZM11.25 14.5C12.7688 14.5 14 13.2688 14 11.75C14 10.2312 12.7688 9 11.25 9C9.73122 9 8.5 10.2312 8.5 11.75C8.5 13.2688 9.73122 14.5 11.25 14.5Z"/></svg>;
    }


}