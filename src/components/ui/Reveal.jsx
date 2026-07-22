import { useRef } from "react";
import { useInViewOnce } from "../../hooks/index";

export default function Reveal({ as: Tag = "div", dir, delay = 0, className = "", style = {}, children, ...props }) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);
  const dirClass = dir === "l" ? " rv-l" : dir === "r" ? " rv-r" : "";

  return (
    <Tag
      ref={ref}
      className={`rv${dirClass}${inView ? " in" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--rv-d": `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}