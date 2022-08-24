import "./main.css";
import {jsx as $2WDAj$jsx} from "react/jsx-runtime";
import $2WDAj$react from "react";
import $2WDAj$reacthooksize from "@react-hook/size";

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}



var $ee54bb37bacb2026$exports = {};

$parcel$export($ee54bb37bacb2026$exports, "selection", () => $ee54bb37bacb2026$export$7c69810f7b8835c9, (v) => $ee54bb37bacb2026$export$7c69810f7b8835c9 = v);
$parcel$export($ee54bb37bacb2026$exports, "component", () => $ee54bb37bacb2026$export$d8556a2a8f973135, (v) => $ee54bb37bacb2026$export$d8556a2a8f973135 = v);
var $ee54bb37bacb2026$export$7c69810f7b8835c9;
var $ee54bb37bacb2026$export$d8556a2a8f973135;
$ee54bb37bacb2026$export$7c69810f7b8835c9 = `wAMUBW_selection`;
$ee54bb37bacb2026$export$d8556a2a8f973135 = `wAMUBW_component`;


function $7c8ba892eba51f50$export$c2644827bcb91f96({ children: children , crop: crop , onCropChange: onCropChange , className: className , mouseThreshold: mouseThreshold = 30 , touchThreshold: touchThreshold = 60  }) {
    const [node, setNode] = (0, $2WDAj$react).useState(null);
    const selectionRef = (0, $2WDAj$react).useRef(null);
    const stateRef = (0, $2WDAj$react).useRef({
        dragging: false,
        pointers: new Map(),
        edges: []
    });
    const [containerWidth, containerHeight] = (0, $2WDAj$reacthooksize)(node);
    (0, $2WDAj$react).useEffect(()=>{
        if (!crop && containerWidth && containerHeight) onCropChange({
            left: containerWidth * 0.25,
            top: containerHeight * 0.25,
            right: containerWidth * 0.75,
            bottom: containerHeight * 0.75,
            containerWidth: containerWidth,
            containerHeight: containerHeight
        });
    }, [
        crop,
        containerWidth,
        containerHeight
    ]);
    const touchMoveEvent = $7c8ba892eba51f50$var$useEvent(handleTouchMove);
    const dragStartEvent = $7c8ba892eba51f50$var$useEvent(handleDragStart);
    const dragEvent = $7c8ba892eba51f50$var$useEvent(handleDrag);
    const dragEndEvent = $7c8ba892eba51f50$var$useEvent(handleDragEnd);
    (0, $2WDAj$react).useEffect(()=>{
        if (!node) return;
        node.addEventListener("touchmove", touchMoveEvent);
        node.addEventListener("pointerdown", dragStartEvent);
        node.addEventListener("pointerup", dragEndEvent);
        node.addEventListener("pointercancel", dragEndEvent);
        return ()=>{
            node.removeEventListener("touchmove", touchMoveEvent);
            node.removeEventListener("pointerdown", dragStartEvent);
            node.removeEventListener("pointerup", dragEndEvent);
            node.removeEventListener("pointercancel", dragEndEvent);
        };
    }, [
        node
    ]);
    return /*#__PURE__*/ (0, $2WDAj$jsx)("div", {
        ref: setNode,
        className: $7c8ba892eba51f50$var$cx(className, (0, (/*@__PURE__*/$parcel$interopDefault($ee54bb37bacb2026$exports))).component),
        children: /*#__PURE__*/ (0, $2WDAj$jsx)("div", {
            ref: selectionRef,
            className: (0, (/*@__PURE__*/$parcel$interopDefault($ee54bb37bacb2026$exports))).selection,
            style: {
                position: "absolute",
                left: $7c8ba892eba51f50$var$px(crop?.left ?? 0),
                top: $7c8ba892eba51f50$var$px(crop?.top ?? 0),
                width: $7c8ba892eba51f50$var$px((crop?.right ?? 0) - (crop?.left ?? 0)),
                height: $7c8ba892eba51f50$var$px((crop?.bottom ?? 0) - (crop?.top ?? 0))
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
        node.addEventListener("pointermove", dragEvent, {
            passive: true
        });
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
        node.removeEventListener("pointermove", dragEvent, {
            passive: true
        });
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
        newCrop.width = newCrop.right - newCrop.left;
        newCrop.height = newCrop.bottom - newCrop.top;
        onCropChange(newCrop);
    }
    function moveSelection({ dx: dx , dy: dy  }) {
        const newCrop = {
            ...crop
        };
        const clampedDx = $7c8ba892eba51f50$var$clamp(-crop.left, crop.containerWidth - crop.right, dx);
        const clampedDy = $7c8ba892eba51f50$var$clamp(-crop.top, crop.containerHeight - crop.bottom, dy);
        newCrop.left += clampedDx;
        newCrop.right += clampedDx;
        newCrop.top += clampedDy;
        newCrop.bottom += clampedDy;
        newCrop.width = newCrop.right - newCrop.left;
        newCrop.height = newCrop.bottom - newCrop.top;
        onCropChange(newCrop);
    }
}
function $7c8ba892eba51f50$var$px(n) {
    return n + "px";
}
function $7c8ba892eba51f50$var$clamp(left, right, value) {
    const [min, max] = left < right ? [
        left,
        right
    ] : [
        right,
        left
    ];
    return Math.max(min, Math.min(max, value));
}
function $7c8ba892eba51f50$var$cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function $7c8ba892eba51f50$var$useEvent(fn) {
    const fnRef = (0, $2WDAj$react).useRef(null);
    fnRef.current = fn;
    return (0, $2WDAj$react).useCallback((...args)=>fnRef.current(...args), []);
}


export {$7c8ba892eba51f50$export$c2644827bcb91f96 as SelectionWindow};
//# sourceMappingURL=module.js.map
