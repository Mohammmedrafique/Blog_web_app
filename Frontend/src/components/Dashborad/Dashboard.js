import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonStory from "../Skeletons/SkeletonStory";
import CardStory from "../StoryScreens/CardStory";
import NoStories from "../StoryScreens/NoStories";
import "../../Css/Home.css";
import api from "../../api";
import { AuthContext } from "../../Context/AuthContext";

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { activeUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getStories = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/story/showUserStories?authorId=${activeUser._id}`
        );
        setStories(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getStories();
  }, [activeUser]);

  return (
    <div className="Inclusive-home-page">
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "Staatliches",
          marginTop: "10px",
        }}
      >
        Your Blog
      </h3>
      {loading ? (
        <div className="skeleton_emp">
          {[...Array(6)].map((_, index) => (
            <SkeletonStory key={index} />
          ))}
        </div>
      ) : (
        <div>
          <div className="story-card-wrapper">
            {stories.length !== 0 ? (
              stories.map((story) => (
                <CardStory key={story._id} story={story} />
              ))
            ) : (
              <NoStories />
            )}
          </div>
        </div>
      )}
      <br />
    </div>
  );
};

export default Dashboard;
