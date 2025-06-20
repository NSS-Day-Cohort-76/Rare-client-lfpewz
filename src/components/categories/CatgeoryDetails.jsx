import { useEffect, useState } from "react";
import { CreateNewCategory, DeleteCategory, getAllCategories } from "../../managers/CategoryManager.js"; 
import { useNavigate } from "react-router-dom";

export const CategoryManager = () => {
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then(setAllCategories);
  }, []);

  const handleSubmitCategory = (e) => {
    e.preventDefault();
    if (!category.trim()) return;
    CreateNewCategory(category)
      .then(() => {
        setCategory(""); // Clear input
        return getAllCategories();
      })
      .then(setAllCategories);
  };

  const handleDeleteCategory = (id) => {
    DeleteCategory(id)
      .then(() => getAllCategories())
      .then(setAllCategories);
  };

  const handleEditCategory = (id) => {
    navigate(`/editcategory/${id}`);
  };

  return (
    <article className="container" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <header className="title is-3 has-text-centered mb-6">Category Manager</header>

      <section className="box mb-6">
        {allCategories.length === 0 ? (
          <p className="has-text-grey has-text-centered">No categorys available.</p>
        ) : (
          allCategories.map((t) => (
            <div
              key={t.id}
              className="level is-mobile mb-3 p-3 box has-shadow is-clickable"
              style={{ borderRadius: "8px" }}
            >
              <div className="level-left">
                <p className="is-size-5">{t.label}</p>
              </div>
              <div className="level-right">
                <button
                  className="button is-info is-medium mr-3"
                  aria-label={`Edit category ${t.label}`}
                  onClick={() => handleEditCategory(t.id)}
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
                required
              />
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
    </article>
  );
};