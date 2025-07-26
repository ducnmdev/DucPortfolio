import { motion } from "framer-motion"

import { styles } from "../styles"
import { staggerContainer } from "../utils/motion"

const SectionWrapper = (Component, idName) =>
    function HOC() {
        return (
            <motion.section
                variants={staggerContainer()} // gọi animation
                initial='hidden' // ban đầu ẩn
                whileInView='show' // khi vào khung hình thì hiển thị animation
                viewport={{ once: true, amount: 0.25 }} // Kích hoạt animation một lần duy nhất, khi 25% của section đã vào vùng nhìn thấy
                className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
            >
                <span className="hash-span" id={idName}>
                    &nbsp;
                </span>
                <Component />
            </motion.section>
        )
    }


export default SectionWrapper