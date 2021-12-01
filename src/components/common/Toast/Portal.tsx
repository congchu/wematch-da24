import React from "react";
import ReactDOM, { createPortal } from "react-dom";
import { CONTAINER_CLASSNAME } from "./";

export default function ToastPortal({ children }: React.HTMLAttributes<HTMLDivElement>) {
  let container = document.querySelector(`.${CONTAINER_CLASSNAME}`);

  if (!container) {
    const containerDiv = document.createElement("div");
    containerDiv.className = CONTAINER_CLASSNAME;
    container = containerDiv;

    document.body.appendChild(container);
  }
  return createPortal(children, container);
}
