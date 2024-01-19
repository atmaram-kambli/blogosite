import React from 'react';
import { Link } from 'react-router-dom';

function BlogList({ blogs, title }) {

    return (
        <div className="bloglist">
            <h1>{ title }</h1>
            { blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={ `/blog/${blog.id}` }>
                        <h2>{ blog.title }</h2>
                        <p>Written by { blog.author } </p>
                        <button>Review Blog</button>
                    </Link>
                </div>
            )) }
        </div>
    )
}

export default BlogList