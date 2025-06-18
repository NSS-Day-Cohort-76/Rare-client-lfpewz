import { useEffect, useState } from "react";
import { GetAllTags } from "../../services/getAllTags.jsx";
import { CreateNewTag } from "../../services/createNewtag.jsx";

export const TagManager = () => {
    const [tag, setTag] = useState([]);
    const [allTags, setAllTags] = useState([]);

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
    return (
        <article className="container">
            <header className="header">Hello Tag Manager!</header>
            <section className="">
                    
                    {Array.isArray(allTags) && allTags.map(t => (
                        <div key={t.id}>
                            <button>
                             ⚙️
                            </button>
                            <button>
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