import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatRoom = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selected_Users_Name, selectedUsersName] = useState([]);
  
  const [roomId, setRoomId] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  const token = localStorage.getItem('accessToken');
  const createRoom = async () => {
    console.log(...selectedUsers);
    const token = localStorage.getItem('accessToken');
  
    try {
      const response = await axios.post('http://localhost:5000/api/createRoom', {
        selectedUsers,selected_Users_Name
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Error in the API request');
      }
  
      const data = response.data;
      setRoomId(data.roomId);
    } catch (error) {
      console.error('Error creating room:', error);
      // Handle error here
    }
  };


  




useEffect(() => {
    const fetchPosts = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:5000/api/users/profile', true);
      xhr.setRequestHeader('Authorization', token);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            setPosts(JSON.parse(xhr.responseText));
            console.log(posts);
          } else {
            console.error('Error fetching products:', xhr.statusText);
          }
        }
      };
    };


    fetchPosts();
  }, []);

  useEffect(() => {
    if (roomId) {
      navigate(`/chat/${roomId}`);
    }
  }, [roomId, navigate]);

  return (
    <div>
      <h1>Select users to chat with:</h1>
      <div>
        {posts.map((user) => (
          <div key={user.id}>
            <input
              type="checkbox"
              value={user.id}
              checked={selectedUsers.includes(user.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedUsers([...selectedUsers, user.id]);
                  selectedUsersName([...selected_Users_Name, user.name])
                } else {
                  setSelectedUsers(selectedUsers.filter((id) => id !== user.id));
                }
              }}
            />
            <label>{user.name}</label>
          </div>
        ))}
      </div>
      <button onClick={createRoom}>Create Room</button>
    </div>
  );
};

export default ChatRoom;





