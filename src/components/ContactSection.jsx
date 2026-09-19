// ============================================================
// CONTACTSECTION.JSX — Contact Page with Form (Day 11-12)
// ============================================================
// A full contact section with a message form, info cards
// (location, hours, email, phone), social links, and
// interactive effects (tilt cards, mouse-follow glow).
//
// THIS IS THE MOST COMPLEX COMPONENT IN THE PROJECT.
// Take your time and build it section by section.
//
// WHAT YOU WILL LEARN:
// - Managing complex form state with useState
// - Form validation and submission handling
// - useRef for DOM references
// - useEffect for global event listeners (mouse tracking)
// - Advanced framer-motion: useMotionValue, useSpring, useTransform
// - Building a reusable TiltCard sub-component
// - SVG icons inline in JSX
// - Conditional rendering for form states (sending, sent, error)
//
// CONCEPTS COVERED:
// - Multiple useState hooks in one component
// - Event handling: onChange, onBlur, onSubmit, onMouseMove
// - Controlled form inputs with validation
// - Async/await with try/catch
// - Component composition (sub-components in same file)
// - Inline styles with dynamic values
//
// ============================================================

// STEP 1: Imports
// From "react": import { useState, useEffect, useRef }
// From "framer-motion": import { motion, useMotionValue, useSpring, useTransform }
// Import UI components: ScrollReveal, StaggerContainer, StaggerItem,
//   Separator, Input (+ Textarea), Button

/* --- YOUR IMPORTS GO HERE --- */
import { useState, useEffect, useRef} from "react";
import { motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "./ui/ScrollReveal";
import Separator from "./ui/Separator";
import Input, { Textarea } from "./ui/Input";
import Button from "./ui/Button";

// STEP 2: Contact channels data (outside the component)
// Define an array of contact info objects:
// const contactChannels = [
//   {
//     name: "Visit Our Roastery",
//     icon: <svg>...</svg>,  // Map pin icon
//     gradient: "from-amber-700 to-amber-500",
//     accentColor: "var(--amber)",
//     detail: "Beans Place, Strasburg, CO 80136",
//     action: "Get Directions",
//     href: "https://maps.google.com/?q=Beans+Place+Strasburg+CO"
//   },
//   // Add: Opening Hours, Email Us, Call Us
// ];

/* --- YOUR CONTACT DATA GOES HERE --- */


// STEP 3: TiltCard sub-component (ADVANCED)
// This creates a 3D tilt effect that follows the mouse.
//
// function TiltCard({ children, className, href, target, rel }) {
//   - Use useRef for the card element
//   - useMotionValue(0) for x and y mouse positions
//   - useSpring + useTransform to convert mouse position to rotation
//   - handleMouse: calculate mouse position relative to card
//   - handleLeave: reset to center
//   - Render as <motion.a> if href provided, <motion.div> otherwise
//   - Apply rotateX, rotateY, and transformPerspective styles
// }

/* --- YOUR TILTCARD COMPONENT GOES HERE --- */


// STEP 4: ContactFormInline sub-component
// An animated contact form with validation.
//
// function ContactFormInline() {
//   State:
//     - formData: { name, email, subject, message }
//     - status: null | 'sending' | 'sent' | 'error'
//     - touched: {} (tracks which fields have been visited)
//
//   Handlers:
//     - handleChange: updates formData with spread operator
//     - handleBlur: marks field as touched
//     - handleSubmit: validates, simulates send, updates status
//
//   JSX: <motion.form> with:
//     - Header (title + subtitle)
//     - Name + Email inputs (2-column grid)
//     - Subject input (full width)
//     - Message textarea (full width)
//     - Submit button with 3 states:
//       sending: spinner + "Sending..."
//       sent: checkmark + "Message Sent!"
//       default: "Send Message"
//     - Error message (conditional)
// }

/* --- YOUR CONTACTFORMINLINE COMPONENT GOES HERE --- */


// STEP 5: Create and export ContactSection (main component)
// export default function ContactSection() { ... }
//
// State:
//   - mousePos: { x: 0, y: 0 } for the glowing cursor effect
//   - sectionRef: useRef(null)
//
// useEffect: track mouse position globally
//   window.addEventListener("mousemove", ...)
//
// JSX Structure:
//   <div className="contact-section-wrap" ref={sectionRef}>
//
//     Background effects:
//       - Three animated orbs (div elements)
//       - Grid overlay pattern
//
//     Content (className="contact-inner"):
//       Header:
//         - Animated pill: "Connect & Collaborate"
//         - <h1>: "GET IN" / "TOUCH"
//         - Subtitle paragraph
//         - Separator
//
//       Two-column layout (className="contact-layout"):
//         Left: <ContactFormInline />
//         Right: Contact info cards + social links
//           - Map over contactChannels with TiltCard
//           - Social links row (Instagram, Facebook, X)
//
//     Mouse glow effect:
//       <div className="contact-mouse-glow"
//         style={{ left: mousePos.x - 192, top: mousePos.y - 192 }} />
//   </div>

/* --- YOUR COMPONENT CODE GOES HERE --- */


//Data for the four "ways to reach us" cards,
// name/detail -> card text icon -> inline svg
//gradient -> icon title color accentColor -> the bar down the card's edge 
//action/href -> where it links 


const contactChannels = [
    {
        name: "Visit Our Roastery", 
        icon:(
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ),
        gradient:"from-amber-700 to amber-500",
        accentColor: "var(--amber)",
        detail: "Beans Place, Strasburg, CO 830136",
        action: "Get Directions",
        href: "https://maps.google.com/?q=Beans+Place+Strasburg+CO",
    },
    {
        name: "Opening Hours", 
        icon: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ),
        gradient: "from-yellow-700 to-yellow-500",
        accentColor: "#ca8a04",
        detail: "Mon-Fri: 7am-6pm | Sat: 8am-4pm",
        action: "Plan Your Visit",
        href: "#contact" // link just jumpts to that section of the page
    },
    {
        name: "Email Us", 
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
        gradient: "from-orange-700 to-orange-500",
        accentColor: "#c2410c",
        detail: "hello@thebeansplace.com",
        action: "Send Email",
        href: "mailto:hello@thebeansplace.com" //opens their email app, pre-addressed
    },
    {
        name: "Call Us", 
        icon: (
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg> 
        ),
        gradient: "from-stone-700 to-stone-500",
        accentColor: "#78716c",
        detail: "(303) 555-BEAN",
        action: "Call Now",
        href: "tel:+13035552326",
    }
   
];


//Tiltcard
//Wrapper that its contents in 3D toward the mouse. Local to this file
//children/className -> the card content and its css Classes
//href/target/rel -> if href is given, the wrapper becomes a link

function TiltCard({children, className, href, target, rel}) {
    const ref = useRef(null);

    //mouse postion inside the card as a function
    //(right/button). motion values, so updating them skips a re-render.
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    //rotatex is reversed [6, -6] sp moving the mouse down tips the top
    //of card away from you - makes it look 3D
    const rotateX = useSpring(
        useTransform(y, [-0.5, 0.5], [6, -6]),
        {stiffness: 200, damping: 20}
    );

    const rotateY = useSpring(
        useTransform(x, [-0.5, 0.5], [-6, 6]),
        {stiffness: 200, damping: 20}
    );

    function handleMouse(e) {
        const rect = ref.current.getBoundingClientRect();

        //window coords -> card-relative -> 0-1 fraction -> recentered on 0
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    //reset on leace so the card springs back flat
    function handleLeave() {
        x.set(0);
        y.set(0);
    };

    //<a> if we were given a link, otherwise <div> =. the capital matters
    //React treats lowercase names as plain HTML tags.
    const Tag = href ? motion.a : motion.div;

    return (
        <Tag
            ref={ref}
            href={href}
            target={target}
            rel={rel}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            //transforPerspective = how deep the 3D looks: smaller exaggerates it
            style={{rotateX, rotateY, transformPerspective: 600}}
            className={className}
        >
            {children}
        </Tag>
    );
};

//the message form in the left column
function ContactFormInline() {

    //all four fields in one object. these keys must match the "name" props
    //on the inputs below - thats what makes handleChange work
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [status, setStatus] = useState(null); //null | sending | sent | error

    //fields the user has visited and left. Errors only show for these so
    //the form doesnt turn red before the user interacts with it.
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;

        //copy the old object, overwrite just this field
        //means "use the value of the name as the key"
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: true
        }));
    };

    const handleSubmit = async (e) => {
        //stop the browser reloading the page
        e.preventDefault();

        //touch every field so all missing ones light up at once
        setTouched({
            name: true,
            email: true,
            subject: true,
            message: true
        });

        //required filed only - subject is optional
        if (!formData.name || !formData.email || !formData.message) return;

        setStatus("sending");

        try {
            //placeholder: sends nothing, just fake 1.2s of network
            //swap in real api call later
            await new Promise((resolve) => setTimeout(resolve, 1200));

            setStatus("sent");

            //clear the form
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

            setTouched([]);
            setTimeout(() => setStatus(null), 4000);

        } catch {
            setStatus("error");
            setTimeout(() => setStatus(null), 4000);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="contact-form-card"
            initial={{opacity: 0, y: 40}}
            viewport={{once: true}}
            transition={{duration: 0.6, delay: 0.1}}
        >
            <div className="mb-6">
                <h3 className="contact-form-title">
                    Send a Message
                </h3>

                <p className="contact-form-subtitle">
                    We'd love to hear from you. Fill out the form and we'll get back to you within 24 hours.
                </p>
            </div>

            {/* name and email side by side */}
            <div className="contact-form-grid">
                <Input
                    label="Your Name"
                    id="contact-name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && !formData.name ? "Name is required" : undefined}
                />

                <Input
                    label="Email Address"
                    id="contact-email"
                    name="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && !formData.email ? "Email is required" : undefined}
                />
            </div>

            <div className="mt-4">
                <Input
                    label="Subject"
                    id="contact-subject"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                />
            </div>

            <div className="mt-4">
                <Textarea
                    label="Message"
                    id="contact-message"
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    value={formData.message}
                    onBlur={handleBlur}
                    error={touched.message && !formData.message ? "Message is required" : undefined}
                />
            </div>

            <div className="mt-6 flex items-center gap-4">
                <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="contact-form-submit"
                    disabled={status === "sending"}
                >
                    {/* sending -> spinner, sent -. tick, otherwise nomral text */}
                    {status === "sending" ? (
                        <span className="flex items-center gap-2">
                            {/* animate-spin with tailwind */}
                            <svg
                                className="animate-spin w-4 h-4"
                                viewBox="0 0 24 24"
                                file="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />

                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>

                            Sending...
                        </span>
                    ) : status === "sent" ? (
                        <span className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>

                            Message Sent
                        </span>
                    ) : (
                        "Send Message"
                    )}
                </Button>

                {status === "error" && (
                    <motion.span
                        initial={{opacity: 0, x: -10}}
                        animate={{opacity: 1, x: 0}}
                        className="text-sm text-red-400"
                    >
                        Something went wrong. Please try again.
                    </motion.span>
                )}
            </div>
        </motion.form>
    );
};


export default function ContactSection() {

    //pointer position in the window for the glow that follows the cursor
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) =>
            setMousePos({ x: e.clientX, y: e.clientY });

        window.addEventListener("mousemove", handleMouseMove);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (

        <div className="contact-section-wrap" ref={sectionRef}>
            <div className="contact-bg-effects">
                <div className="contact-bg-orb contact-bg-orb--1" />
                <div className="contact-bg-orb contact-bg-orb--2" />
                <div className="contact-bg-orb contact-bg-orb--3" />
                <div className="contact-bg-grid" />
            </div>

            <div className="contact-inner">
                {/* header */}
                <ScrollReveal animation="fadeUp" className="contact-header">
                    <motion.div
                        className="contact-pill"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <span>✦ Connect & Collaborate</span>
                    </motion.div>

                    <h1
                        className="h1-stack"
                        style={{ color: "var(--cream)" }}
                    >
                        GET IN
                        <br />

                        <span
                            className="muted"
                            style={{ color: "var(--amber)" }}
                        >
                            TOUCH
                        </span>
                    </h1>

                    <p
                        className="lead--light"
                        style={{
                            maxWidth: "52ch",
                            margin: "10px auto 0"
                        }}
                    >
                        Whether you're ordering beans, planning an event, or just want to say hello
                        -we'd love to hear from you.
                    </p>

                    <Separator className="mt-4 mb-2 mx-auto max-w-48" />
                </ScrollReveal>

                <div className="contact-layout">

                    <div className="contact-form-col">
                        <ContactFormInline />
                    </div>

                    <div className="contact-info-col">
                        <StaggerContainer
                            className="contact-info-cards"
                            staggerDelay={0.1}
                        >
                            {contactChannels.map((channel) => (
                                <StaggerItem
                                    key={channel.name}
                                    animation="fadeUp"
                                >
                                    <TiltCard
                                        href={channel.href}
                                        target={
                                            channel.href.startsWith("http")
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            channel.href.startsWith("http")
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="contact-card-link"
                                    >


                                    </TiltCard>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
