import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"

import CanvasLoader from '../Loader'
// Canvas render kgian 3D , OrbitControls xoay/phóng to nhỏ,
// Preload để preload mô hình/tn trc khi render, useGLTF load file mô hình 3D định dạng .gltf hoặc .glb

const Aliens = ({ isMobile }) => {
    // load file 3D, sau khi load sẽ có mô hình dạng computer.scene
    const alien = useGLTF('./alien/scene.gltf')

    return (
        // mesh dùng như một container 3D để chứa ánh sáng và mô hình
        <mesh>
            <hemisphereLight     //Ánh sáng kiểu "hemisphere" (trời + mặt đất)
                intensity={1}  // sáng nhẹ
                groundColor="black" />        {/*  màu phản chiếu từ mặt đất */}
            <pointLight      // nguồn sáng điểm giống bóng đèn
                intensity={4}
                decay={0}      // không giảm sáng theo khoảng cách
            />
            <spotLight   // đèn chiếu (kiểu đèn sân khấu)
                position={[-20, 50, 10]}  // vị trí của đèn
                angle={0.12}
                penumbra={1} // độ mờ vùng rìa bóng đổ
                intensity={1}
                castShadow // cho phép mô hình đổ bóng
                shadow-mapSize={1024} // độ phân giải bản đồ bóng, càng cao càng nét
            />
            <primitive // hiển thị mô hình
                object={alien.scene}
                scale={isMobile ? 0.55 : 0.65} // scale cho mô hình
                position={isMobile ? [0, - 3, 0] : [0, -3.25, 0]} // điều chỉnh vị trí để mô hình nằm đúng chỗ trong không gian 3D.
                rotation={[0, 1.05, 0]} // xoay mô hình, ví dụ mô hình nhìn sang trái thì xoay lại cho nhìn chính giữa
            />
        </mesh>
    )
}

const AliensCanvas = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Thêm listener lắng nghe sự thay đổi kích cỡ màn hình
        const mediaQuery = window.matchMedia('(max-width: 500px)');

        setIsMobile(mediaQuery.matches);

        // Định nghĩa hàm callback để xử lý khi mediaQuery thay đổi
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches)
        }

        // mediaQuery sự kiện change, nếu thay đổi thì gọi hàm callback trên,
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            // remove event khi comp unmount (f5, chuyển trang = router..)
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
        }
    }, [])

    return (
        <Canvas
            frameloop='demand' // chỉ update scene khi cần (khi người dùng dịch cam hoặc có j đó thay đổi)
            shadows
            camera={{           //set up camera x,y,z và độ rộng của tầm nhìn
                position: [20, 3, 5],
                fov: 25
            }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>   {/*  Đợi cho đến khi mô hình 3D load xong, Hiển thị component loading trong khi chờ. */}
                <OrbitControls
                    enableZoom={false} // Không cho zoom bằng scroll chuột
                    maxPolarAngle={Math.PI / 2} // Math.PI / 2 -> Giới hạn trục xoay dọc chỉ ở mặt trước (không cho xoay lên/xuống)
                    minPolarAngle={Math.PI / 2} // Math.PI / 2 -> Giới hạn trục xoay dọc chỉ ở mặt trước (không cho xoay lên/xuống)
                />
                <Aliens isMobile={isMobile} />
            </Suspense>

            <Preload all /> {/* tải trước toàn bộ tài nguyên 3D */}
        </Canvas>
    )
}

export default AliensCanvas