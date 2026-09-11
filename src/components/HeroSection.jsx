// HeroSection — the top of the page: animated headline and buttons on the
// left, a scroll-reactive beans image on the right.

// useScroll -> live scroll position; useTransform -> maps one value into another
// eslint-disable-next-line no-unused-vars -- `motion` is used only in JSX (<motion.div>)
import { motion, useScroll, useTransform } from "framer-motion";
import heroBeans from "../assets/hero-beans.png";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

// Animation states for the headline CONTAINER — staggerChildren delays each
// word by 0.12s so they appear one after another.
const textVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
};

// Animation states for each individual WORD: invisible, down 60px and tilted
// back -> fully shown, in place, flat.
const wordVariant = {
    hidden: { opacity: 0, y: 60, rotateX: -40 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export default function HeroSection() {
    const { scrollY } = useScroll();

    // Scroll-linked values for the hero image: over the first 500-600px of
    // scroll it shrinks, fades out, and drifts down (parallax).
    const imgScale = useTransform(scrollY, [0, 600], [1.35, 0.9]);
    const imgOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const imgY = useTransform(scrollY, [0, 600], [0, 100]);

    return (
        // <> </> is a Fragment — groups elements without an extra wrapper tag
        <>
            {/* ===== LEFT — text content ===== */}
            <div id="home" className="hero-text-column">
                {/* Badge: initial = where it starts, animate = where it ends up */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}>
                    <Badge variant="outline" className="mb-5">
                        ✦ Premium Coffee Beans — Roasted Fresh Daily
                    </Badge>
                </motion.div>

                {/* Headline. variants + initial/animate tie it to the states above;
                    perspective gives the words' rotateX a realistic depth. */}
                <motion.h1
                    className="h1-stack"
                    style={{ margin: 0, perspective: "600px" }}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible">
                    {/* One animated word each — inline-block is required for y/rotateX */}
                    <motion.span variants={wordVariant} style={{ display: "inline-block" }}>
                        YOUR PLACE
                    </motion.span>
                    

                    <motion.span
                        variants={wordVariant}
                        className="muted"
                        style={{ display: "inline-block" }}>
                        FOR COFFEE
                    </motion.span>
                    

                    <motion.span variants={wordVariant} style={{ display: "inline-block" }}>
                        BREWING
                    </motion.span>
                </motion.h1>

                {/* Paragraph — delayed so it lands after the headline */}
                <motion.p
                    className="lead"
                    style={{ marginTop: 18 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}>
                    Farm-to-cup single-origin beans from Ethiopia, Colombia & beyond. Freshly
                    roasted in small batches and shipped to your door within 48 hours.
                </motion.p>

                {/* Buttons — each scrolls smoothly to a section by id.
                    ?. avoids an error if that section isn't on the page. */}
                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}>
                    <Button
                        variant="accent"
                        size="lg"
                        className="shadow-lg"
                        onClick={() =>
                            document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
                        }>
                        SHOP COFFEE ☕
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() =>
                            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                        }>
                        OUR STORY
                    </Button>
                </motion.div>

                {/* Trust indicators — appear last, after the buttons */}
                <motion.div
                    className="hero-trust"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}>
                    <span>★★★★★ 4.9/5 from 2,400+ customers</span>
                    <span className="hero-trust-divider">|</span>
                    <span>Free shipping over $50</span>
                </motion.div>
            </div>

            {/* ===== RIGHT — beans image + floating price tag ===== */}
            <div className="hero-art-container">
                {/* style = the scroll-linked values above (shrink, fade, drift);
                    initial/animate = the one-time entrance on page load. */}
                <motion.img
                    className="hero-art"
                    src={heroBeans}
                    alt="Premium coffee beans"
                    style={{
                        scale: imgScale,
                        opacity: imgOpacity,
                        y: imgY
                    }}
                    initial={{ opacity: 0, scale: 0.8, x: 60 }}
                    animate={{ opacity: 1, scale: 1.35, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                />

                {/* Price badge — springs in bouncily once the image has arrived */}
                <motion.div
                    className="hero-floating-badge"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 1.2,
                        type: "spring",
                        stiffness: 200
                    }}>
                    <span className="hero-floating-badge-label">FROM</span>
                    <span className="hero-floating-badge-price">$14.99</span>
                    <span className="hero-floating-badge-label">per bag</span>
                </motion.div>
            </div>
        </>
    );
}