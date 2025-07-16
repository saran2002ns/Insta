import axios from 'axios';
import React, { useEffect, useState } from 'react'
const API = 'http://localhost:8080/api';
import { useParams } from 'react-router-dom'

function Follower({id,totalPost}) {
    

    const path=`/follows/${id}`;
    const [follows,setFollows]=useState({});

    useEffect(() => {
      async function fetchData(){
        try {
          const response = await axios.get(API + path);
          console.log(response.data);
          setFollows(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();

    }, [path]);
  return (
    <div>
        <div className="flex space-x-8 mt-4 text-sm">
            <span><strong>{totalPost}</strong> posts</span>
            <span><strong>{follows.follows}</strong> followers</span>
            <span><strong>{follows.followers}</strong> following</span>
        </div>
    </div>
  )
}

export default Follower