import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = () => {
    const [postContent, setPostContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editPostId, setEditPostId] = useState(null);

    const handlePost = async () => {
        try {
            const token = localStorage.getItem('token');
            if (isEditing) {
                await axios.put(`https://atlys-backend.onrender.com/api/posts/${editPostId}`, { content: postContent }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsEditing(false);
                setEditPostId(null);
            } else {
                await axios.post('https://atlys-backend.onrender.com/api/posts', { content: postContent }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setPostContent('');
            fetchPosts(); // Fetch posts after creating a new one
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (post) => {
        setIsEditing(true);
        setEditPostId(post._id);
        setPostContent(post.content);
    };

    const handleDelete = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://atlys-backend.onrender.com/api/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPosts(); // Fetch posts after deleting one
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://atlys-backend.onrender.com/api/posts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="modal">
            <h2>{isEditing ? 'Edit Post' : 'Create Post'}</h2>
            <input
                type="text"
                placeholder="How are you feeling today?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
            />
            <button onClick={handlePost}>{isEditing ? 'Update' : 'Post'}</button>

            <h3>Your Posts</h3>
            <div>
                {posts.map((post) => (
                    <div key={post._id} className="post">
                        <p>{post.content}</p>
                        <small>{new Date(post.createdAt).toLocaleString()}</small>
                        <button onClick={() => handleEdit(post)}>Edit</button>
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreatePost;




