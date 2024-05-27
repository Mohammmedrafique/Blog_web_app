// import React, { useState, useEffect } from "react";
// import { FaStar } from "react-icons/fa";
// import { MdOutlineWavingHand, MdWavingHand } from "react-icons/md";
// import { BsThreeDots } from "react-icons/bs";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import api from "../../api";
// const CommentItem = ({ comment, activeUser }) => {
//   const navigate = useNavigate();
//   const [likeCount, setLikeCount] = useState(comment.likeCount);
//   const [likeStatus, setLikeStatus] = useState(false);

//   useEffect(() => {
//     const getCommentLikeStatus = async () => {
//       const comment_id = comment._id;
//       try {
//         const { data } = await api.post(
//           `/comment/${comment_id}/getCommentLikeStatus`,
//           { activeUser },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             },
//           }
//         );
//         setLikeStatus(data.likeStatus);
//       } catch (error) {
//         localStorage.removeItem("authToken");
//         navigate("/");
//       }
//     };

//     getCommentLikeStatus();
//   }, []);
//   const editDate = (createdAt) => {
//     const d = new Date(createdAt);
//     var datestring =
//       d.toLocaleString("eng", { month: "long" }).substring(0, 3) +
//       " " +
//       d.getDate();
//     return datestring;
//   };

//   const handleCommentLike = async () => {
//     console.log("like comment ıtem ın  basıldı ");

//     const comment_id = comment._id;

//     try {
//       const { data } = await axios.post(
//         `/comment/${comment_id}/like`,
//         { activeUser },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         }
//       );

//       setLikeCount(data.data.likeCount);
//       setLikeStatus(data.likeStatus);
//     } catch (error) {
//       localStorage.removeItem("authToken");
//       navigate("/");
//     }
//   };

//   return (
//     <div className="comment-item">
//       <div className="comment-top-block">
//         <section>
//           <img
//             src={`${process.env.REACT_APP_BACKEND_URL}/userPhotos/${comment.author.photo}`}
//             alt={comment.author.username}
//             width="35"
//           />

//           <div>
//             <span className="comment-author-username">
//               {comment.author.username}
//             </span>
//             <span className="comment-createdAt">
//               {editDate(comment.createdAt)}
//             </span>
//           </div>
//         </section>

//         <section>
//           <BsThreeDots />
//         </section>
//       </div>

//       <div className="comment-content">
//         <span dangerouslySetInnerHTML={{ __html: comment.content }}></span>
//       </div>

//       <div className="comment-bottom-block">
//         <div className="commentLike-wrapper">
//           <i className="biLike" onClick={() => handleCommentLike()}>
//             {likeStatus ? <MdWavingHand /> : <MdOutlineWavingHand />}
//           </i>
//           <span className="commentlikeCount">{likeCount}</span>
//         </div>

//         <div className="comment-star">
//           {[...Array(5)].map((_, index) => {
//             return (
//               <FaStar
//                 key={index}
//                 className="star"
//                 size={15}
//                 color={comment.star > index ? "#0205b1" : "grey"}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentItem;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import { MdOutlineWavingHand, MdWavingHand } from "react-icons/md";
// import { BsThreeDots } from "react-icons/bs";
// import api from "../../api";

// const CommentItem = ({ comment, getStoryComments, activeUser }) => {
//   const [likeCount, setLikeCount] = useState(comment.likeCount);
//   const [likeStatus, setLikeStatus] = useState(false);
//   const [isAuthor, setIsAuthor] = useState(false); // State to track if the active user is the author of the comment

//   useEffect(() => {
//     const getCommentLikeStatus = async () => {
//       const comment_id = comment._id;
//       try {
//         const { data } = await api.post(
//           `/comment/${comment_id}/getCommentLikeStatus`,
//           { activeUser },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             },
//           }
//         );
//         setLikeStatus(data.likeStatus);
//       } catch (error) {
//         console.error("Error getting comment like status:", error);
//         // Handle error (e.g., logout and redirect to login page)
//       }
//     };

//     getCommentLikeStatus();

//     // Check if the active user is the author of the comment
//     setIsAuthor(activeUser && activeUser._id === comment.author._id);
//   }, [activeUser, comment]);

//   const handleCommentLike = async () => {
//     const comment_id = comment._id;

//     try {
//       const { data } = await axios.post(
//         `/comment/${comment_id}/like`,
//         { activeUser },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         }
//       );

//       setLikeCount(data.data.likeCount);
//       setLikeStatus(data.likeStatus);
//     } catch (error) {
//       console.error("Error liking comment:", error);
//       // Handle error (e.g., logout and redirect to login page)
//     }
//   };

//   const handleDeleteComment = async () => {
//     const comment_id = comment._id;

//     try {
//       await api.delete(`/comment/${comment_id}/delete`, {
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       });
//       getStoryComments();
//       // Optionally, you can perform additional actions after successful deletion,
//       // such as updating the UI or fetching the updated comment list.
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       // Handle error (e.g., logout and redirect to login page)
//     }
//   };

//   const editDate = (createdAt) => {
//     const d = new Date(createdAt);
//     var datestring =
//       d.toLocaleString("eng", { month: "long" }).substring(0, 3) +
//       " " +
//       d.getDate();
//     return datestring;
//   };

//   return (
//     <div className="comment-item">
//       <div className="comment-top-block">
//         <section>
//           <img
//             src={`${process.env.REACT_APP_BACKEND_URL}/userPhotos/${comment.author.photo}`}
//             alt={comment.author.username}
//             width="35"
//           />
//           <div>
//             <span className="comment-author-username">
//               {comment.author.username}
//             </span>
//             <span className="comment-createdAt">
//               {editDate(comment.createdAt)}
//             </span>
//           </div>
//         </section>
//         <section>
//           {isAuthor && <BsThreeDots />}
//           {isAuthor && (
//             <button onClick={handleDeleteComment}>Delete</button>
//           )}
//           {/* Delete button */}
//         </section>
//       </div>
//       <div className="comment-content">
//         <span dangerouslySetInnerHTML={{ __html: comment.content }}></span>
//       </div>
//       <div className="comment-bottom-block">
//         <div className="commentLike-wrapper">
//           <i className="biLike" onClick={handleCommentLike}>
//             {likeStatus ? <MdWavingHand /> : <MdOutlineWavingHand />}
//           </i>
//           <span className="commentlikeCount">{likeCount}</span>
//         </div>
//         <div className="comment-star">
//           {[...Array(5)].map((_, index) => {
//             return (
//               <FaStar
//                 key={index}
//                 className="star"
//                 size={15}
//                 color={comment.star > index ? "#0205b1" : "grey"}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentItem;

// working


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import { MdOutlineWavingHand, MdWavingHand } from "react-icons/md";
// import { BsThreeDots } from "react-icons/bs";
// import api from "../../api";

// const CommentItem = ({ comment, getStoryComments, activeUser }) => {
//   const [likeCount, setLikeCount] = useState(comment.likeCount);
//   const [likeStatus, setLikeStatus] = useState(false);
//   const [isAuthor, setIsAuthor] = useState(false);
//   const [editMode, setEditMode] = useState(false); // State to track edit mode
//   const [editedContent, setEditedContent] = useState(comment.content); // State to hold edited content

//   useEffect(() => {
//     const getCommentLikeStatus = async () => {
//       const comment_id = comment._id;
//       try {
//         const { data } = await api.post(
//           `/comment/${comment_id}/getCommentLikeStatus`,
//           { activeUser },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             },
//           }
//         );
//         setLikeStatus(data.likeStatus);
//       } catch (error) {
//         console.error("Error getting comment like status:", error);
//       }
//     };

//     getCommentLikeStatus();

//     setIsAuthor(activeUser && activeUser._id === comment.author._id);
//   }, [activeUser, comment]);

//   const handleCommentLike = async () => {
//     const comment_id = comment._id;

//     try {
//       const { data } = await axios.post(
//         `/comment/${comment_id}/like`,
//         { activeUser },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         }
//       );

//       setLikeCount(data.data.likeCount);
//       setLikeStatus(data.likeStatus);
//     } catch (error) {
//       console.error("Error liking comment:", error);
//     }
//   };

//   const handleDeleteComment = async () => {
//     const comment_id = comment._id;

//     try {
//       await api.delete(`/comment/${comment_id}/delete`, {
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       });
//       getStoryComments();
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };

//   const handleEditComment = async () => {
//     const comment_id = comment._id;

//     try {
//       await api.put(
//         `/comment/${comment_id}/edit`,
//         { content: editedContent },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         }
//       );
//       // Exit edit mode after successfully editing the comment
//       setEditMode(false);
//       getStoryComments();
//     } catch (error) {
//       console.error("Error editing comment:", error);
//     }
//   };

//   const editDate = (createdAt) => {
//     const d = new Date(createdAt);
//     var datestring =
//       d.toLocaleString("eng", { month: "long" }).substring(0, 3) +
//       " " +
//       d.getDate();
//     return datestring;
//   };

//   return (
//     <div className="comment-item">
//       <div className="comment-top-block">
//         <section>
//           <img
//             src={`${process.env.REACT_APP_BACKEND_URL}/userPhotos/${comment.author.photo}`}
//             alt={comment.author.username}
//             width="35"
//           />
//           <div>
//             <span className="comment-author-username">
//               {comment.author.username}
//             </span>
//             <span className="comment-createdAt">
//               {editDate(comment.createdAt)}
//             </span>
//           </div>
//         </section>
//         <section>
//           {isAuthor && <BsThreeDots />}
//           {isAuthor && (
//             <>
//               <button onClick={handleDeleteComment}>Delete</button>
//               {!editMode && (
//                 <button onClick={() => setEditMode(true)}>Edit</button>
//               )}
//               {editMode && (
//                 <button onClick={handleEditComment}>Save</button>
//               )}
//             </>
//           )}
//         </section>
//       </div>
//       <div className="comment-content">
//         {!editMode ? (
//           <span dangerouslySetInnerHTML={{ __html: comment.content }}></span>
//         ) : (
//           <textarea
//             value={editedContent}
//             onChange={(e) => setEditedContent(e.target.value)}
//           />
//         )}
//       </div>
//       <div className="comment-bottom-block">
//         <div className="commentLike-wrapper">
//           <i className="biLike" onClick={handleCommentLike}>
//             {likeStatus ? <MdWavingHand /> : <MdOutlineWavingHand />}
//           </i>
//           <span className="commentlikeCount">{likeCount}</span>
//         </div>
//         <div className="comment-star">
//           {[...Array(5)].map((_, index) => {
//             return (
//               <FaStar
//                 key={index}
//                 className="star"
//                 size={15}
//                 color={comment.star > index ? "#0205b1" : "grey"}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentItem;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { MdOutlineWavingHand, MdWavingHand } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import api from "../../api";

const CommentItem = ({ comment, getStoryComments, activeUser }) => {
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [likeStatus, setLikeStatus] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [editedContent, setEditedContent] = useState(comment.content); // State to hold edited content

  useEffect(() => {
    const getCommentLikeStatus = async () => {
      const comment_id = comment._id;
      try {
        const { data } = await api.post(
          `/comment/${comment_id}/getCommentLikeStatus`,
          { activeUser },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setLikeStatus(data.likeStatus);
      } catch (error) {
        console.error("Error getting comment like status:", error);
      }
    };

    getCommentLikeStatus();

    setIsAuthor(activeUser && activeUser._id === comment.author._id);
  }, [activeUser, comment]);

  const handleCommentLike = async () => {
    const comment_id = comment._id;

    try {
      const { data } = await axios.post(
        `/comment/${comment_id}/like`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setLikeCount(data.data.likeCount);
      setLikeStatus(data.likeStatus);
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleDeleteComment = async () => {
    const comment_id = comment._id;

    try {
      await api.delete(`/comment/${comment_id}/delete`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      getStoryComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async () => {
    const comment_id = comment._id;

    try {
      await api.put(
        `/comment/${comment_id}/edit`,
        { content: editedContent },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      // Exit edit mode after successfully editing the comment
      setEditMode(false);
      getStoryComments();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const editDate = (createdAt) => {
    const d = new Date(createdAt);
    var datestring =
      d.toLocaleString("eng", { month: "long" }).substring(0, 3) +
      " " +
      d.getDate();
    return datestring;
  };

  return (
    <div className="comment-item">
      <div className="comment-top-block">
        <section>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/userPhotos/${comment.author.photo}`}
            alt={comment.author.username}
            width="35"
          />
          <div>
            <span className="comment-author-username">
              {comment.author.username}
            </span>
            <span className="comment-createdAt">
              {editDate(comment.createdAt)}
            </span>
          </div>
        </section>
        <section>
          {isAuthor && <BsThreeDots />}
          {isAuthor && (
            <>
              <button style={{padding: '8px 16px', marginRight: '8px', borderRadius: '4px', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer', transition: 'background-color 0.3s ease'}} onClick={handleDeleteComment}>Delete</button>
              {!editMode && (
                <button style={{padding: '8px 16px', marginRight: '8px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', transition: 'background-color 0.3s ease'}} onClick={() => setEditMode(true)}>Edit</button>
              )}
              {editMode && (
                <button style={{padding: '8px 16px', marginRight: '8px', borderRadius: '4px', backgroundColor: '#28a745', color: '#fff', cursor: 'pointer', transition: 'background-color 0.3s ease'}} onClick={handleEditComment}>Save</button>
              )}
            </>
          )}
        </section>
      </div>
      <div className="comment-content">
        {!editMode ? (
          <span dangerouslySetInnerHTML={{ __html: comment.content }}></span>
        ) : (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        )}
      </div>
      <div className="comment-bottom-block">
        <div className="commentLike-wrapper">
          <i className="biLike" onClick={handleCommentLike}>
            {likeStatus ? <MdWavingHand /> : <MdOutlineWavingHand />}
          </i>
          <span className="commentlikeCount">{likeCount}</span>
        </div>
        <div className="comment-star">
          {[...Array(5)].map((_, index) => {
            return (
              <FaStar
                key={index}
                className="star"
                size={15}
                color={comment.star > index ? "#0205b1" : "grey"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
