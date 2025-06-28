import { useEffect, useState } from "react";
import { GetAllTags } from "../../services/getAllTags.jsx";
import { CreateNewTag } from "../../services/createNewtag.jsx";
import { DeleteTag } from "../../services/DeleteTagService.jsx";
import { useNavigate } from "react-router-dom";
import "./tagmanager.css";

export const TagManager = () => {
  const [tag, setTag] = useState("");
  const [allTags, setAllTags] = useState([]);
  // Edit modal state
  const [editTag, setEditTag] = useState(null); // holds tag being edited
  const [editLabel, setEditLabel] = useState(""); // current input value
  const navigate = useNavigate();

  useEffect(() => {
    GetAllTags().then(setAllTags);
  }, []);

  const handleSubmitTag = (e) => {
    e.preventDefault();
    if (!tag.trim()) return;
    CreateNewTag(tag)
      .then(() => {
        setTag(""); // Clear input
        return GetAllTags();
      })
      .then(setAllTags);
  };

  const handleDeleteTag = (id) => {
    DeleteTag(id)
      .then(() => GetAllTags())
      .then(setAllTags);
  };

  // Open modal for editing
  const handleEditTag = (tagObj) => {
    setEditTag(tagObj); // object with id and label
    setEditLabel(tagObj.label); // set input to current label
  };

  // Update tag (you need to implement UpdateTag service)
  const handleUpdateTag = () => {
    if (!editLabel.trim()) return;
    // You must implement UpdateTag in your services, similar to updateCategory
    import("../../services/EditTagService.jsx").then(({ EditTag }) => {
      EditTag(editTag.id, { label: editLabel })
        .then(() => {
          setEditTag(null); // close modal
          return GetAllTags();
        })
        .then(setAllTags)
        .catch((err) => {
          console.error("Update failed", err);
        });
    });
  };

  return (
    <article className="tag-manager-container">
      <header className="tag-manager-header">
        <h1 className="title is-3 has-text-centered">📝 Tag Manager</h1>
        <p className="subtitle is-6 has-text-centered has-text-grey">
          Create, edit, and manage your tags.
        </p>
      </header>

      <section className="box tag-list">
        {allTags.length === 0 ? (
          <p className="has-text-grey has-text-centered">No tags available.</p>
        ) : (
          allTags
            .slice()
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((t) => (
              <div
                key={t.id}
                className="tag-item box is-clickable"
                onClick={() => handleEditTag(t)}
              >
                <div className="tag-label">{t.label}</div>
                <div className="tag-actions">
                  <button
                    className="button is-white is-small has-text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTag(t);
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-edit"></i>
                    </span>
                    <span>Edit</span>
                  </button>

                  <button
                    className="button is-white is-small has-text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTag(t.id);
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-trash-alt"></i>
                    </span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
        )}
      </section>

      <section className="box tag-create-form">
        <form onSubmit={handleSubmitTag}>
          <label className="label">Create New Tag</label>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                id="new-tag-input"
                className="input"
                type="text"
                placeholder="e.g., tech, food, art"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
              />
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">
                <i className="fas fa-plus mr-1"></i> Create
              </button>
            </div>
          </div>
        </form>
      </section>

      {editTag && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setEditTag(null)}
          ></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Tag</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setEditTag(null)}
              ></button>
            </header>
            <section className="modal-card-body">
              <input
                className="input"
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                placeholder="Edit tag name"
                autoFocus
              />
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleUpdateTag}>
                Save
              </button>
              <button className="button" onClick={() => setEditTag(null)}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </article>
  );
};
