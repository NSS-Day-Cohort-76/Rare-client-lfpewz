export const CreateNewTag = (label) => {
    return fetch("http://localhost:8088/tags", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ label })
})
  .then(res => res.json())
};