import React from "react";
import image from "./image.jpg";
import "./styles.css";
import useSize from "@react-hook/size";

export default function App() {
  return (
    <div className="Window">
      <img className="Image" src={image} />
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
      x: containerWidth * 0.25,
      y: containerHeight * 0.25,
      width: containerWidth * 0.5,
      height: containerHeight * 0.5
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
        className="Selection"
        ref={selectionRef}
        style={{
          position: "absolute",
          left: px(cropZoneRef.current?.x ?? 0),
          top: px(cropZoneRef.current?.y ?? 0),
          width: px(cropZoneRef.current?.width ?? 0),
          height: px(cropZoneRef.current?.height ?? 0)
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
      cropZoneRef.current.width += cropZoneRef.current.x - x;
      cropZoneRef.current.x = x;
    } else if (activeEdges.includes("right")) {
      cropZoneRef.current.width = x - cropZoneRef.current.x;
    }

    if (activeEdges.includes("top")) {
      cropZoneRef.current.height += cropZoneRef.current.y - y;
      cropZoneRef.current.y = y;
    } else if (activeEdges.includes("bottom")) {
      cropZoneRef.current.height = y - cropZoneRef.current.y;
    }

    updateSelection();
  }

  function handleTouchEnd() {}

  function getEdges({ x, y }) {
    const edges = [];
    const dl = Math.abs(x - cropZoneRef.current.x);
    const dr = Math.abs(x - cropZoneRef.current.x - cropZoneRef.current.width);
    const dt = Math.abs(y - cropZoneRef.current.y);
    const db = Math.abs(y - cropZoneRef.current.y - cropZoneRef.current.height);
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
        left: px(cropZoneRef.current.x),
        top: px(cropZoneRef.current.y),
        width: px(cropZoneRef.current.width),
        height: px(cropZoneRef.current.height)
      });
    });
  }
}

function px(n) {
  return n + "px";
}
