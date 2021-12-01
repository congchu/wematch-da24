import { LOCAL_ENV } from "constants/env";

export function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, options: any = {}) {
  options = {
    path: "/",
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  const DELETE_COOKIE_OPTION = LOCAL_ENV === "DEV" ? { "max-age": -1 } : { "max-age": -1, domain: ".wematch.com" };

  setCookie(name, "", DELETE_COOKIE_OPTION);
}
