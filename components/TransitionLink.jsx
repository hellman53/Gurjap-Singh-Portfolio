"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TransitionLink = ({ href, onClick, children, ...props }) => {
  const pathname = usePathname();

  const handleClick = (event) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      pathname === href
    ) {
      return;
    }

    event.preventDefault();

    window.dispatchEvent(
      new CustomEvent("route-transition", {
        detail: { href },
      })
    );
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
