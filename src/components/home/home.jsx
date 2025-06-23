import { useEffect, useState } from "react"
import { getMostRecentPost } from "../../managers/PostManager.js";


export const HomePageDisplay = () => {
    const [mostRecentPost, setMostRecentPost] = useState({});
    // const [ subscribedPosts, setSubscribedPosts] = useState([]);  // WILL USE THIS FOR FINAL HOMEPAGE CREATION WITH SUBSCRIBED POSTS

  useEffect(() => {
    getMostRecentPost().then(setMostRecentPost);
    console.log("🔍 Most Recent Post received:");
  }, []);
    
    return (<section className="section">
        <div className="container box has-text-centered">
            <h1 className="title is-3 mb-4">{mostRecentPost.title}</h1>

            {mostRecentPost.image_url && (
            <figure className="image mb-4 is-flex is-justify-content-center">
                <img src={mostRecentPost.image_url} 
                alt={mostRecentPost.title}
                style={{ maxWidth: "800px", maxHeight: "500px", width: "auto", height: "auto" }}
            />
            </figure>
            )}

            <p className="is-size-6 has-text-grey mb-2">
            <strong>By:</strong> {mostRecentPost.author} &nbsp;|&nbsp;
            <strong>Category:</strong> {mostRecentPost.category?.label}
            </p>

            {mostRecentPost.tags && mostRecentPost.tags.length > 0 && (
            <div className="mb-3">
                <strong>Tags:</strong>
                {mostRecentPost.tags.map(tag => (
                <span key={tag.id} className="tag is-info is-light ml-2">
                    {tag.label}
                </span>
                ))}
            </div>
            )}

            <div className="content mt-4">
            <p>{mostRecentPost.content}</p>
            </div>
        </div>
        </section>
    )
}