"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const StairsEffect = () => {
  const container = useRef(null);
  const activeTimeline = useRef(null);
  const destination = useRef(null);
  const isTransitioning = useRef(false);
  const isHistoryTransition = useRef(false);
  const routeHasChanged = useRef(false);
  const coverIsComplete = useRef(false);
  const revealRoute = useRef(null);
  const routeSnapshot = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useGSAP(
    () => {
      const stairs = gsap.utils.toArray(".stair");

      const removeRouteSnapshot = () => {
        routeSnapshot.current?.remove();
        routeSnapshot.current = null;
      };

      const preserveCurrentRoute = () => {
        removeRouteSnapshot();

        const currentPage = document.getElementById("route-page");

        if (!currentPage) {
          return;
        }

        const snapshot = document.createElement("div");
        const pageClone = currentPage.cloneNode(true);

        pageClone.removeAttribute("id");
        pageClone.style.transform = `translateY(-${window.scrollY}px)`;
        pageClone.style.width = "100%";

        snapshot.setAttribute("aria-hidden", "true");
        snapshot.style.position = "fixed";
        snapshot.style.inset = "0";
        snapshot.style.zIndex = "9998";
        snapshot.style.overflow = "hidden";
        snapshot.style.pointerEvents = "none";
        snapshot.style.background = "#111";
        snapshot.appendChild(pageClone);

        document.body.appendChild(snapshot);
        routeSnapshot.current = snapshot;
      };

      const reveal = () => {
        if (!isTransitioning.current) {
          return;
        }

        // The screen is fully covered here, so swap the frozen old route
        // for the new route before the stairs move away.
        removeRouteSnapshot();

        activeTimeline.current?.kill();
        activeTimeline.current = gsap
          .timeline({
            onComplete: () => {
              isTransitioning.current = false;
              isHistoryTransition.current = false;
              routeHasChanged.current = false;
              coverIsComplete.current = false;
              destination.current = null;
            },
          })
          .to(stairs, {
            yPercent: 100,
            duration: 0.2,
            stagger: {
              each: 0.05,
              from: "end",
            },
            ease: "power2.in",
          })
          .set(container.current, { display: "none" })
          .set(stairs, { scaleY: 0, yPercent: 0 });
      };

      const cover = (onComplete) => {
        activeTimeline.current?.kill();
        activeTimeline.current = gsap
          .timeline()
          .set(container.current, { display: "flex" })
          .set(stairs, {
            scaleY: 0,
            yPercent: 0,
            transformOrigin: "top",
          })
          .to(stairs, {
            scaleY: 1,
            duration: 0.2,
            stagger: {
              each: 0.05,
              from: "end",
            },
            ease: "power2.out",
            onComplete,
          });
      };

      revealRoute.current = reveal;

      const startTransition = (event) => {
        const href = event.detail?.href;

        if (!href || isTransitioning.current) {
          return;
        }

        isTransitioning.current = true;
        isHistoryTransition.current = false;
        destination.current = href;

        cover(() => router.push(href));
      };

      const startHistoryTransition = () => {
        if (isTransitioning.current) {
          return;
        }

        isTransitioning.current = true;
        isHistoryTransition.current = true;
        routeHasChanged.current = false;
        coverIsComplete.current = false;

        preserveCurrentRoute();

        cover(() => {
          coverIsComplete.current = true;

          if (routeHasChanged.current) {
            reveal();
          }
        });
      };

      window.addEventListener("route-transition", startTransition);
      window.addEventListener("popstate", startHistoryTransition);

      return () => {
        window.removeEventListener("route-transition", startTransition);
        window.removeEventListener("popstate", startHistoryTransition);
        activeTimeline.current?.kill();
        removeRouteSnapshot();
      };
    },
    { scope: container, dependencies: [router] }
  );

  useEffect(() => {
    if (!isTransitioning.current) {
      return;
    }

    if (isHistoryTransition.current) {
      routeHasChanged.current = true;

      if (coverIsComplete.current) {
        revealRoute.current?.();
      }

      return;
    }

    if (pathname === destination.current) {
      revealRoute.current?.();
    }
  }, [pathname]);

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] hidden"
    >
      <div className="stair h-full w-1/5 bg-black" />
      <div className="stair h-full w-1/5 bg-black" />
      <div className="stair h-full w-1/5 bg-black" />
      <div className="stair h-full w-1/5 bg-black" />
      <div className="stair h-full w-1/5 bg-black" />
    </div>
  );
};

export default StairsEffect;
