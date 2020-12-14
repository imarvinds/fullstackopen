var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog => {
        likes = likes + blog.likes
    }); 

    return blogs.length === 1
        ? blogs[0].likes
        : likes
}

const favoriteBlog = (blogs) => {
    let favBlogDetails 
    let likes = blogs.map(blog => blog.likes)
    let mostLiked = Math.max(...likes) 
    blogs.forEach(blog => {
        if (blog.likes === mostLiked){
            favBlogDetails = { title: blog.title, author: blog.author, likes: blog.likes }
        }
    })
    return favBlogDetails
}

const mostBlogs = (blogs) => {
    let bloggers = blogs.map(blog => blog.author)
    let mostBlogged = { author: _.max(bloggers), blogs: bloggers.filter(blogger => blogger === _.max(bloggers)).length}
    return mostBlogged
}

const mostLikes = (blogs) => {
    let obj = {}
    blogs.forEach(blog => {
        !obj[blog.author] 
            ? obj[blog.author] = blog.likes  
            : obj[blog.author] += blog.likes 
    }) 
    
    let mostLiked = { 
        author: Object.keys(obj).find(key => obj[key] === _.max(_.values(obj))), 
        likes: _.max(_.values(obj))
    }
    
    return mostLiked
}
  

module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}