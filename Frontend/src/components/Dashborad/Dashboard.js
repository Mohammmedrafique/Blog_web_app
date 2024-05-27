import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import BlogCard from "./BlogCard";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { activeUser, config } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null); // State to manage the post being edited
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let allPosts = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages) {
          const response = await axios.get(`https://masai-blog-ecru.vercel.app/story/getAllStories?page=${page}`, config);
          const { data, pages } = response.data;

          allPosts = [...allPosts, ...data];
          totalPages = pages;
          page++;
        }

        const userPosts = allPosts.filter(post => post.author === activeUser._id);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching posts", error);
      } finally {
        setLoading(false);
      }
    };

    if (activeUser._id) {
      fetchPosts();
    }
  }, [activeUser, config]);

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewTitle(post.title);
    setNewContent(post.content);
  };

  const saveEdit = async () => {
    try {
      const url = `http://localhost:5000/story/${editingPost._id}/edit`;
      const headers = { Authorization: `Bearer ${config.token}` };
      const response = await axios.put(
        url,
        { title: newTitle, content: newContent },
        { headers }
      );
      const updatedPost = response.data;
      setPosts(posts.map(p => p._id === editingPost._id ? updatedPost : p));
      setEditingPost(null);
    } catch (error) {
      console.error("Error editing post", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const url = `http://localhost:5000/story/${postId}/delete`;
      const headers = { Authorization: `Bearer ${config.token}` };
      await axios.delete(url, { headers });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Your Posts</h1>
      {posts.length > 0 ? (
        posts.map(post => (
          <BlogCard key={post._id} post={post} onEdit={handleEdit} onDelete={handleDelete} />
        ))
      ) : (
        <p>No posts found</p>
      )}

      {editingPost && (
        <div className={styles.editModal}>
          <h2>Edit Post</h2>
          <input 
            type="text" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
            placeholder="Title"
          />
          <textarea 
            value={newContent} 
            onChange={(e) => setNewContent(e.target.value)} 
            placeholder="Content"
          ></textarea>
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditingPost(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
