import "./index.css";
import {jsx as $5lWPo$jsx, jsxs as $5lWPo$jsxs} from "react/jsx-runtime";
import $5lWPo$react, {StrictMode as $5lWPo$StrictMode} from "react";
import {createRoot as $5lWPo$createRoot} from "react-dom/client";
import $5lWPo$reacthooksize from "@react-hook/size";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire7812"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire7812"] = parcelRequire;
}
parcelRequire.register("htY9X", function(module, exports) {

$parcel$export(module.exports, "getBundleURL", () => $cba3cf862cf01d96$export$bdfd709ae4826697, (v) => $cba3cf862cf01d96$export$bdfd709ae4826697 = v);
var $cba3cf862cf01d96$export$bdfd709ae4826697;
var $cba3cf862cf01d96$export$c9e73fbda7da57b6;
var $cba3cf862cf01d96$export$5a759dc7a1cfb72a;
"use strict";
var $cba3cf862cf01d96$var$bundleURL = {};
function $cba3cf862cf01d96$var$getBundleURLCached(id) {
    var value = $cba3cf862cf01d96$var$bundleURL[id];
    if (!value) {
        value = $cba3cf862cf01d96$var$getBundleURL();
        $cba3cf862cf01d96$var$bundleURL[id] = value;
    }
    return value;
}
function $cba3cf862cf01d96$var$getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return $cba3cf862cf01d96$var$getBaseURL(matches[2]);
    }
    return "/";
}
function $cba3cf862cf01d96$var$getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function $cba3cf862cf01d96$var$getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
$cba3cf862cf01d96$export$bdfd709ae4826697 = $cba3cf862cf01d96$var$getBundleURLCached;
$cba3cf862cf01d96$export$c9e73fbda7da57b6 = $cba3cf862cf01d96$var$getBaseURL;
$cba3cf862cf01d96$export$5a759dc7a1cfb72a = $cba3cf862cf01d96$var$getOrigin;

});






var $e32f6d5828c5704a$exports = {};

$e32f6d5828c5704a$exports = (parcelRequire("htY9X")).getBundleURL("5lWPo") + "image.54ab6162.jpg";


var $2168708eeba8338e$export$5909307a9e24921b;
var $2168708eeba8338e$export$310433d43d4a6657;
var $2168708eeba8338e$export$b36ce604e2cd7590;
var $2168708eeba8338e$export$eff07f92f1a4dad9;
var $2168708eeba8338e$export$29be874c1daba180;
var $2168708eeba8338e$export$729c8b7179294ba;
var $2168708eeba8338e$export$5c452ff88e35e47d;
var $2168708eeba8338e$export$8291e5b88f90ce4;
var $2168708eeba8338e$export$7c69810f7b8835c9;
var $2168708eeba8338e$export$8f34ce051745d39e;
$2168708eeba8338e$export$5909307a9e24921b = `gPMrEW_bottomLeft`;
$2168708eeba8338e$export$310433d43d4a6657 = `gPMrEW_bottomRight`;
$2168708eeba8338e$export$b36ce604e2cd7590 = `gPMrEW_topLeft`;
$2168708eeba8338e$export$eff07f92f1a4dad9 = `gPMrEW_topRight`;
$2168708eeba8338e$export$29be874c1daba180 = `gPMrEW_strict`;
$2168708eeba8338e$export$729c8b7179294ba = `gPMrEW_app`;
$2168708eeba8338e$export$5c452ff88e35e47d = `gPMrEW_image`;
$2168708eeba8338e$export$8291e5b88f90ce4 = `gPMrEW_window`;
$2168708eeba8338e$export$7c69810f7b8835c9 = `gPMrEW_selection`;
$2168708eeba8338e$export$8f34ce051745d39e = `gPMrEW_handle`;





var $118eac5423b196c3$exports = {};

$parcel$export($118eac5423b196c3$exports, "selection", () => $118eac5423b196c3$export$7c69810f7b8835c9, (v) => $118eac5423b196c3$export$7c69810f7b8835c9 = v);
$parcel$export($118eac5423b196c3$exports, "component", () => $118eac5423b196c3$export$d8556a2a8f973135, (v) => $118eac5423b196c3$export$d8556a2a8f973135 = v);
var $118eac5423b196c3$export$7c69810f7b8835c9;
var $118eac5423b196c3$export$d8556a2a8f973135;
$118eac5423b196c3$export$7c69810f7b8835c9 = `wAMUBW_selection`;
$118eac5423b196c3$export$d8556a2a8f973135 = `wAMUBW_component`;


function $d6226421cd976098$export$c2644827bcb91f96({ children: children , className: className , mouseThreshold: mouseThreshold = 30 , touchThreshold: touchThreshold = 60  }) {
    const [node, setNode] = (0, $5lWPo$react).useState(null);
    const selectionRef = (0, $5lWPo$react).useRef(null);
    const frameRef = (0, $5lWPo$react).useRef(null);
    const cropZoneRef = (0, $5lWPo$react).useRef(null);
    const stateRef = (0, $5lWPo$react).useRef({
        dragging: false,
        pointers: new Map(),
        edges: []
    });
    const [containerWidth, containerHeight] = (0, $5lWPo$reacthooksize)(node);
    if (containerWidth && containerHeight && cropZoneRef.current === null) cropZoneRef.current = {
        left: containerWidth * 0.25,
        top: containerHeight * 0.25,
        right: containerWidth * 0.75,
        bottom: containerHeight * 0.75,
        containerWidth: containerWidth,
        containerHeight: containerHeight
    };
    (0, $5lWPo$react).useEffect(()=>{
        if (!node) return;
        node.addEventListener("touchmove", handleTouchMove);
        node.addEventListener("pointerdown", handleDragStart);
        node.addEventListener("pointermove", handleDrag, {
            passive: true
        });
        node.addEventListener("pointerup", handleDragEnd);
        node.addEventListener("pointercancel", handleDragEnd);
        return ()=>{
            node.removeEventListener("touchmove", handleTouchMove);
            node.removeEventListener("pointerdown", handleDragStart);
            node.removeEventListener("pointermove", handleDrag, {
                passive: true
            });
            node.removeEventListener("pointerup", handleDragEnd);
            node.removeEventListener("pointercancel", handleDragEnd);
        };
    }, [
        node
    ]);
    return /*#__PURE__*/ (0, $5lWPo$jsx)("div", {
        ref: setNode,
        className: $d6226421cd976098$var$cx(className, (0, (/*@__PURE__*/$parcel$interopDefault($118eac5423b196c3$exports))).component),
        children: /*#__PURE__*/ (0, $5lWPo$jsx)("div", {
            ref: selectionRef,
            className: (0, (/*@__PURE__*/$parcel$interopDefault($118eac5423b196c3$exports))).selection,
            style: {
                position: "absolute",
                left: $d6226421cd976098$var$px(cropZoneRef.current?.left ?? 0),
                top: $d6226421cd976098$var$px(cropZoneRef.current?.top ?? 0),
                width: $d6226421cd976098$var$px((cropZoneRef.current?.right ?? 0) - (cropZoneRef.current?.left ?? 0)),
                height: $d6226421cd976098$var$px((cropZoneRef.current?.bottom ?? 0) - (cropZoneRef.current?.top ?? 0))
            },
            children: children
        })
    });
    function handleDragStart(e) {
        e.preventDefault();
        const { clientX: x , clientY: y  } = e;
        const threshold = e.pointerType === "mouse" ? mouseThreshold : touchThreshold;
        const pointerState = getPointerState({
            x: x,
            y: y,
            threshold: threshold
        });
        stateRef.current.dragging = true;
        stateRef.current.pointers.set(e.pointerId, pointerState);
        stateRef.current.edges = stateRef.current.edges.concat(pointerState.edges);
    }
    function handleTouchMove(e) {
        if (!stateRef.current.dragging) return;
        e.preventDefault();
    }
    function handleDrag(e) {
        if (!stateRef.current.dragging) return;
        const pointerState = stateRef.current.pointers.get(e.pointerId);
        const x = e.clientX - pointerState.dx;
        const y = e.clientY - pointerState.dy;
        const threshold = e.pointerType === "mouse" ? mouseThreshold : touchThreshold;
        if (pointerState.edges.length) {
            transformSelection({
                pointerState: pointerState,
                x: x,
                y: y,
                threshold: threshold
            });
        } else if (stateRef.current.pointers.size === 1) {
            moveSelection({
                dx: e.movementX,
                dy: e.movementY
            });
        }
        updateSelection();
    }
    function handleDragEnd(e) {
        if (!stateRef.current.pointers.has(e.pointerId)) return; // Drag already ended, multiple events can end dragging
        const { edges: edges  } = stateRef.current.pointers.get(e.pointerId);
        stateRef.current.edges = stateRef.current.edges.filter((x)=>!edges.includes(x));
        stateRef.current.pointers.delete(e.pointerId);
        stateRef.current.dragging = false;
    }
    function getPointerState({ x: x , y: y , threshold: threshold  }) {
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
            dx: edges.includes("left") ? dl : edges.includes("right") ? dr : 0,
            dy: edges.includes("top") ? dt : edges.includes("bottom") ? db : 0,
            edges: edges.filter((x)=>!stateRef.current.edges.includes(x))
        };
    }
    function transformSelection({ pointerState: pointerState , x: x , y: y , threshold: threshold  }) {
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
    function moveSelection({ dx: dx , dy: dy  }) {
        const clampedDx = $d6226421cd976098$var$clamp(-cropZoneRef.current.left, cropZoneRef.current.containerWidth - cropZoneRef.current.right, dx);
        const clampedDy = $d6226421cd976098$var$clamp(-cropZoneRef.current.top, cropZoneRef.current.containerHeight - cropZoneRef.current.bottom, dy);
        cropZoneRef.current.left += clampedDx;
        cropZoneRef.current.right += clampedDx;
        cropZoneRef.current.top += clampedDy;
        cropZoneRef.current.bottom += clampedDy;
    }
    function updateSelection() {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(()=>{
            Object.assign(selectionRef.current.style, {
                position: "absolute",
                left: $d6226421cd976098$var$px(cropZoneRef.current.left),
                top: $d6226421cd976098$var$px(cropZoneRef.current.top),
                width: $d6226421cd976098$var$px(cropZoneRef.current.right - cropZoneRef.current.left),
                height: $d6226421cd976098$var$px(cropZoneRef.current.bottom - cropZoneRef.current.top)
            });
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


function $4af25f5e4c2c4eb9$export$2e2bcd8739ae039() {
    return /*#__PURE__*/ (0, $5lWPo$jsxs)("div", {
        className: $2168708eeba8338e$export$729c8b7179294ba,
        children: [
            /*#__PURE__*/ (0, $5lWPo$jsx)("img", {
                className: $2168708eeba8338e$export$5c452ff88e35e47d,
                src: (0, (/*@__PURE__*/$parcel$interopDefault($e32f6d5828c5704a$exports)))
            }),
            /*#__PURE__*/ (0, $5lWPo$jsx)((0, $d6226421cd976098$export$c2644827bcb91f96), {
                className: $2168708eeba8338e$export$8291e5b88f90ce4,
                children: /*#__PURE__*/ (0, $5lWPo$jsxs)("div", {
                    className: $2168708eeba8338e$export$7c69810f7b8835c9,
                    children: [
                        /*#__PURE__*/ (0, $5lWPo$jsx)("div", {
                            className: [
                                $2168708eeba8338e$export$8f34ce051745d39e,
                                $2168708eeba8338e$export$b36ce604e2cd7590
                            ].join(" ")
                        }),
                        /*#__PURE__*/ (0, $5lWPo$jsx)("div", {
                            className: [
                                $2168708eeba8338e$export$8f34ce051745d39e,
                                $2168708eeba8338e$export$eff07f92f1a4dad9
                            ].join(" ")
                        }),
                        /*#__PURE__*/ (0, $5lWPo$jsx)("div", {
                            className: [
                                $2168708eeba8338e$export$8f34ce051745d39e,
                                $2168708eeba8338e$export$5909307a9e24921b
                            ].join(" ")
                        }),
                        /*#__PURE__*/ (0, $5lWPo$jsx)("div", {
                            className: [
                                $2168708eeba8338e$export$8f34ce051745d39e,
                                $2168708eeba8338e$export$310433d43d4a6657
                            ].join(" ")
                        })
                    ]
                })
            })
        ]
    });
}


const $1b2c2cb80b0706f5$var$rootElement = document.getElementById("root");
const $1b2c2cb80b0706f5$var$root = (0, $5lWPo$createRoot)($1b2c2cb80b0706f5$var$rootElement);
$1b2c2cb80b0706f5$var$root.render(/*#__PURE__*/ (0, $5lWPo$jsx)((0, $5lWPo$StrictMode), {
    children: /*#__PURE__*/ (0, $5lWPo$jsx)((0, $4af25f5e4c2c4eb9$export$2e2bcd8739ae039), {})
}));


//# sourceMappingURL=index.js.map
