import React from "react";
import useSize from "@react-hook/size";
import image from "./image.jpg";
import * as styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <img className={styles.image} src={image} />
      <Selection />
    </div>
  );
}

Selection.THRESHOLD = 20;

function Selection() {
  const ref = React.useRef(null);
  const selectionRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const [containerWidth, containerHeight] = useSize(ref);
  const cropZoneRef = React.useRef(null);
  const [activeEdges, setActiveEdges] = React.useState([]);

  if (containerWidth && containerHeight && cropZoneRef.current === null) {
    cropZoneRef.current = {
      left: containerWidth * 0.25,
      top: containerHeight * 0.25,
      right: containerWidth * 0.75,
      bottom: containerHeight * 0.75
    };
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      ref={ref}
    >
      <div
        className={styles.selection}
        ref={selectionRef}
        style={{
          position: "absolute",
          left: px(cropZoneRef.current?.left ?? 0),
          top: px(cropZoneRef.current?.top ?? 0),
          width: px((cropZoneRef.current?.right ?? 0) - (cropZoneRef.current?.left ?? 0)),
          height: px((cropZoneRef.current?.bottom ?? 0) - (cropZoneRef.current?.top ?? 0)),
        }}
      />
    </div>
  );

  function handleTouchStart(e) {
    const { clientX: x, clientY: y } = e.touches[0];
    setActiveEdges(getEdges({ x, y }));
  }

  function handleTouchMove(e) {
    e.preventDefault();
    const { clientX: x, clientY: y } = e.touches[0];
    if (activeEdges.includes("left")) {
      cropZoneRef.current.left = x;
      cropZoneRef.current.right = Math.max(cropZoneRef.current.right, x + Selection.THRESHOLD);
    } else if (activeEdges.includes("right")) {
      cropZoneRef.current.right = x;
      cropZoneRef.current.left = Math.min(cropZoneRef.current.left, x - Selection.THRESHOLD);
    }

    if (activeEdges.includes("top")) {
      cropZoneRef.current.top = y;
      cropZoneRef.current.bottom = Math.max(cropZoneRef.current.bottom, y + Selection.THRESHOLD);
    } else if (activeEdges.includes("bottom")) {
      cropZoneRef.current.bottom = y;
      cropZoneRef.current.top = Math.min(cropZoneRef.current.top, y - Selection.THRESHOLD);
    }

    updateSelection();
  }

  function handleTouchEnd() {}

  function getEdges({ x, y }) {
    const edges = [];
    const dl = Math.abs(x - cropZoneRef.current.left);
    const dr = Math.abs(x - cropZoneRef.current.right);
    const dt = Math.abs(y - cropZoneRef.current.top);
    const db = Math.abs(y - cropZoneRef.current.bottom);
    if (dl <= dr && dl < Selection.THRESHOLD) edges.push("left");
    else if (dr <= dl && dr < Selection.THRESHOLD) edges.push("right");
    if (dt <= db && dt < Selection.THRESHOLD) edges.push("top");
    else if (db <= dt && db < Selection.THRESHOLD) edges.push("bottom");

    return edges;
  }

  function updateSelection() {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      Object.assign(selectionRef.current.style, {
        position: "absolute",
        left: px(cropZoneRef.current.left),
        top: px(cropZoneRef.current.top),
        width: px(cropZoneRef.current.right - cropZoneRef.current.left),
        height: px(cropZoneRef.current.bottom - cropZoneRef.current.top),
      });
    });
  }
}

function px(n) {
  return n + "px";
}
