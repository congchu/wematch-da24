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
        width: 25,
        height: 25
    };

    public render() {
        return <svg width={this.props.width} height={this.props.height} style={this.props.style}
                    className={this.props.className}
                    viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill={this.props.color} fill-rule="evenodd" clip-rule="evenodd"
                      d="M12.3 24.7C18.9274 24.7 24.3 19.3274 24.3 12.7C24.3 6.07258 18.9274 0.7 12.3 0.7C5.67258 0.7 0.3 6.07258 0.3 12.7C0.3 19.3274 5.67258 24.7 12.3 24.7ZM12.2455 15.7545C13.9023 15.7545 15.2455 14.4114 15.2455 12.7545C15.2455 11.0977 13.9023 9.75455 12.2455 9.75455C10.5886 9.75455 9.24546 11.0977 9.24546 12.7545C9.24546 14.4114 10.5886 15.7545 12.2455 15.7545Z"/>
                </svg>;
    }



}