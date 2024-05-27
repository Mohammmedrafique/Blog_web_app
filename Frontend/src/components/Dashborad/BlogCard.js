import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./BlogCard.module.css";

const BlogCard = ({ post, onEdit, onDelete }) => {
  return (
    <div className={styles.blogCard}>
      <h2>{post.title}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: post.content.substring(0, 200) + "...",
        }}
      />
      <div className={styles.actions}>
        <button className={styles.editBtn}>
          <FaEdit /> Visit your blog through Homepage to edit and delte
        </button>
        {/* <button onClick={() => onDelete(post._id)} className={styles.deleteBtn}>
          <FaTrash /> Delete
        </button> */}
      </div>
    </div>
  );
};

export default BlogCard;
