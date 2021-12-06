import React from "react";
import { WM_USER_AGENT } from "constants/env";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const BlankLink: React.FC<Props> = (props) => {
  const { children, href, ...restProps } = props;

  const handleClick = React.useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const userAgent = window.navigator.userAgent;
    const isApp = userAgent.indexOf(WM_USER_AGENT);
    if (isApp > 0) {
      const data = {
        action: "app",
        value: href
      };
      try {
        // @ts-ignore
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      } catch {
        window.open(href, "_blank");
      }
    } else {
      window.open(href, "_blank");
    }
  }, []);

  return (
    <a href={href} {...restProps} onClick={handleClick}>
      {children}
    </a>
  );
};

export default BlankLink;
