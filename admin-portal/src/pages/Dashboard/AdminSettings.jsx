import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Globe, Lock, Palette, Eye, Mail, Shield } from "lucide-react";
import "../../styles/AdminSettings.css";

const SettingRow = ({ id, icon: Icon, title, desc, active, onToggle }) => (
    <div className="admin-settings-row">
        <div className="admin-settings-row-left">
            <div className="admin-settings-row-icon-container">
                <Icon size={22} />
            </div>
            <div>
                <h4 className="admin-settings-row-title">{title}</h4>
                <p className="admin-settings-row-desc">{desc}</p>
            </div>
        </div>
        <button
            onClick={() => onToggle(id)}
            className="admin-settings-toggle-btn"
            style={{
                background: active ? 'var(--color-primary)' : '#334155',
            }}
        >
            <motion.div
                animate={{ x: active ? 30 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="admin-settings-toggle-handle"
            />
        </button>
    </div>
);

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        mfa: true,
        emailAlerts: true,
        publicAnalytics: false,
        autoPublish: true,
        maintenanceMode: false,
        reduceMotion: localStorage.getItem("reduceMotion") === "true"
    });

    const toggleSetting = (key) => {
        setSettings(prev => {
            const nextVal = !prev[key];
            if (key === "reduceMotion") {
                localStorage.setItem("reduceMotion", String(nextVal));
                if (nextVal) {
                    document.body.classList.add("reduce-motion");
                } else {
                    document.body.classList.remove("reduce-motion");
                }
            }
            return { ...prev, [key]: nextVal };
        });
    };

    return (
        <div className="admin-settings-page">
            <header className="page-header">
                <div className="header-text">
                    <h2>System Settings</h2>
                    <p>Configure global platform behaviors and security protocols.</p>
                </div>
            </header>

            <div className="admin-settings-grid">
                <section className="admin-settings-section">
                    <h3 className="admin-settings-section-title" style={{ color: 'var(--color-primary)' }}>
                        <Lock size={18} /> Security & Access
                    </h3>
                    <SettingRow
                        id="mfa"
                        icon={Shield}
                        title="Multi-Factor Authentication"
                        desc="Require a security code for all administrative logins."
                        active={settings.mfa}
                        onToggle={toggleSetting}
                    />
                    <SettingRow
                        id="maintenanceMode"
                        icon={Globe}
                        title="Maintenance Mode"
                        desc="Disable public access while performing system updates."
                        active={settings.maintenanceMode}
                        onToggle={toggleSetting}
                    />
                </section>

                <section className="admin-settings-section">
                    <h3 className="admin-settings-section-title" style={{ color: 'var(--color-info)' }}>
                        <Bell size={18} /> Accessibility & Visuals
                    </h3>
                    <SettingRow
                        id="reduceMotion"
                        icon={Eye}
                        title="Reduce Motion & Animations"
                        desc="Disable page transitions, dropdown scaling, and structural animations."
                        active={settings.reduceMotion}
                        onToggle={toggleSetting}
                    />
                </section>

                <section className="admin-settings-section">
                    <h3 className="admin-settings-section-title" style={{ color: 'var(--color-info)' }}>
                        <Bell size={18} /> Notifications
                    </h3>
                    <SettingRow
                        id="emailAlerts"
                        icon={Mail}
                        title="Critical Email Alerts"
                        desc="Receive immediate emails for system errors or security breaches."
                        active={settings.emailAlerts}
                        onToggle={toggleSetting}
                    />
                </section>
            </div>
        </div>
    );
};

export default AdminSettings;
