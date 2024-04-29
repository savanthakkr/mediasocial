import React, { useState, useEffect } from 'react';

const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://localhost:5000/api/api/getFollowing/${userId}`, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.onload = function () {
          if (xhr.status === 200) {
            setIsFollowing(xhr.responseText === 'true');
          } else {
            console.error('Error fetching following status:', xhr.statusText);
          }
        };
        xhr.send();
      } catch (error) {
        console.error('Error fetching following status:', error);
      }
    };

    if (token) {
      checkFollowingStatus();
    }
  }, [token, userId]);

  const handleFollowClick = async () => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `http://localhost:5000/api/follow/${userId}`, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.onload = function () {
        if (xhr.status === 200) {
          setIsFollowing(true);
          // Add your code here to show a success message or update the UI
        } else {
          console.error('Error following user:', xhr.responseText);
        }
      };
      xhr.send();
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollowClick = async () => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `http://localhost:5000/api/unfollow/${userId}`, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.onload = function () {
        if (xhr.status === 200) {
          setIsFollowing(false);
          // Add your code here to show a success message or update the UI
        } else {
          console.error('Error unfollowing user:', xhr.responseText);
        }
      };
      xhr.send();
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <button onClick={isFollowing ? handleUnfollowClick : handleFollowClick}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;