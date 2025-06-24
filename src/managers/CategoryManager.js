export const getAllCategories = () => {
  return fetch("http://localhost:8088/categories").then((res) => res.json())
}

export const CreateNewCategory = (label) => {
    return fetch("http://localhost:8088/categories", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ label })
})
  .then(res => res.json())
};

export const DeleteCategory = (id) => {
    return fetch(`http://localhost:8088/categories/${id}`, {
        method: 'DELETE',
    })
};

export const updateCategory = (categoryId, updatedCategory) => {
  return fetch(`http://localhost:8088/categories/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCategory),
  })
}