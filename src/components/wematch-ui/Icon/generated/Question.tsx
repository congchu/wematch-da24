import * as React from 'react'
import { black } from 'styles/colors'
interface IconProps {
  size?: number;
  color?: string;
  secondColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default class SvgQuestion extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    size: 16
  }

  public render() {
    return <svg width={this.props.size} height={this.props.size} style={this.props.style}
      className={this.props.className} viewBox="0 0 16 16"><path fill="#BCC0C6" d="M8 0a8 8 0 11-6.95 4.035.5.5 0 11.867.501l-.01.014a7 7 0 103.017-2.84.5.5 0 01-.548-.834l.07-.04-.001-.002A7.933 7.933 0 018 0zm.46 11.269v1h-1v-1h1zm-.489-7c.726 0 1.323.2 1.79.602.466.401.7.906.7 1.515 0 .304-.068.599-.204.885-.12.255-.388.574-.802.957l-.162.147c-.388.347-.632.62-.732.82-.1.2-.156.557-.167 1.074h-.909c0-.41.015-.71.045-.9.03-.189.092-.373.185-.554.093-.18.215-.35.365-.51.09-.095.201-.204.335-.328l.296-.265c.346-.308.562-.55.648-.724a1.2 1.2 0 00.13-.534c0-.37-.147-.697-.44-.978a1.483 1.483 0 00-1.067-.422c-.853 0-1.367.523-1.543 1.57l-.978-.106c.08-.718.343-1.272.787-1.663.444-.39 1.019-.586 1.723-.586z" /></svg>
  }

}
