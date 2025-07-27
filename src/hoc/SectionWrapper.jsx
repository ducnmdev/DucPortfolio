import { motion } from "framer-motion"

import { styles } from "../styles"
import { staggerContainer } from "../utils/motion"

const SectionWrapper = (Component, idName) =>
    function HOC() {
        return (
            <motion.section
                //motion.section cha này có initial, whileInView... thì các motion ở trong sẽ tự động nhận lại nếu không ghi đè vào
                variants={staggerContainer()} // Không truyền tham số thì hàm này không có tác dụng gì
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