import { useEffect, useState } from "react";
import {
  CreateNewCategory,
  DeleteCategory,
  getAllCategories,
  updateCategory,
} from "../../managers/CategoryManager.js";
import { useNavigate } from "react-router-dom";

export const CategoryManager = (user) => {
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null); // holds category being edited
  const [editLabel, setEditLabel] = useState(""); // current input value
  const navigate = useNavigate();

  useEffect(() => {
  getAllCategories().then((data) =>
    setAllCategories(data.sort((a, b) => a.label.localeCompare(b.label)))
  );
}, [user]);


  const handleSubmitCategory = (e) => {
    e.preventDefault();
    if (!category.trim()) return;
    CreateNewCategory(category)
  .then(() => {
    setCategory("");
    return getAllCategories();
  })
  .then((data) =>
    setAllCategories(data.sort((a, b) => a.label.localeCompare(b.label)))
  )
  };

  const handleDeleteCategory = (id) => {
    DeleteCategory(id)
      .then(() => getAllCategories())
.then((data) =>
  setAllCategories(data.sort((a, b) => a.label.localeCompare(b.label)))
)};

const handleUpdateCategory = () => {
  if (!editLabel.trim()) return;

  updateCategory(editCategory.id, { label: editLabel })
    .then(() => {
      setEditCategory(null); // close modal
      return getAllCategories();
    })
    .then((data) => {
      const sorted = data.sort((a, b) => a.label.localeCompare(b.label));
      setAllCategories(sorted);
    })
    .catch((err) => {
      console.error("Update failed", err);
      // optional: show user feedback
    });
};


  const handleEditCategory = (category) => {
    setEditCategory(category); // object with id and label
    setEditLabel(category.label); // set input to current label
  };

  return (
    <article
      className="container"
      style={{ maxWidth: 600, margin: "2rem auto" }}
    >
      <header className="title is-3 has-text-centered mb-6">
        Category Manager
      </header>

      <section className="box mb-6">
        {allCategories.length === 0 ? (
          <p className="has-text-grey has-text-centered">
            No categories available.
          </p>
        ) : (
          allCategories.map((t) => (
            <div
              key={t.id}
              className="level is-mobile mb-3 p-3 box has-shadow is-clickable"
              style={{ borderRadius: "8px" }}
            >
              <div className="level-left">
                <p
                  className="is-size-5 has-text-link is-clickable"
                  onClick={() => navigate(`/categories/${t.id}/posts`)}
                >
                  {t.label}
                </p>
              </div>
              <div className="level-right">
                <button
                  className="button is-info is-medium mr-3"
                  aria-label={`Edit category ${t.label}`}
                  onClick={() => handleEditCategory(t)} // pass full category object
                >
                  <span className="icon">
                    <i className="fas fa-edit"></i>
                  </span>
                  <span>Edit</span>
                </button>
                <button
                  className="button is-danger is-medium"
                  aria-label={`Delete category ${t.label}`}
                  onClick={() => handleDeleteCategory(t.id)}
                >
                  <span className="icon">
                    <i className="fas fa-trash-alt"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="box">
        <form onSubmit={handleSubmitCategory}>
          <label className="label" htmlFor="new-category-input">
            Create New Category
          </label>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                id="new-category-input"
                className="input"
                type="text"
                placeholder="Add category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-describedby="category-helper"
                required
              />
              <p id="category-helper" className="help">
                Enter a short name for the new category.
              </p>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">
                <span className="icon">
                  <i className="fas fa-plus"></i>
                </span>
                <span>Create</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {editCategory && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setEditCategory(null)}
          ></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Category</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setEditCategory(null)}
              ></button>
            </header>
            <section className="modal-card-body">
              <input
                className="input"
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                placeholder="Edit category name"
              />
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={handleUpdateCategory}
              >
                Save
              </button>
              <button className="button" onClick={() => setEditCategory(null)}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </article>
  );
};
