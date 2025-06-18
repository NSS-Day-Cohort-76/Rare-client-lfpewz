import { useEffect, useState } from "react";
import { GetAllTags } from "../../services/getAllTags.jsx";
import { CreateNewTag } from "../../services/createNewtag.jsx";

export const TagManager = () => {
    const [tag, setTag] = useState([]);
    


    useEffect(() => {
        GetAllTags().then(setTag)
    }, []);

    const handleSubmitTag = (e) => {
        e.preventDefault()
        const newTag = {
            id: tag.id,
            label: tag.label
        }
        CreateNewTag(newTag)
        .then(() => {
            console.log("New tag added!");
        })
    }
    return (
        <article className="container">
            <header className="header">Hello Tag Manager!</header>
            <section className="">
                <div>This is where the list of mapped tags will go!</div>
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