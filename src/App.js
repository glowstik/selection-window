import React from "react"
import image from "./image.jpg"
import * as styles from "./App.module.css"
import SelectionWindow from './SelectionWindow'

export default function App() {
  const cropRectRef = React.useRef(null)
  const imgWrapperRef = React.useRef(null)

  return (
    <div className={styles.app}>
      <div id='imageWrapper' className={styles.imageWrapper} ref={imgWrapperRef}>
        <img id='img' className={styles.image} src={image} />
      </div>
      <SelectionWindow
        className={styles.window}
        ref={imgWrapperRef}
        onCropChange={rect => { cropRectRef.current = rect }}
      >
        <div className={styles.selection}>
          <div className={[styles.handle, styles.topLeft].join(' ')} />
          <div className={[styles.handle, styles.topRight].join(' ')} />
          <div className={[styles.handle, styles.bottomLeft].join(' ')} />
          <div className={[styles.handle, styles.bottomRight].join(' ')} />
        </div>
      </SelectionWindow>
    </div>
  )
}