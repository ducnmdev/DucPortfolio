import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei"; // Points dùng để render tập hợp nhiều điểm, PointMaterial chất liệu cho từng điểm.
import * as random from "maath/random/dist/maath-random.esm";       // tạo random các điểm nằm trong hình cầu

const Stars = (props) => {
  const ref = useRef();
  //random.inSphere: tạo mảng Float32Array chứa 6000 giá trị (tương ứng 2000 điểm 3D, vì 3 giá trị là 1 điểm).
  const sphere = random.inSphere(new Float32Array(6000), { radius: 1.2 })


  // mỗi frame sẽ xoay nhẹ object quanh trục X và Y → tạo hiệu ứng sao chuyển động nhẹ
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}> {/* nhóm chứa tất cả điểm, xoay 45 độ quanh trục Z để tạo phối cảnh */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent              // cho phép độ trong suốt
          color='#f272c8'          // màu hồng tím
          size={0.002}             // điểm rất nhỏ
          sizeAttenuation={true}   // nhỏ dần khi xa camera
          depthWrite={false}       // không ghi vào depth buffer -> tránh lỗi vẽ đè
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;