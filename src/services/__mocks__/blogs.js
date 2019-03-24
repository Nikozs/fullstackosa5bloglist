

let token = null

const blogs = [
    {
        id: "123",
        title: "Testi",
        author: "Pekka",
        url: "osoite",
        likes: "2"
    },
    {
        id: "456",
        title: "Testi2",
        author: "Pekka2",
        url: "osoite2",
        likes: "4"
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }