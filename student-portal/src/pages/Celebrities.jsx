import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { motion } from "framer-motion";
import "../styles/Dashboard.css";

const Celebrities = () => {
    const { instructors } = useContext(AuthContext);

    const normalizeUrl = (url) => {
        if (!url) return "";
        if (url.startsWith("http")) return url;
        const cleanPath = url.startsWith("/") ? url.slice(1) : url;
        return `http://localhost:5000/${cleanPath}`;
    };

    return (
        <motion.div
            className="about-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}
        >
            <section className="about-hero" style={{ textAlign: "center", marginBottom: "40px" }}>
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    style={{ fontSize: "2.5rem", fontWeight: "800", color: "#fff" }}
                >
                    Meet Our <span className="text-gradient">Celebrity Instructors</span>
                </motion.h1>
                <p className="subtitle" style={{ color: "#94a3b8", fontSize: "1.1rem", marginTop: "10px" }}>
                    Explore our roster of pop sensations and industry icons. Select your preferred mentor for any course directly inside the Course Player!
                </p>
            </section>

            <div className="celebrity-grid" style={{ marginTop: "40px" }}>
                {instructors.map((inst) => (
                    <motion.div
                        key={inst.id}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="dashboard-celebrity-card unselected"
                    >
                        <div className="dashboard-celebrity-card-img-wrapper">
                            <img
                                src={normalizeUrl(inst.image)}
                                alt={inst.name}
                                className="dashboard-celebrity-card-img unselected"
                                onError={(e) => e.target.src = "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?w=100"}
                            />
                        </div>
                        <h4 className="dashboard-celebrity-card-name" style={{ color: "#fff", fontWeight: "700" }}>{inst.name}</h4>
                        <p className="dashboard-celebrity-card-bio" style={{ color: "#cbd5e1" }}>{inst.bio}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Celebrities;
