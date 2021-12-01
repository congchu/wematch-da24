import React from "react";
import { render } from "react-dom";
import { MemorizedToast } from "./Toast";
import { Props } from "./types";

export const CONTAINER_CLASSNAME = "wematch-toastContainer";

export const showToast = (config: Props) => {
  const toastElement = document.createElement("div");
  toastElement.className = "wematch-toast";
  render(<MemorizedToast {...config} />, toastElement);
};
