import { useEffect, useState } from "react";
import { GetAllTags } from "../../services/getAllTags.jsx";
import { CreateNewTag } from "../../services/createNewtag.jsx";
import { DeleteTag } from "../../services/DeleteTagService.jsx";
import { EditTag } from "../../services/EditTagService.jsx";
import { useNavigate } from "react-router-dom";

export const TagManager = () => {
    const [tag, setTag] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        GetAllTags().then(setAllTags)
    }, []);
    
    
    const handleSubmitTag = (e) => {
        e.preventDefault();
        if (!tag.trim()) return;
        CreateNewTag(tag)
            .then(() => {
                setTag(""); // Clear input
                // Refresh tag list after adding new tag
                GetAllTags().then(setAllTags);
            })
};

    const handleDeleteTag = (id) => {
        DeleteTag(id).then(() => {
            GetAllTags().then(setAllTags)
        });
    };

    const handleEditTag = (id) => {
        EditTag(id).then(() => {
            GetAllTags().then(setAllTags).then(() => {
                navigate(`/edittag/:id`)
            })
        })
    }
    return (
        <article className="container">
            <header className="header">Hello Tag Manager!</header>
            <section className="">
                    
                    {Array.isArray(allTags) && allTags.map(t => (
                        <div key={t.id}>
                            <button
                            onClick={() => handleEditTag(t.id)}
                            >
                             ⚙️
                            </button>
                            <button 
                            onClick={() => handleDeleteTag(t.id)}
                            >
                             🗑️
                            </button>
                            {t.label}
                        </div>
                    ))}
                
            </section>
            <section className="">
                <form onSubmit={handleSubmitTag}>
                    <header>Create New Tag</header>
                    <input 
                    className=""
                    type="text"
                    placeholder="add tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    />
                    <button>Create</button>
                </form>
            </section>
        </article>
    )
};