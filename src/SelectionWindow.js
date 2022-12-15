import React from "react"
import useSize from "@react-hook/size"
import {createUseGesture, dragAction, pinchAction} from '@use-gesture/react'
import styles from './SelectionWindow.module.css'

export function SelectionWindow({
  children,
  onCropChange,
  className = undefined,
  width = undefined,
  height = undefined,
  mouseThreshold = 20,
  touchThreshold = 45 
}) {
  const [node, setNode] = React.useState(null)
  const selectionRef = React.useRef(null)
  const stateRef = React.useRef({ 
    crop: null,
    dragging: false,
    pointers: new Map(),
    edges: []
  })
  // const imgWrapper = document.getElementById('imageWrapper')
  const imgWrapperRef = React.useRef({cropWrapper: null})
  const [cropper, setCropper] = React.useState({scale: 1, x: 0, y: 0, zooming: false})
  const [containerWidth, containerHeight] = useSize(node)

  React.useEffect(
    () => {
      if (!crop && containerWidth && containerHeight) {
        handleCropChange({
          left: containerWidth * 0.25,
          top: containerHeight * 0.25,
          right: containerWidth * 0.75,
          bottom: containerHeight * 0.75,
        })
      }
    },
    [containerWidth, containerHeight]
  )

  const touchMoveEvent = useEvent(handleTouchMove)
  const dragStartEvent = useEvent(handleDragStart)
  const dragEvent = useEvent(handleDrag)
  const dragEndEvent = useEvent(handleDragEnd)

  const useGesture = createUseGesture([dragAction, pinchAction])

  // useDrag((touch) => {
  //   const imgWrapper = document.getElementById('imageWrapper')
  //   imgWrapper.style.top = cropper.y+'px'
  //   imgWrapper.style.left = cropper.x+'px'

  //   const nodeBounds = node.getBoundingClientRect()
  //   console.log(nodeBounds)
    
    // if(!stateRef.current.edges.length) {
    //   !cropper.zooming ? setCropper((crop) => ({
    //     ...crop,
    //     x: touch.offset[0],
    //     y: touch.offset[1]
    //   })) : null
    // }
  //   // console.log(cropper.x, cropper.y)
  // }, {target: selectionRef.current})

  useGesture({
    onDrag: ({offset: [dx, dy], cancel}) => {
      const imgWrapper = document.getElementById('imageWrapper')
      imgWrapper.style.top = cropper.y+'px'
      imgWrapper.style.left = cropper.x+'px'

      if(stateRef.current.edges.length) {
        console.log('edge')
        cancel()
      }

      if(!stateRef.current.edges.length) {
        !cropper.zooming ? setCropper((crop) => ({
          ...crop,
          x: dx,
          y: dy
        })) : null
      }
    },

    onDragEnd: (e) => {
      const newCrop = cropper
      const imgRect = imgWrapperRef.current.getBoundingClientRect()
      const cropperRect = selectionRef.current.getBoundingClientRect()
      if(cropperRect.left < imgRect.left) {
        newCrop.x = stateRef.current.crop.left
      } else if(cropperRect.right > imgRect.right) {
        newCrop.x = -(imgRect.width - cropperRect.width) - -cropperRect.width / 2
      }
      if(cropperRect.top < imgRect.top) {
        newCrop.y = stateRef.current.crop.top
      } else if(cropperRect.bottom > imgRect.bottom) {
        newCrop.y = -(imgRect.height - cropperRect.height) - -cropperRect.height / 2
      }
      setCropper(newCrop)
      imgWrapperRef.current.style.left = cropper.x+'px'
      imgWrapperRef.current.style.right = cropper.x+'px'
      imgWrapperRef.current.style.top = cropper.y+'px'
      imgWrapperRef.current.style.bottom = cropper.y+'px'
    },
  },
    {
      drag: {
        from: () => [cropper.x, cropper.y],
        // bounds: () => boundingClientRectRef.current.bounds < selectionRef.current.getBoundingClientRect()
      },
      target: selectionRef.current,
      eventOptions: {passive: false},
    })

  // usePinch((pinch) => {
  //   console.log(pinch)
  //   setCropper({zooming: true})
  //   const imageWrapper = document.getElementById('imageWrapper')
  //   imageWrapper.style.transform = `scale(${cropper.scale})`

  //   // pinch.memo = {bounds: node.getBoundingClientRect()}

  //   const nodeBounds = node.getBoundingClientRect()
  //   // console.log(nodeBounds)
  //   const nodeX = nodeBounds.x + nodeBounds.width / 2
  //   const nodeY = nodeBounds.y + nodeBounds.height / 2

  //   const zoomX = nodeX - pinch.origin[0]
  //   const zoomY = nodeY - pinch.origin[1]

  //   if(pinch.offset[0] >= 1 && !stateRef.current.edges.length) {
  //     setCropper((zoom) => ({
  //       ...zoom,
  //       scale: pinch.offset[0],
  //       // zoomDX: zoomX * pinch.offset[0] / 50,
  //       // zoomDY: zoomY * pinch.offset[0] / 50
  //     }))
  //     // console.log(cropZoom.zoomDX, cropZoom.zoomDY)
  //     // img.style.transformOrigin = `${cropZoom.zoomDX} ${cropZoom.zoomDY}`
  //   }
  //   if(pinch.last) setCropper({zooming: false})
  //   // return pinch.memo
  // }, {target: selectionRef.current})

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

  const crop = stateRef.current.crop
  // console.log(selectionRef)

  return (
    <div ref={setNode} className={cx(className, styles.component)} style={{ width: px(width), height: px(height) }}>
      <div
        // {...dragGesture()}
        ref={selectionRef}
        className={styles.selection}
        style={{
          position: "absolute",
          left: px(crop?.left ?? 0),
          top: px(crop?.top ?? 0),
          width: px((crop?.right ?? 0) - (crop?.left ?? 0)),
          height: px((crop?.bottom ?? 0) - (crop?.top ?? 0)),
          touchAction: 'none'
        }}
        {...{ children }}
      />
    </div>
  )

  function handleCropChange(crop) {
    stateRef.current.crop = updateSizes(crop)
    onCropChange(stateRef.current.crop)

    const imgWrapper = document.getElementById('imageWrapper')
    imgWrapperRef.current = imgWrapper
    // imgWrapperRef.current.cropWrapper = updateSizes(crop)
    // console.log(imgWrapperRef.current)
    Object.assign(
      selectionRef.current.style,
      {
        left: px(crop?.left ?? 0),
        top: px(crop?.top ?? 0),
        width: px((crop?.right ?? 0) - (crop?.left ?? 0)),
        height: px((crop?.bottom ?? 0) - (crop?.top ?? 0)),
      }
    )
  }

  function handleDragStart(e) {
    e.preventDefault()
    
    const { x, y } = getXY(e)
    const threshold = e.pointerType === 'mouse' ? mouseThreshold : touchThreshold
    const pointerState = getPointerState({ x, y, threshold })
    
    stateRef.current.dragging = true
    stateRef.current.pointers.set(e.pointerId, pointerState)
    stateRef.current.edges = stateRef.current.edges.concat(pointerState.edges)

    // window.addEventListener('pointermove', dragEvent, { passive: true })
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
      return
    } else if (!stateRef.current.edges.length && stateRef.current.pointers.size === 2) {
      return
    } else if (e.pointerId === 1) {
      // moveSelection({ dx: e.movementX, dy: e.movementY })
    }
  }

  function handleDragEnd(e) {
    if (!stateRef.current.pointers.has(e.pointerId)) return // Drag already ended, multiple events can end dragging

    const { edges } = stateRef.current.pointers.get(e.pointerId)
    stateRef.current.edges = stateRef.current.edges.filter(x => !edges.includes(x))
    stateRef.current.pointers.delete(e.pointerId)
    stateRef.current.dragging = Boolean(stateRef.current.pointers.size)

    if (!stateRef.current.dragging) {
      window.removeEventListener('pointermove', dragEvent, { passive: true })
      window.removeEventListener('pointerup', dragEndEvent)
      window.removeEventListener('pointercancel', dragEndEvent)
    }
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
    const crop = stateRef.current.crop
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
      x,
      y,
      dx: edges.includes('left') ? dl : edges.includes('right') ? dr : 0, 
      dy: edges.includes('top') ? dt : edges.includes('bottom') ? db : 0, 
      edges: edges.filter(x => !stateRef.current.edges.includes(x))
    }
  }

  function transformSelection({ pointerState, x, y, threshold }) {
    const crop = stateRef.current.crop
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

    handleCropChange(newCrop)
  }

  function moveSelection({ dx, dy }) {
    const crop = stateRef.current.crop
    const newCrop = { ...crop }

    // We cannot constrain edges without considering the other edges: the left 
    // edge may be well within the container while your move the right side 
    // out. We constrain the selection by making sure the delta x and y never
    // exceed the delta that would move any of the edges out of the container.
    const clampedDx = clamp(-crop.left, containerWidth - crop.right, dx)
    const clampedDy = clamp(-crop.top, containerHeight - crop.bottom, dy)

    // If an edge is being 'held', it won't be moved
    newCrop.left = stateRef.current.edges.includes('left') ? crop.left : crop.left + clampedDx
    newCrop.right = stateRef.current.edges.includes('right') ? crop.right : crop.right + clampedDx
    newCrop.top = stateRef.current.edges.includes('top') ? crop.top : crop.top + clampedDy
    newCrop.bottom = stateRef.current.edges.includes('bottom') ? crop.bottom : crop.bottom + clampedDy

    handleCropChange(newCrop)
  }

  function scaleSelection({ pointerState, dx, dy, threshold }) {
    const crop = stateRef.current.crop
    const newCrop = { ...crop }
    
    // New scale is calculated in reference to the distance to the other pointer on the screen
    const [otherPointer] = [...stateRef.current.pointers.values()].filter(x => x !== pointerState)

    const distanceBefore = Math.sqrt((pointerState.x - otherPointer.x) ** 2 + (pointerState.y - otherPointer.y) ** 2)
    const distanceAfter = Math.sqrt((pointerState.x + dx - otherPointer.x) ** 2 + (pointerState.y + dy - otherPointer.y) ** 2)
    
    // Change in scale
    const deltaScale = clamp(
      // Cannot be so small the window would become large than the threshold, rendering some corners inaccessible
      Math.max(threshold / containerWidth, threshold / containerHeight),
      // Cannot be so large the window would become larger than it's container
      Math.min(containerWidth / crop.width, containerHeight / crop.height),
      // The new scale
      distanceAfter / distanceBefore
    ) - 1

    // Since we know for sure the resulting crop cannot exceed the container 
    // size, we can simply an edge of the new crop rect without considering the
    // other edges
    newCrop.left = clamp(0, containerWidth - threshold, crop.left - crop.width * deltaScale * 0.5)
    newCrop.right = clamp(threshold, containerWidth, crop.right + crop.width * deltaScale * 0.5)
    newCrop.top = clamp(0, containerHeight - threshold, crop.top - crop.height * deltaScale * 0.5)
    newCrop.bottom = clamp(threshold, containerHeight, crop.bottom + crop.height * deltaScale * 0.5)

    handleCropChange(newCrop)
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

function lerp(a, b, n) {
  return (b - a) + a * n
}

function unlerp(a, b, n) {
  return (n - a) / (b - a)
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function useEvent(fn) {
  const fnRef = React.useRef(null)
  fnRef.current = fn

  return React.useCallback((...args) => fnRef.current(...args), [])
}
