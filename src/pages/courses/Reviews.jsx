import { useEffect, useState } from "react";
import Papa from "papaparse";

import "./Reviews.css";

import EmptyState from "../../components/EmptyState/EmptyState";
import PageLoader from "../../components/Loader/PageLoader";
import TablePagination from "../../components/DataTable/TablePagination";
import { FaDownload } from "react-icons/fa";
import { colors } from "../../styles/designtokens";

function Reviews() {
  const [loading, setLoading] = useState(true);

  const [reviews] = useState([
    {
      id: 1,
      student: "Rishika",
      course: "Python Programming",
      rating: 5,
      review:
        "Excellent course with practical examples and real-world projects.",
      date: "12-Jun-2026",
    },
    {
      id: 2,
      student: "Dithwej",
      course: "MERN Stack",
      rating: 4,
      review:
        "Very informative course. Helped me build full-stack applications.",
      date: "10-Jun-2026",
    },
    {
      id: 3,
      student: "kashvika",
      course: "Data Science",
      rating: 5,
      review:
        "Amazing content and projects. Learned a lot about machine learning.",
      date: "08-Jun-2026",
    },
    {
      id: 4,
      student: "Guna",
      course: "Java",
      rating: 4,
      review:
        "Good explanations and coding exercises.",
      date: "06-Jun-2026",
    },
    {
      id: 5,
      student: "Hanu",
      course: "Web Development",
      rating: 5,
      review:
        "Loved the hands-on projects and practical learning approach.",
      date: "04-Jun-2026",
    },
    {
      id: 6,
      student: "Veni",
      course: "Artificial Intelligence",
      rating: 5,
      review:
        "Advanced topics explained in a simple and understandable manner.",
      date: "02-Jun-2026",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const downloadAllReviews = () => {
    const csvData = reviews.map((review) => ({
      Student_Name: review.student,
      Course_Name: review.course,
      Rating: review.rating,
      Review: review.review,
      Date: review.date,
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "uptoskills_reviews.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(
    reviews.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentReviews = reviews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <PageLoader />;

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <div>
          <h2>Student Reviews</h2>
          <p>Course feedback and ratings</p>
        </div>

        <button
          className="reviewdownload-btn"
          onClick={downloadAllReviews}
        >
            <FaDownload/>
          Download CSV
        </button>
      </div>

      {reviews.length === 0 ? (
        <EmptyState
          title="No Reviews"
          message="No student reviews available."
        />
      ) : (
        <>
          <div className="reviews-table-wrapper">
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Course Name</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {currentReviews.map((review) => (
                  <tr key={review.id}>
                    <td>{review.student}</td>

                    <td>{review.course}</td>

                    <td>
                      {"⭐".repeat(review.rating)}
                    </td>

                    <td className="review-column">
                      {review.review}
                    </td>

                    <td>{review.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="reviews-pagination">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}

          />
          </div>
        </>
      )}
    </div>
  );
}

export default Reviews;