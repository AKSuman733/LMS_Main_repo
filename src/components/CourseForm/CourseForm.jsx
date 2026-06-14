import "./CourseForm.css";

function CourseForm({
  title,
  setTitle,
  image,
  setImage,
  videoUrl,
  setVideoUrl,
  price,
  setPrice,
  category,
  setCategory,
  duration,
  setDuration,
  level,
  setLevel,
  description,
  setDescription,
  handleSubmit,
  editId,
  onClose,
}) {
  const isValid =
    title && image && price;

  return (
    <div className="floating-form">

      {/* HEADER */}
      <div className="form-header">
        <h3>{editId ? "Edit Course" : "Add Course"}</h3>

        {/* <button className="close-btn" onClick={onClose}>
          ✕
        </button> */}
         <button onClick={onClose}>
            ✕
          </button>
      </div>

      {/* SCROLL AREA */}
      <div className="form-body">

        <input
          placeholder="Course Name *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Image URL *"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price *"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <textarea
          rows="3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

      </div>

      {/* FOOTER */}
      <div className="form-footer">

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          {editId ? "Update" : "Save"}
        </button>

      </div>

    </div>
  );
}

export default CourseForm;