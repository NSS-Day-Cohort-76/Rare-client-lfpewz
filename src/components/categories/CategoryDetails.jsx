import { useEffect, useState } from "react";
import {
  CreateNewCategory,
  DeleteCategory,
  getAllCategories,
  updateCategory,
} from "../../managers/CategoryManager.js";
import { useNavigate } from "react-router-dom";
import "./categoryDetails.css";
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
      );
  };

  const handleDeleteCategory = (id) => {
    DeleteCategory(id)
      .then(() => getAllCategories())
      .then((data) =>
        setAllCategories(data.sort((a, b) => a.label.localeCompare(b.label)))
      );
  };

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

      {/* Category List */}
      <section className="box mb-6">
        {allCategories.length === 0 ? (
          <p className="has-text-grey has-text-centered">
            No categories available.
          </p>
        ) : (
          allCategories
            .slice()
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((cat) => (
              <div
                key={cat.id}
                className="level is-mobile mb-3 p-3 box has-shadow is-clickable"
                style={{ borderRadius: "8px" }}
              >
                <div className="level-left">
                  <p
                    className="is-size-5 has-text-link has-text-weight-medium"
                    onClick={() => navigate(`/categories/${cat.id}/posts`)}
                  >
                    {cat.label}
                  </p>
                </div>
                <div className="level-right">
                  <button
                    className="button is-info is-medium mr-3"
                    aria-label={`Edit category ${cat.label}`}
                    onClick={() => handleEditCategory(cat)}
                  >
                    <span className="icon">
                      <i className="fas fa-edit"></i>
                    </span>
                    <span>Edit</span>
                  </button>
                  <button
                    className="button is-danger is-medium"
                    aria-label={`Delete category ${cat.label}`}
                    onClick={() => handleDeleteCategory(cat.id)}
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

      {/* Create New Category */}
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
                required
                autoComplete="off"
              />
            </div>
            <div className="control">
              <button type="submit" className="button is-info is-medium">
                <span className="icon">
                  <i className="fas fa-plus"></i>
                </span>
                <span>Create</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Edit Modal */}
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
                autoFocus
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
