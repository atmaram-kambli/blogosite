import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function NewBlog() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('John Doe')
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {title, body, author};
    setIsPending(true);

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "content-type": "application/json"},
      body: JSON.stringify(blog),
    }).then(() => {
      // console.log("New Blog Added");
      setIsPending(false);
      setSuccess("The blog is successfully added!")
      setTitle('');
      setBody('');
      setAuthor('John Doe');
      setTimeout(() => {
        setSuccess('');
        navigate(`/`);
      }, 2000);

      
    }).catch((error) => {
      setSuccess("Error occured in adding the blog.")
      setTimeout(() => {
        setSuccess('');
      }, 2000);
    })

  }


  return (
    <div className='create-blog'>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="blog-title">Blog Title</label>
        <input type="text" id='blog-title' onChange={(e) => (setTitle(e.target.value))} value={title} required />

        <label htmlFor="blog-body">Blog Body</label>
        <textarea name="blog-body" id="blog-body" onChange={(e) => (setBody(e.target.value))} value={body} required ></textarea>

        <label htmlFor="author">Author</label>
        <select name="author" id="author" onChange={(e) => (setAuthor(e.target.value))} value={author}>
          <option value="John Doe">John Doe</option>
          <option value="Mario Doe">Mario Doe</option>
          <option value="Jane Doe">Jane Doe</option>
        </select>
        { !isPending &&  <button>Add Blog</button> }
        { isPending &&  <button disabled>Adding blog...</button> }
        
        <p>{success}</p>

      </form>
    </div>
  )
}

export default NewBlog