import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import Loader from './Loader';

function BlogDetails() {

    const { id } = useParams();
    const { data:blog, isPending, error } = useFetch(`http://localhost:8000/blogs/${id}`)
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${blog.id}`, {
            method: "DELETE",
        }).then(() => {
            // navigate('/');
        })
    }

    return (
        <div className='blog-details'>
            {isPending && <Loader />}
            {error && <div>error</div>}
            { blog && (
                <article>
                    <h1>{ blog.title }</h1>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleDelete}>Delete blog</button>
                </article>
            ) }
        </div>
    )
}

export default BlogDetails