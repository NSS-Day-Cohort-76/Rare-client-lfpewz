export const CreateNewTag = (taco) => {
    return fetch(`http://localhost:8088/tags`, {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(taco)
    } ).then((res) => res.json())
};