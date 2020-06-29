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
export default class SvgStarfill extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    color: black,
    width: 16,
    height: 16
  };

  public render() {
    return <svg width={this.props.width} height={this.props.height} style={this.props.style} className={this.props.className}><g fill="none" fillRule="evenodd"><path d="M70.535 11.245l-2.444 1.284a1 1 0 01-1.45-1.054l.466-2.72a1 1 0 00-.288-.886l-1.977-1.927a1 1 0 01.555-1.706l2.732-.396a1 1 0 00.753-.548L70.103.817a1 1 0 011.794 0l1.221 2.475a1 1 0 00.753.548l2.732.396a1 1 0 01.555 1.706L75.18 7.87a1 1 0 00-.288.885l.467 2.721a1 1 0 01-1.451 1.054l-2.444-1.284a1 1 0 00-.93 0z" fill="#D7DBE2" /><path d="M38.535 11.245l-2.444 1.284a1 1 0 01-1.45-1.054l.466-2.72a1 1 0 00-.288-.886l-1.977-1.927a1 1 0 01.555-1.706l2.732-.396a1 1 0 00.753-.548L38.103.817a1 1 0 011.794 0l1.221 2.475a1 1 0 00.753.548l2.732.396a1 1 0 01.555 1.706L43.18 7.87a1 1 0 00-.288.885l.467 2.721a1 1 0 01-1.451 1.054l-2.444-1.284a1 1 0 00-.93 0zm16 0l-2.444 1.284a1 1 0 01-1.45-1.054l.466-2.72a1 1 0 00-.288-.886l-1.977-1.927a1 1 0 01.555-1.706l2.732-.396a1 1 0 00.753-.548L54.103.817a1 1 0 011.794 0l1.221 2.475a1 1 0 00.753.548l2.732.396a1 1 0 01.555 1.706L59.18 7.87a1 1 0 00-.288.885l.467 2.721a1 1 0 01-1.451 1.054l-2.444-1.284a1 1 0 00-.93 0zm-32 0l-2.444 1.284a1 1 0 01-1.45-1.054l.466-2.72a1 1 0 00-.288-.886l-1.977-1.927a1 1 0 01.555-1.706l2.732-.396a1 1 0 00.753-.548L22.103.817a1 1 0 011.794 0l1.221 2.475a1 1 0 00.753.548l2.732.396a1 1 0 01.555 1.706L27.18 7.87a1 1 0 00-.288.885l.467 2.721a1 1 0 01-1.451 1.054l-2.444-1.284a1 1 0 00-.93 0zm-16 0L4.09 12.529a1 1 0 01-1.45-1.054l.466-2.72a1 1 0 00-.288-.886L.842 5.942a1 1 0 01.555-1.706l2.732-.396a1 1 0 00.753-.548L6.103.817a1 1 0 011.794 0l1.221 2.475a1 1 0 00.753.548l2.732.396a1 1 0 01.555 1.706L11.18 7.87a1 1 0 00-.288.885l.467 2.721a1 1 0 01-1.451 1.054l-2.444-1.284a1 1 0 00-.93 0zm64 0l-2.444 1.284a1 1 0 01-1.45-1.054l.466-2.72a1 1 0 00-.288-.886l-1.977-1.927a1 1 0 01.555-1.706l2.732-.396a1 1 0 00.753-.548L70.103.817a1 1 0 011.794 0l1.221 2.475a1 1 0 00.753.548l2.732.396a1 1 0 01.555 1.706L75.18 7.87a1 1 0 00-.288.885l.467 2.721a1 1 0 01-1.451 1.054l-2.444-1.284a1 1 0 00-.93 0z" fill="#1672F7" /></g></svg>;
  }

}