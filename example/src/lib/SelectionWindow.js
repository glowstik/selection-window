import "./SelectionWindow.css";
import {jsx as $gYv1Q$jsx} from "react/jsx-runtime";
import $gYv1Q$react from "react";
import $gYv1Q$reacthooksize from "@react-hook/size";

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}



var $118eac5423b196c3$exports = {};

$parcel$export($118eac5423b196c3$exports, "selection", () => $118eac5423b196c3$export$7c69810f7b8835c9, (v) => $118eac5423b196c3$export$7c69810f7b8835c9 = v);
$parcel$export($118eac5423b196c3$exports, "component", () => $118eac5423b196c3$export$d8556a2a8f973135, (v) => $118eac5423b196c3$export$d8556a2a8f973135 = v);
var $118eac5423b196c3$export$7c69810f7b8835c9;
var $118eac5423b196c3$export$d8556a2a8f973135;
$118eac5423b196c3$export$7c69810f7b8835c9 = `wAMUBW_selection`;
$118eac5423b196c3$export$d8556a2a8f973135 = `wAMUBW_component`;


function $d6226421cd976098$export$c2644827bcb91f96({ children: children , crop: crop , onCropChange: onCropChange , className: className , mouseThreshold: mouseThreshold = 30 , touchThreshold: touchThreshold = 60  }) {
    const [node, setNode] = (0, $gYv1Q$react).useState(null);
    const selectionRef = (0, $gYv1Q$react).useRef(null);
    const stateRef = (0, $gYv1Q$react).useRef({
        dragging: false,
        pointers: new Map(),
        edges: []
    });
    const [containerWidth, containerHeight] = (0, $gYv1Q$reacthooksize)(node);
    (0, $gYv1Q$react).useEffect(()=>{
        if (!crop && containerWidth && containerHeight) onCropChange({
            left: containerWidth * 0.25,
            top: containerHeight * 0.25,
            right: containerWidth * 0.75,
            bottom: containerHeight * 0.75,
            width: containerWidth * 0.5,
            height: containerHeight * 0.5,
            container: {
                width: containerWidth,
                height: containerHeight
            }
        });
    }, [
        crop,
        containerWidth,
        containerHeight
    ]);
    const touchMoveEvent = $d6226421cd976098$var$useEvent(handleTouchMove);
    const dragStartEvent = $d6226421cd976098$var$useEvent(handleDragStart);
    const dragEvent = $d6226421cd976098$var$useEvent(handleDrag);
    const dragEndEvent = $d6226421cd976098$var$useEvent(handleDragEnd);
    (0, $gYv1Q$react).useEffect(()=>{
        if (!node) return;
        node.addEventListener("touchmove", touchMoveEvent);
        node.addEventListener("pointerdown", dragStartEvent);
        return ()=>{
            node.removeEventListener("touchmove", touchMoveEvent);
            node.removeEventListener("pointerdown", dragStartEvent);
        };
    }, [
        node
    ]);
    return /*#__PURE__*/ (0, $gYv1Q$jsx)("div", {
        ref: setNode,
        className: $d6226421cd976098$var$cx(className, (0, (/*@__PURE__*/$parcel$interopDefault($118eac5423b196c3$exports))).component),
        children: /*#__PURE__*/ (0, $gYv1Q$jsx)("div", {
            ref: selectionRef,
            className: (0, (/*@__PURE__*/$parcel$interopDefault($118eac5423b196c3$exports))).selection,
            style: {
                position: "absolute",
                left: $d6226421cd976098$var$px(crop?.left ?? 0),
                top: $d6226421cd976098$var$px(crop?.top ?? 0),
                width: $d6226421cd976098$var$px((crop?.right ?? 0) - (crop?.left ?? 0)),
                height: $d6226421cd976098$var$px((crop?.bottom ?? 0) - (crop?.top ?? 0))
            },
            children: children
        })
    });
    function handleDragStart(e) {
        e.preventDefault();
        const { x: x , y: y  } = getXY(e);
        const threshold = e.pointerType === "mouse" ? mouseThreshold : touchThreshold;
        const pointerState = getPointerState({
            x: x,
            y: y,
            threshold: threshold
        });
        stateRef.current.dragging = true;
        stateRef.current.pointers.set(e.pointerId, pointerState);
        stateRef.current.edges = stateRef.current.edges.concat(pointerState.edges);
        window.addEventListener("pointermove", dragEvent, {
            passive: true
        });
        window.addEventListener("pointerup", dragEndEvent);
        window.addEventListener("pointercancel", dragEndEvent);
    }
    function handleTouchMove(e) {
        if (!stateRef.current.dragging) return;
        e.preventDefault();
    }
    function handleDrag(e) {
        if (!stateRef.current.dragging) return;
        const pointerState = stateRef.current.pointers.get(e.pointerId);
        const { x: x , y: y  } = getXY(e);
        const threshold = e.pointerType === "mouse" ? mouseThreshold : touchThreshold;
        if (pointerState.edges.length) {
            transformSelection({
                pointerState: pointerState,
                x: x - pointerState.dx,
                y: y - pointerState.dy,
                threshold: threshold
            });
        } else if (stateRef.current.pointers.size === 1) {
            moveSelection({
                dx: e.movementX,
                dy: e.movementY
            });
        }
    }
    function handleDragEnd(e) {
        if (!stateRef.current.pointers.has(e.pointerId)) return; // Drag already ended, multiple events can end dragging
        const { edges: edges  } = stateRef.current.pointers.get(e.pointerId);
        stateRef.current.edges = stateRef.current.edges.filter((x)=>!edges.includes(x));
        stateRef.current.pointers.delete(e.pointerId);
        stateRef.current.dragging = Boolean(stateRef.current.edges);
        window.removeEventListener("pointermove", dragEvent, {
            passive: true
        });
        window.removeEventListener("pointerup", dragEndEvent);
        window.removeEventListener("pointercancel", dragEndEvent);
    }
    function getXY(e) {
        const { clientX: clientX , clientY: clientY  } = e;
        const rect = node.getBoundingClientRect();
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
    function getPointerState({ x: x , y: y , threshold: threshold  }) {
        const edges = [];
        const dl = x - crop.left;
        const dr = x - crop.right;
        const dt = y - crop.top;
        const db = y - crop.bottom;
        const adl = Math.abs(dl);
        const adr = Math.abs(dr);
        const adt = Math.abs(dt);
        const adb = Math.abs(db);
        if (adl <= adr && adl < threshold) edges.push("left");
        else if (adr <= adl && adr < threshold) edges.push("right");
        if (adt <= adb && adt < threshold) edges.push("top");
        else if (adb <= adt && adb < threshold) edges.push("bottom");
        return {
            dx: edges.includes("left") ? dl : edges.includes("right") ? dr : 0,
            dy: edges.includes("top") ? dt : edges.includes("bottom") ? db : 0,
            edges: edges.filter((x)=>!stateRef.current.edges.includes(x))
        };
    }
    function transformSelection({ pointerState: pointerState , x: x , y: y , threshold: threshold  }) {
        const newCrop = {
            ...crop
        };
        if (pointerState.edges.includes("left")) {
            newCrop.left = x;
            newCrop.right = Math.max(crop.right, x + threshold);
        } else if (pointerState.edges.includes("right")) {
            newCrop.right = x;
            newCrop.left = Math.min(crop.left, x - threshold);
        }
        if (pointerState.edges.includes("top")) {
            newCrop.top = y;
            newCrop.bottom = Math.max(newCrop.bottom, y + threshold);
        } else if (pointerState.edges.includes("bottom")) {
            newCrop.bottom = y;
            newCrop.top = Math.min(crop.top, y - threshold);
        }
        onCropChange({
            ...newCrop,
            width: newCrop.right - newCrop.left,
            height: newCrop.bottom - newCrop.top,
            container: {
                width: containerWidth,
                height: containerHeight
            }
        });
    }
    function moveSelection({ dx: dx , dy: dy  }) {
        const newCrop = {
            ...crop
        };
        const clampedDx = $d6226421cd976098$var$clamp(-crop.left, crop.containerWidth - crop.right, dx);
        const clampedDy = $d6226421cd976098$var$clamp(-crop.top, crop.containerHeight - crop.bottom, dy);
        newCrop.left += clampedDx;
        newCrop.right += clampedDx;
        newCrop.top += clampedDy;
        newCrop.bottom += clampedDy;
        onCropChange({
            ...newCrop,
            width: newCrop.right - newCrop.left,
            height: newCrop.bottom - newCrop.top,
            container: {
                width: containerWidth,
                height: containerHeight
            }
        });
    }
}
function $d6226421cd976098$var$px(n) {
    return n + "px";
}
function $d6226421cd976098$var$clamp(left, right, value) {
    const [min, max] = left < right ? [
        left,
        right
    ] : [
        right,
        left
    ];
    return Math.max(min, Math.min(max, value));
}
function $d6226421cd976098$var$cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function $d6226421cd976098$var$useEvent(fn) {
    const fnRef = (0, $gYv1Q$react).useRef(null);
    fnRef.current = fn;
    return (0, $gYv1Q$react).useCallback((...args)=>fnRef.current(...args), []);
}


export {$d6226421cd976098$export$c2644827bcb91f96 as SelectionWindow};
//# sourceMappingURL=SelectionWindow.js.map
