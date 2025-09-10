"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const CardSwap = ({
  width = 300,
  height = 300,
  cardDistance = 40,
  verticalDistance = 60,
  delay = 3000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 3,
  easing = "elastic",
  children,
}) => {
  const config = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          },
    [easing]
  );

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  // Hitung slot hanya sekali
  const slots = useMemo(
    () =>
      Array.from({ length: childArr.length }, (_, i) =>
        makeSlot(i, cardDistance, verticalDistance, childArr.length)
      ),
    [childArr.length, cardDistance, verticalDistance]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.forEach((r, i) => {
        gsap.set(r.current, {
          ...slots[i],
          xPercent: -50,
          yPercent: -50,
          skewY: skewAmount,
          transformOrigin: "center center",
          force3D: true,
        });
      });

      const swap = () => {
        if (order.current.length < 2) return;
        const [front, ...rest] = order.current;
        const elFront = refs[front].current;
        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.to(elFront, {
          y: "+=500",
          duration: config.durDrop,
          ease: config.ease,
        });

        tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
        rest.forEach((idx, i) => {
          const el = refs[idx].current;
          const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
          tl.set(el, { zIndex: slot.zIndex }, "promote");
          tl.to(
            el,
            { ...slot, duration: config.durMove, ease: config.ease },
            `promote+=${i * 0.15}`
          );
        });

        const backSlot = makeSlot(
          refs.length - 1,
          cardDistance,
          verticalDistance,
          refs.length
        );
        tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
        tl.set(elFront, { ...backSlot, xPercent: -50, yPercent: -50 }, "return");
        tl.to(
          elFront,
          { y: backSlot.y, duration: config.durReturn, ease: config.ease },
          "return"
        );

        tl.call(() => {
          order.current = [...rest, front];
        });
      };

      swap();
      intervalRef.current = setInterval(swap, delay);
    }, container);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = setInterval(() => ctx.add(() => {}, 0), delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
        ctx.revert();
      };
    }

    return () => {
      clearInterval(intervalRef.current);
      ctx.revert();
    };
  }, [refs, slots, delay, pauseOnHover, skewAmount, config]);

  const rendered = useMemo(
    () =>
      childArr.map((child, i) =>
        isValidElement(child)
          ? cloneElement(child, {
              key: i,
              ref: refs[i],
              style: { width, height, ...(child.props.style ?? {}) },
              onClick: (e) => {
                child.props.onClick?.(e);
                onCardClick?.(i);
              },
            })
          : child
      ),
    [childArr, refs, width, height, onCardClick]
  );

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
