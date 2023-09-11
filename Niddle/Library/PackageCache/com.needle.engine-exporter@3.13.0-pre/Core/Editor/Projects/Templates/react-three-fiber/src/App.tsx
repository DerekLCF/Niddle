import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Stage, Environment } from '@react-three/drei'
import { NeedleScene } from '@needle-tools/react-three-fiber'

export default function App() {
  return (
    <Canvas 
      onCreated={ctx => { ctx.gl.physicallyCorrectLights = true; }}
      camera={{ position: [-4, 3, 5], fov: 30 }}
      shadows
    >

      <Stage environment="city">
        <CameraControls />
        <NeedleScene />
        <Environment background preset="sunset" blur={0.8} />
      </Stage>
    </Canvas>
  )
}