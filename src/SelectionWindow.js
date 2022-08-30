import React from "react"
import useSize from "@react-hook/size"
import styles from './SelectionWindow.module.css'

export function SelectionWindow({
  children,
  crop,
  onCropChange,
  className = undefined,
  width = undefined,
  height = undefined,
  mouseThreshold = 30,
  touchThreshold = 60 
}) {
  const [node, setNode] = React.useState(null)
  const selectionRef = React.useRef(null)
  const stateRef = React.useRef({ 
    dragging: false,
    pointers: new Map(),
    edges: []
  })
  const [containerWidth, containerHeight] = useSize(node)

  React.useEffect(
    () => {
      if (!crop && containerWidth && containerHeight) {
        onCropChange(updateSizes({
          left: containerWidth * 0.25,
          top: containerHeight * 0.25,
          right: containerWidth * 0.75,
          bottom: containerHeight * 0.75,
        }))
      }
    },
    [crop, containerWidth, containerHeight]
  )

  const touchMoveEvent = useEvent(handleTouchMove)
  const dragStartEvent = useEvent(handleDragStart)
  const dragEvent = useEvent(handleDrag)
  const dragEndEvent = useEvent(handleDragEnd)

  React.useEffect(
    () => {
      if (!node) return
      node.addEventListener('touchmove', touchMoveEvent)
      node.addEventListener('pointerdown', dragStartEvent)
      
      return () => {
        node.removeEventListener('touchmove', touchMoveEvent)
        node.removeEventListener('pointerdown', dragStartEvent)
      }
    },
    [node]
  )

  return (
    <div ref={setNode} className={cx(className, styles.component)} style={{ width: px(width), height: px(height) }}>
      <div
        ref={selectionRef}
        className={styles.selection}
        style={{
          position: "absolute",
          left: px(crop?.left ?? 0),
          top: px(crop?.top ?? 0),
          width: px((crop?.right ?? 0) - (crop?.left ?? 0)),
          height: px((crop?.bottom ?? 0) - (crop?.top ?? 0)),
        }}
        {...{ children }}
      />
    </div>
  )

  function handleDragStart(e) {
    e.preventDefault()
    
    const { x, y } = getXY(e)
    const threshold = e.pointerType === 'mouse' ? mouseThreshold : touchThreshold
    const pointerState = getPointerState({ x, y, threshold })
    
    stateRef.current.dragging = true
    stateRef.current.pointers.set(e.pointerId, pointerState)
    stateRef.current.edges = stateRef.current.edges.concat(pointerState.edges)

    window.addEventListener('pointermove', dragEvent, { passive: true })
    window.addEventListener('pointerup', dragEndEvent)
    window.addEventListener('pointercancel', dragEndEvent)
  }

  function handleTouchMove(e) {
    if (!stateRef.current.dragging) return
    e.preventDefault()
  }

  function handleDrag(e) {
    if (!stateRef.current.dragging) return
    
    const pointerState = stateRef.current.pointers.get(e.pointerId)
    const { x, y } = getXY(e)
    const threshold = e.pointerType === 'mouse' ? mouseThreshold : touchThreshold

    if (pointerState.edges.length) {
      transformSelection({ pointerState, x: x - pointerState.dx, y: y - pointerState.dy, threshold })
    } else if (stateRef.current.pointers.size === 1) {
      moveSelection({ dx: e.movementX, dy: e.movementY })
    } 
  }

  function handleDragEnd(e) {
    if (!stateRef.current.pointers.has(e.pointerId)) return // Drag already ended, multiple events can end dragging

    const { edges } = stateRef.current.pointers.get(e.pointerId)
    stateRef.current.edges = stateRef.current.edges.filter(x => !edges.includes(x))
    stateRef.current.pointers.delete(e.pointerId)
    stateRef.current.dragging = Boolean(stateRef.current.edges)

    window.removeEventListener('pointermove', dragEvent, { passive: true })
    window.removeEventListener('pointerup', dragEndEvent)
    window.removeEventListener('pointercancel', dragEndEvent)
  }

  function getXY(e) {
    const { clientX, clientY } = e
    const rect = node.getBoundingClientRect()
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }

  function getPointerState({ x, y, threshold }) {
    const edges = []
    const dl = x - crop.left
    const dr = x - crop.right
    const dt = y - crop.top
    const db = y - crop.bottom

    const adl = Math.abs(dl)
    const adr = Math.abs(dr)
    const adt = Math.abs(dt)
    const adb = Math.abs(db)

    if (adl <= adr && adl < threshold) edges.push("left")
    else if (adr <= adl && adr < threshold) edges.push("right")
    if (adt <= adb && adt < threshold) edges.push("top")
    else if (adb <= adt && adb < threshold) edges.push("bottom")

    return { 
      dx: edges.includes('left') ? dl : edges.includes('right') ? dr : 0, 
      dy: edges.includes('top') ? dt : edges.includes('bottom') ? db : 0, 
      edges: edges.filter(x => !stateRef.current.edges.includes(x))
    }
  }

  function transformSelection({ pointerState, x, y, threshold }) {
    const newCrop = { ...crop }

    if (pointerState.edges.includes("left")) {
      newCrop.left = Math.max(0, x)
      newCrop.right = Math.min(containerWidth, Math.max(crop.right, x + threshold));
    } else if (pointerState.edges.includes("right")) {
      newCrop.right = Math.min(containerWidth, x);
      newCrop.left = Math.max(0, Math.min(crop.left, x - threshold));
    }

    if (pointerState.edges.includes("top")) {
      newCrop.top = Math.max(0, y)
      newCrop.bottom = Math.min(containerHeight, Math.max(newCrop.bottom, y + threshold))
    } else if (pointerState.edges.includes("bottom")) {
      newCrop.bottom = Math.min(containerHeight, y)
      newCrop.top = Math.max(0, Math.min(crop.top, y - threshold))
    }

    onCropChange(updateSizes(newCrop))
  }

  function moveSelection({ dx, dy }) {
    const newCrop = { ...crop }
    const clampedDx = clamp(-crop.left, containerWidth - crop.right, dx)
    const clampedDy = clamp(-crop.top, containerHeight - crop.bottom, dy)
    
    newCrop.left += clampedDx
    newCrop.right += clampedDx
    newCrop.top += clampedDy
    newCrop.bottom += clampedDy

    onCropChange(updateSizes(newCrop))
  }

  function updateSizes({ left, right, top, bottom }) {
    return {
      left,
      right,
      top, 
      bottom,
      width: Math.min(right - left, containerWidth),
      height: Math.min(bottom - top, containerHeight),
      container: {
        width: containerWidth,
        height: containerHeight
      }
    }
  }
}

function px(n) {
  return (typeof n === 'number' || typeof n === 'string')
    ? n + "px"
    : n
}

function clamp(left, right, value) {
  const [min, max] = left < right ? [left, right] : [right, left]
  return Math.max(min, Math.min(max, value))
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function useEvent(fn) {
  const fnRef = React.useRef(null)
  fnRef.current = fn

  return React.useCallback((...args) => fnRef.current(...args), [])
}
