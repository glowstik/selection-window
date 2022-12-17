require("./main.css");
var $dSH8u$reactjsxruntime = require("react/jsx-runtime");
var $dSH8u$react = require("react");
var $dSH8u$reacthooksize = require("@react-hook/size");
var $dSH8u$usegesturereact = require("@use-gesture/react");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "SelectionWindow", () => $0d16028b28e5283f$export$c2644827bcb91f96);
$parcel$export(module.exports, "default", () => $0d16028b28e5283f$export$2e2bcd8739ae039);




var $5d4abfe7f70a3dcc$exports = {};

$parcel$export($5d4abfe7f70a3dcc$exports, "selection", () => $5d4abfe7f70a3dcc$export$7c69810f7b8835c9, (v) => $5d4abfe7f70a3dcc$export$7c69810f7b8835c9 = v);
$parcel$export($5d4abfe7f70a3dcc$exports, "component", () => $5d4abfe7f70a3dcc$export$d8556a2a8f973135, (v) => $5d4abfe7f70a3dcc$export$d8556a2a8f973135 = v);
var $5d4abfe7f70a3dcc$export$7c69810f7b8835c9;
var $5d4abfe7f70a3dcc$export$d8556a2a8f973135;
$5d4abfe7f70a3dcc$export$7c69810f7b8835c9 = `wAMUBW_selection`;
$5d4abfe7f70a3dcc$export$d8556a2a8f973135 = `wAMUBW_component`;


function $0d16028b28e5283f$export$c2644827bcb91f96({ children: children , onCropChange: onCropChange , className: className , width: width , height: height , mouseThreshold: mouseThreshold = 20 , touchThreshold: touchThreshold = 45 ,  }) {
    const [node, setNode] = (0, ($parcel$interopDefault($dSH8u$react))).useState(null);
    const selectionRef = (0, ($parcel$interopDefault($dSH8u$react))).useRef(null);
    const stateRef = (0, ($parcel$interopDefault($dSH8u$react))).useRef({
        crop: null,
        dragging: false,
        pointers: new Map(),
        edges: []
    });
    const imgWrapperRef1 = (0, ($parcel$interopDefault($dSH8u$react))).useRef();
    const [cropper, setCropper] = (0, ($parcel$interopDefault($dSH8u$react))).useState({
        scale: 1,
        x: 0,
        y: 0
    });
    const [zooming, setZooming] = (0, ($parcel$interopDefault($dSH8u$react))).useState(false);
    const [containerWidth, containerHeight] = (0, ($parcel$interopDefault($dSH8u$reacthooksize)))(node);
    (0, ($parcel$interopDefault($dSH8u$react))).useEffect(()=>{
        if (!crop && containerWidth && containerHeight) handleCropChange({
            left: containerWidth * 0.25,
            top: containerHeight * 0.25,
            right: containerWidth * 0.75,
            bottom: containerHeight * 0.75
        });
    }, [
        containerWidth,
        containerHeight
    ]);
    const touchMoveEvent = $0d16028b28e5283f$var$useEvent(handleTouchMove);
    const dragStartEvent = $0d16028b28e5283f$var$useEvent(handleDragStart);
    const dragEvent = $0d16028b28e5283f$var$useEvent(handleDrag);
    const dragEndEvent = $0d16028b28e5283f$var$useEvent(handleDragEnd);
    const useGesture = (0, $dSH8u$usegesturereact.createUseGesture)([
        (0, $dSH8u$usegesturereact.dragAction),
        (0, $dSH8u$usegesturereact.pinchAction)
    ]);
    useGesture({
        onDrag: ({ offset: [dx, dy]  })=>{
            imgWrapperRef1.current.style.top = $0d16028b28e5283f$var$px(cropper.y);
            imgWrapperRef1.current.style.left = $0d16028b28e5283f$var$px(cropper.x);
            if (!stateRef.current.edges.length) !zooming && setCropper((crop)=>({
                    ...crop,
                    x: dx,
                    y: dy
                }));
        },
        onDragEnd: adjustImage,
        onPinch: ({ offset: [d] , memo: memo , origin: [originX, originY]  })=>{
            memo ??= {
                bounds: selectionRef.current.getBoundingClientRect(),
                cropper: cropper
            };
            setZooming(true);
            imgWrapperRef1.current.style.transform = `scale(${cropper.scale})`;
            imgWrapperRef1.current.style.top = $0d16028b28e5283f$var$px(cropper.y);
            imgWrapperRef1.current.style.left = $0d16028b28e5283f$var$px(cropper.x);
            const imgOriginX = memo.bounds.x + memo.bounds.width / 2;
            const imgOriginY = memo.bounds.y + memo.bounds.height / 2;
            const displacementX = (imgOriginX - originX) / memo.cropper.scale;
            const displacementY = (imgOriginY - originY) / memo.cropper.scale;
            if (!stateRef.current.edges.length) setCropper((zoom)=>({
                    ...zoom,
                    scale: 1 + d / 50 * 2,
                    x: memo.cropper.x + displacementX * d / 50 * 2,
                    y: memo.cropper.y + displacementY * d / 50 * 2
                }));
            return memo;
        },
        onPinchEnd: adjustImage
    }, {
        drag: {
            from: ()=>[
                    cropper.x,
                    cropper.y
                ]
        },
        pinch: {
            scaleBounds: {
                min: 1
            }
        },
        target: selectionRef.current,
        eventOptions: {
            passive: false
        }
    });
    function adjustImage() {
        setZooming(false);
        const newCrop = cropper;
        const imgRect = imgWrapperRef1.current.getBoundingClientRect();
        const cropperRect = selectionRef.current.getBoundingClientRect();
        const originalWidth = imgWrapperRef1.current.clientWidth;
        const widthOverhang = (imgRect.width - originalWidth) / 2;
        if (cropperRect.left < imgRect.left) newCrop.x = widthOverhang + stateRef.current.crop.left;
        else if (cropperRect.right > imgRect.right) newCrop.x = -(imgRect.width - cropperRect.width / 2) + widthOverhang - -cropperRect.width;
        if (cropperRect.top < imgRect.top) newCrop.y = widthOverhang + stateRef.current.crop.top;
        else if (cropperRect.bottom > imgRect.bottom) newCrop.y = -(imgRect.height - cropperRect.height / 2) + widthOverhang - -cropperRect.height;
        setCropper(newCrop);
        imgWrapperRef1.current.style.left = $0d16028b28e5283f$var$px(cropper.x);
        imgWrapperRef1.current.style.right = $0d16028b28e5283f$var$px(cropper.x);
        imgWrapperRef1.current.style.top = $0d16028b28e5283f$var$px(cropper.y);
        imgWrapperRef1.current.style.bottom = $0d16028b28e5283f$var$px(cropper.y);
    }
    (0, ($parcel$interopDefault($dSH8u$react))).useEffect(()=>{
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
    const crop = stateRef.current.crop;
    const imageContainer = imgWrapperRef1;
    return /*#__PURE__*/ (0, $dSH8u$reactjsxruntime.jsxs)((0, $dSH8u$reactjsxruntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, $dSH8u$reactjsxruntime.jsx)("div", {
                ref: imageContainer
            }),
            /*#__PURE__*/ (0, $dSH8u$reactjsxruntime.jsx)("div", {
                ref: setNode,
                className: $0d16028b28e5283f$var$cx(className, (0, (/*@__PURE__*/$parcel$interopDefault($5d4abfe7f70a3dcc$exports))).component),
                style: {
                    width: $0d16028b28e5283f$var$px(width),
                    height: $0d16028b28e5283f$var$px(height)
                },
                children: /*#__PURE__*/ (0, $dSH8u$reactjsxruntime.jsx)("div", {
                    ref: selectionRef,
                    className: (0, (/*@__PURE__*/$parcel$interopDefault($5d4abfe7f70a3dcc$exports))).selection,
                    style: {
                        position: "absolute",
                        left: $0d16028b28e5283f$var$px(crop?.left ?? 0),
                        top: $0d16028b28e5283f$var$px(crop?.top ?? 0),
                        width: $0d16028b28e5283f$var$px((crop?.right ?? 0) - (crop?.left ?? 0)),
                        height: $0d16028b28e5283f$var$px((crop?.bottom ?? 0) - (crop?.top ?? 0)),
                        touchAction: "none"
                    },
                    children: children,
                    imageContainer: (image)=>{
                        imgWrapperRef1.current = image;
                    }
                })
            })
        ]
    });
    function handleCropChange(crop) {
        stateRef.current.crop = updateSizes(crop);
        onCropChange(stateRef.current.crop);
        const imgWrapper = document.getElementById("imageWrapper");
        imgWrapperRef1.current = imgWrapper;
        // imageContainer(imgWrapperRef.current)
        Object.assign(selectionRef.current.style, {
            left: $0d16028b28e5283f$var$px(crop?.left ?? 0),
            top: $0d16028b28e5283f$var$px(crop?.top ?? 0),
            width: $0d16028b28e5283f$var$px((crop?.right ?? 0) - (crop?.left ?? 0)),
            height: $0d16028b28e5283f$var$px((crop?.bottom ?? 0) - (crop?.top ?? 0))
        });
    }
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
        // window.addEventListener('pointermove', dragEvent, { passive: true })
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
            return;
        } else if (!stateRef.current.edges.length && stateRef.current.pointers.size === 2) {
            return;
        } else if (e.pointerId === 1) {
        // moveSelection({ dx: e.movementX, dy: e.movementY })
        }
    }
    function handleDragEnd(e) {
        if (!stateRef.current.pointers.has(e.pointerId)) return; // Drag already ended, multiple events can end dragging
        const { edges: edges  } = stateRef.current.pointers.get(e.pointerId);
        stateRef.current.edges = stateRef.current.edges.filter((x)=>!edges.includes(x));
        stateRef.current.pointers.delete(e.pointerId);
        stateRef.current.dragging = Boolean(stateRef.current.pointers.size);
        if (!stateRef.current.dragging) {
            window.removeEventListener("pointermove", dragEvent, {
                passive: true
            });
            window.removeEventListener("pointerup", dragEndEvent);
            window.removeEventListener("pointercancel", dragEndEvent);
        }
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
        const crop = stateRef.current.crop;
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
            x: x,
            y: y,
            dx: edges.includes("left") ? dl : edges.includes("right") ? dr : 0,
            dy: edges.includes("top") ? dt : edges.includes("bottom") ? db : 0,
            edges: edges.filter((x)=>!stateRef.current.edges.includes(x))
        };
    }
    function transformSelection({ pointerState: pointerState , x: x , y: y , threshold: threshold  }) {
        const crop = stateRef.current.crop;
        const newCrop = {
            ...crop
        };
        if (pointerState.edges.includes("left")) {
            newCrop.left = Math.max(0, x);
            newCrop.right = Math.min(containerWidth, Math.max(crop.right, x + threshold));
        } else if (pointerState.edges.includes("right")) {
            newCrop.right = Math.min(containerWidth, x);
            newCrop.left = Math.max(0, Math.min(crop.left, x - threshold));
        }
        if (pointerState.edges.includes("top")) {
            newCrop.top = Math.max(0, y);
            newCrop.bottom = Math.min(containerHeight, Math.max(newCrop.bottom, y + threshold));
        } else if (pointerState.edges.includes("bottom")) {
            newCrop.bottom = Math.min(containerHeight, y);
            newCrop.top = Math.max(0, Math.min(crop.top, y - threshold));
        }
        handleCropChange(newCrop);
    }
    function moveSelection({ dx: dx , dy: dy  }) {
        const crop = stateRef.current.crop;
        const newCrop = {
            ...crop
        };
        // We cannot constrain edges without considering the other edges: the left 
        // edge may be well within the container while your move the right side 
        // out. We constrain the selection by making sure the delta x and y never
        // exceed the delta that would move any of the edges out of the container.
        const clampedDx = $0d16028b28e5283f$var$clamp(-crop.left, containerWidth - crop.right, dx);
        const clampedDy = $0d16028b28e5283f$var$clamp(-crop.top, containerHeight - crop.bottom, dy);
        // If an edge is being 'held', it won't be moved
        newCrop.left = stateRef.current.edges.includes("left") ? crop.left : crop.left + clampedDx;
        newCrop.right = stateRef.current.edges.includes("right") ? crop.right : crop.right + clampedDx;
        newCrop.top = stateRef.current.edges.includes("top") ? crop.top : crop.top + clampedDy;
        newCrop.bottom = stateRef.current.edges.includes("bottom") ? crop.bottom : crop.bottom + clampedDy;
        handleCropChange(newCrop);
    }
    function scaleSelection({ pointerState: pointerState , dx: dx , dy: dy , threshold: threshold  }) {
        const crop = stateRef.current.crop;
        const newCrop = {
            ...crop
        };
        // New scale is calculated in reference to the distance to the other pointer on the screen
        const [otherPointer] = [
            ...stateRef.current.pointers.values()
        ].filter((x)=>x !== pointerState);
        const distanceBefore = Math.sqrt((pointerState.x - otherPointer.x) ** 2 + (pointerState.y - otherPointer.y) ** 2);
        const distanceAfter = Math.sqrt((pointerState.x + dx - otherPointer.x) ** 2 + (pointerState.y + dy - otherPointer.y) ** 2);
        // Change in scale
        const deltaScale = $0d16028b28e5283f$var$clamp(// Cannot be so small the window would become large than the threshold, rendering some corners inaccessible
        Math.max(threshold / containerWidth, threshold / containerHeight), // Cannot be so large the window would become larger than it's container
        Math.min(containerWidth / crop.width, containerHeight / crop.height), // The new scale
        distanceAfter / distanceBefore) - 1;
        // Since we know for sure the resulting crop cannot exceed the container 
        // size, we can simply an edge of the new crop rect without considering the
        // other edges
        newCrop.left = $0d16028b28e5283f$var$clamp(0, containerWidth - threshold, crop.left - crop.width * deltaScale * 0.5);
        newCrop.right = $0d16028b28e5283f$var$clamp(threshold, containerWidth, crop.right + crop.width * deltaScale * 0.5);
        newCrop.top = $0d16028b28e5283f$var$clamp(0, containerHeight - threshold, crop.top - crop.height * deltaScale * 0.5);
        newCrop.bottom = $0d16028b28e5283f$var$clamp(threshold, containerHeight, crop.bottom + crop.height * deltaScale * 0.5);
        handleCropChange(newCrop);
    }
    function updateSizes({ left: left , right: right , top: top , bottom: bottom  }) {
        return {
            left: left,
            right: right,
            top: top,
            bottom: bottom,
            width: Math.min(right - left, containerWidth),
            height: Math.min(bottom - top, containerHeight),
            container: {
                width: containerWidth,
                height: containerHeight
            }
        };
    }
}
var $0d16028b28e5283f$export$2e2bcd8739ae039 = imgWrapperRef.current;
function $0d16028b28e5283f$var$px(n) {
    return typeof n === "number" || typeof n === "string" ? n + "px" : n;
}
function $0d16028b28e5283f$var$clamp(left, right, value) {
    const [min, max] = left < right ? [
        left,
        right
    ] : [
        right,
        left
    ];
    return Math.max(min, Math.min(max, value));
}
function $0d16028b28e5283f$var$lerp(a, b, n) {
    return b - a + a * n;
}
function $0d16028b28e5283f$var$unlerp(a, b, n) {
    return (n - a) / (b - a);
}
function $0d16028b28e5283f$var$cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function $0d16028b28e5283f$var$useEvent(fn) {
    const fnRef = (0, ($parcel$interopDefault($dSH8u$react))).useRef(null);
    fnRef.current = fn;
    return (0, ($parcel$interopDefault($dSH8u$react))).useCallback((...args)=>fnRef.current(...args), []);
}


//# sourceMappingURL=main.js.map
