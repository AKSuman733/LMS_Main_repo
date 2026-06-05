import { motion } from 'framer-motion';
import { ArrowLeft, Download, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/Resources.css';

const Resources = () => {
    const studyGuides = [
        { name: "AI Fundamentals & Ethics Guide", size: "2.4 MB", type: "PDF" },
        { name: "Neural Networks Deep Dive", size: "1.8 MB", type: "PDF" },
        { name: "Machine Learning Concepts", size: "3.2 MB", type: "PDF" },
        { name: "Python for Data Science Handbook", size: "4.5 MB", type: "PDF" },
        { name: "Generative AI Masterclass Notes", size: "1.1 MB", type: "PDF" }
    ];

    const downloadFile = (name) => {
        toast.success(`Starting download: ${name}`);
        const wpLink = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
        const link = document.createElement('a');
        link.href = wpLink;
        link.download = `UptoSkills_${name.replace(/\s+/g, '_')}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="resources-page-root">
            <div className="resources-container">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="resources-back-link">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                </motion.div>

                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="resources-header"
                >
                    <h1 className="resources-title">
                        Study <span className="resources-title-highlight">Guides</span>
                    </h1>
                    <p className="resources-subtitle">
                        Download our curated collection of professional study guides and course notes to enhance your learning experience.
                    </p>
                </motion.header>

                <motion.div
                    className="resources-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="resources-section-title-box">
                        <div className="resources-icon-wrapper">
                            <Book className="text-orange-500" />
                        </div>
                        <h2 className="resources-section-heading">PDF Resources</h2>
                    </div>

                    <div className="resources-grid">
                        {studyGuides.map(item => (
                            <div key={item.name} className="resource-row-modern resources-row">
                                <div className="resources-item-info">
                                    <div className="resources-item-icon">📄</div>
                                    <div>
                                        <p className="resources-item-name">{item.name}</p>
                                        <span className="resources-item-meta">{item.type} • {item.size}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => downloadFile(item.name)}
                                    className="resources-download-btn"
                                >
                                    <Download size={18} /> Download
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Resources;
