import React, { useRef } from 'react'
import "@needle-tools/engine";

export default function App() {
  return (
    <>
      <NeedleEngine>
      </NeedleEngine>
    </>
  )
}

function NeedleEngine(props) {
    return <needle-engine></needle-engine>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'needle-engine': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}