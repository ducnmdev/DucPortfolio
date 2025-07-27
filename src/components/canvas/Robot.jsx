import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"

import CanvasLoader from '../Loader'


function Robot() {
    const robot = useGLTF('./robot/scene.gltf')

    return (
        <primitive
            object={robot.scene}
            scale={4.75}
            position={[1, -2, 0]}
            rotation-y={0}
        />
    )
}

function RobotCanvas() {
    return (
        <Canvas
            shadows
            frameloop="always"
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [20, 3, 6]
            }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    autoRotate
                    enableZoom={false}
                    // autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />

                <Robot />
            </Suspense>

            <Preload all />
        </Canvas>
    )
}


export default RobotCanvas