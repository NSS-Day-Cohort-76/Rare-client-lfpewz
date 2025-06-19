export const DeleteTag = (id) => {
    return fetch(`http://localhost:8088/tags/${id}`, {
        method: 'DELETE',
    })
};