import React from "react";
import useSize from "@react-hook/size";
import image from "./image.jpg";
import * as styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <img className={styles.image} src={image} />
      <Selection>
        <div className={[styles.handle, styles.topLeft].join(' ')} />
        <div className={[styles.handle, styles.topRight].join(' ')} />
        <div className={[styles.handle, styles.bottomLeft].join(' ')} />
        <div className={[styles.handle, styles.bottomRight].join(' ')} />
      </Selection>
    </div>
  );
}

Selection.MOUSE_THRESHOLD = 30;
Selection.TOUCH_THRESHOLD = 66;

function Selection({ children }) {
  const [node, setNode] = React.useState(null);
  const selectionRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const cropZoneRef = React.useRef(null);
  const stateRef = React.useRef({ 
    dragging: false,
    pointers: new Map(),
    edges: []
  })
  const [containerWidth, containerHeight] = useSize(node);

  if (containerWidth && containerHeight && cropZoneRef.current === null) {
    cropZoneRef.current = {
      left: containerWidth * 0.25,
      top: containerHeight * 0.25,
      right: containerWidth * 0.75,
      bottom: containerHeight * 0.75,
      containerWidth,
      containerHeight
    };
  }

  React.useEffect(
    () => {
      if (!node) return
      node.addEventListener('touchmove', handleTouchMove)
      node.addEventListener('pointerdown', handleDragStart)
      node.addEventListener('pointermove', handleDrag, { passive: true })
      node.addEventListener('pointerup', handleDragEnd)
      node.addEventListener('pointercancel', handleDragEnd)

      return () => {
        node.removeEventListener('touchmove', handleTouchMove)
        node.removeEventListener('pointerdown', handleDragStart)
        node.removeEventListener('pointermove', handleDrag, { passive: true })
        node.removeEventListener('pointerup', handleDragEnd)
        node.removeEventListener('pointercancel', handleDragEnd)
      }
    },
    [node]
  )

  return (
    <div ref={setNode} className={styles.window}>
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
        {...{ children }}
      />
    </div>
  );

  function handleDragStart(e) {
    e.preventDefault();

    const { clientX: x, clientY: y } = e
    const threshold = e.pointerType === 'mouse' ? Selection.MOUSE_THRESHOLD : Selection.TOUCH_THRESHOLD
    const pointerState = getPointerState({ x, y, threshold })
    
    stateRef.current.dragging = true
    stateRef.current.pointers.set(e.pointerId, pointerState)
    stateRef.current.edges = stateRef.current.edges.concat(pointerState.edges)
  }

  function handleTouchMove(e) {
    if (!stateRef.current.dragging) return
    e.preventDefault()
  }

  function handleDrag(e) {
    if (!stateRef.current.dragging) return
    
    const pointerState = stateRef.current.pointers.get(e.pointerId)
    const x = e.clientX - pointerState.dx
    const y = e.clientY - pointerState.dy
    const threshold = e.pointerType === 'mouse' ? Selection.MOUSE_THRESHOLD : Selection.TOUCH_THRESHOLD

    if (pointerState.edges.length) {
      transformSelection({ pointerState, x, y, threshold })
    } else if (stateRef.current.pointers.size === 1) {
      moveSelection({ dx: e.movementX, dy: e.movementY })
    }
    
    updateSelection();
  }

  function handleDragEnd(e) {
    if (!stateRef.current.pointers.has(e.pointerId)) return // Drag already ended, multiple events can end dragging

    const { edges } = stateRef.current.pointers.get(e.pointerId)
    stateRef.current.edges = stateRef.current.edges.filter(x => !edges.includes(x))
    stateRef.current.pointers.delete(e.pointerId)
    stateRef.current.dragging = false
  }

  function getPointerState({ x, y, threshold }) {
    const edges = [];
    const dl = x - cropZoneRef.current.left;
    const dr = x - cropZoneRef.current.right;
    const dt = y - cropZoneRef.current.top;
    const db = y - cropZoneRef.current.bottom;
    const adl = Math.abs(dl);
    const adr = Math.abs(dr);
    const adt = Math.abs(dt);
    const adb = Math.abs(db);

    if (adl <= adr && adl < threshold) edges.push("left");
    else if (adr <= adl && adr < threshold) edges.push("right");
    if (adt <= adb && adt < threshold) edges.push("top");
    else if (adb <= adt && adb < threshold) edges.push("bottom");

    return { 
      dx: edges.includes('left') ? dl : edges.includes('right') ? dr : 0, 
      dy: edges.includes('top') ? dt : edges.includes('bottom') ? db : 0, 
      edges: edges.filter(x => !stateRef.current.edges.includes(x))
    };
  }

  function transformSelection({ pointerState, x, y, threshold }) {
    if (pointerState.edges.includes("left")) {
      cropZoneRef.current.left = x;
      cropZoneRef.current.right = Math.max(cropZoneRef.current.right, x + threshold);
    } else if (pointerState.edges.includes("right")) {
      cropZoneRef.current.right = x;
      cropZoneRef.current.left = Math.min(cropZoneRef.current.left, x - threshold);
    }

    if (pointerState.edges.includes("top")) {
      cropZoneRef.current.top = y;
      cropZoneRef.current.bottom = Math.max(cropZoneRef.current.bottom, y + threshold);
    } else if (pointerState.edges.includes("bottom")) {
      cropZoneRef.current.bottom = y;
      cropZoneRef.current.top = Math.min(cropZoneRef.current.top, y - threshold);
    }
  }

  function moveSelection({ dx, dy }) {
    const clampedDx = clamp(-cropZoneRef.current.left, cropZoneRef.current.containerWidth - cropZoneRef.current.right, dx)
    const clampedDy = clamp(-cropZoneRef.current.top, cropZoneRef.current.containerHeight - cropZoneRef.current.bottom, dy)
    cropZoneRef.current.left += clampedDx
    cropZoneRef.current.right += clampedDx
    cropZoneRef.current.top += clampedDy
    cropZoneRef.current.bottom += clampedDy
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

function clamp(left, right, value) {
  const [min, max] = left < right ? [left, right] : [right, left]
  return Math.max(min, Math.min(max, value))
}
