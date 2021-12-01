type ActionsType = {
  action: string;
  value?: string;
};

export const onMessageHandler = (actions: ActionsType) => {
  const userAgent = window.navigator.userAgent;
  const isWmApp = userAgent.indexOf("WmClientApp");

  if (isWmApp > 0) {
    const data = {
      action: actions.action,
      value: actions.value
    };

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    }
  }
};
