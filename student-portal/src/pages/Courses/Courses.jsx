import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CourseCard from "./CourseCard";
import FilterSidebar from "./FilterSidebar";
import "../../styles/courses.css";

const Courses = () => {
    const [searchParams] = useSearchParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        topic: [],
        level: [],
        duration: []
    });

    const search = searchParams.get("search") || "";

    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            filters.topic.forEach(t => params.append("topic", t));
            filters.level.forEach(l => params.append("level", l));

            const response = await axios.get(`http://localhost:5000/api/courses?${params.toString()}`);

            let filteredData = response.data;
            if (filters.duration.length > 0) {
                filteredData = filteredData.filter(course => {
                    const curriculum = Array.isArray(course.curriculum) ? course.curriculum : [];
                    let totalSeconds = 0;

                    if (curriculum.length === 0) {
                        const dur = (course.duration || "0").toLowerCase();
                        if (dur.includes('hr')) totalSeconds = (parseFloat(dur) || 0) * 3600;
                        else if (dur.includes('min')) totalSeconds = (parseFloat(dur) || 0) * 60;
                        else totalSeconds = (parseFloat(dur) || 0) * 3600;
                    } else {
                        curriculum.forEach(item => {
                            const dur = (item.duration || "0").toString();
                            if (dur.includes(':')) {
                                const parts = dur.split(':').map(Number);
                                if (parts.length === 3) totalSeconds += (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
                                else if (parts.length === 2) totalSeconds += (parts[0] || 0) * 60 + (parts[1] || 0);
                            } else {
                                const numeric = parseInt(dur);
                                if (!isNaN(numeric)) totalSeconds += numeric * 60;
                            }
                        });
                    }

                    const totalHours = totalSeconds / 3600;
                    if (filters.duration.includes("< 1 hr") && totalHours < 1) return true;
                    if (filters.duration.includes("1-4 hrs") && totalHours >= 1 && totalHours <= 4) return true;
                    if (filters.duration.includes("> 4 hrs") && totalHours > 4) return true;
                    return false;
                });
            }

            setCourses(filteredData);
        } catch (err) {
            console.error("Error fetching courses:", err);
            setError("Failed to load courses. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [search, filters]);

    return (
        <div className="courses-container-premium">
            <header className="catalog-header">
                <div className="header-text">
                    <h1>Explore AI-Powered Courses</h1>
                    <p>Learn from the world's most influential celebrities and tech visionaries.</p>
                </div>
                {search && (
                    <div className="search-status">
                        Showing results for: <strong>"{search}"</strong>
                    </div>
                )}
            </header>

            <div className="courses-layout-premium">
                <FilterSidebar filters={filters} setFilters={setFilters} />

                <main className="courses-content">
                    {loading ? (
                        <div className="courses-grid-premium">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <div key={`course-skel-${idx}`} className="course-card-premium skeleton-pulse courses-skeleton-card">
                                    <div className="card-image-wrapper courses-skeleton-img-wrapper">
                                    </div>
                                    <div className="card-content courses-skeleton-card-content">
                                        <div className="instructor-mini courses-skeleton-instructor-mini">
                                            <div className="skeleton-checkbox skeleton-pulse courses-skeleton-instructor-avatar"></div>
                                            <div className="skeleton-bar skeleton-pulse courses-skeleton-instructor-bar"></div>
                                        </div>
                                        <div className="skeleton-bar skeleton-pulse courses-skeleton-title-bar"></div>
                                        <div className="skeleton-bar skeleton-pulse courses-skeleton-desc-bar"></div>
                                        <div className="card-stats courses-skeleton-card-stats">
                                            <div className="skeleton-bar skeleton-pulse courses-skeleton-stat-bar-1"></div>
                                            <div className="skeleton-bar skeleton-pulse courses-skeleton-stat-bar-2"></div>
                                            <div className="skeleton-bar skeleton-pulse courses-skeleton-stat-bar-3"></div>
                                        </div>
                                        <div className="card-footer courses-skeleton-card-footer">
                                            <div className="skeleton-bar skeleton-pulse courses-skeleton-footer-bar-1"></div>
                                            <div className="skeleton-bar skeleton-pulse courses-skeleton-footer-bar-2"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="premium-error-state courses-error-state">
                            <div className="error-icon-box">
                                <span className="courses-error-emoji">⚠️</span>
                            </div>
                            <h3>Unable to Load Courses</h3>
                            <p>{error || "We encountered an error. Please try again."}</p>
                            <div className="error-actions">
                                <button className="error-retry-btn" onClick={fetchCourses}>Retry</button>
                                <a href="mailto:support@uptoskills.com" className="error-support-link">Contact Support</a>
                            </div>
                        </div>
                    ) : courses.length > 0 ? (
                        <div className="courses-grid-premium">
                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="premium-empty-state courses-empty-state">
                            <div className="empty-icon">🔍</div>
                            <h3>No Courses Found</h3>
                            <p>We couldn't find any courses matching your search or filters. Try adjusting them or resetting.</p>
                            <button className="empty-action-btn" onClick={() => setFilters({ topic: [], level: [], duration: [] })}>
                                Reset Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Courses;
