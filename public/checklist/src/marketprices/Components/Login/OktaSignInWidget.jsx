import React, { useEffect, useRef } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";

const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current) return false;

    const widget = new OktaSignIn({
      ...config,
      logo: "http://cdn.shopify.com/s/files/1/0344/6469/files/tuxedo_cat.png?v=1610750022",
    });

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, [config, onSuccess, onError]);

  return <div ref={widgetRef} />;
};
export default OktaSignInWidget;
