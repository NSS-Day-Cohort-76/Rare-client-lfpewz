export const EditTag = (id, tag) => {
    return fetch(`http://localhost:8088/tags/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tag)
    }).then((res) => {
        if (res.status === 204) return {}; // No content, update successful
        return res.json(); // For error cases
    });
};