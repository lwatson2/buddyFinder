import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = props => {
  const [fullGroup, setFullGroup] = useState([]);
  return (
    <PostContext.Provider value={[fullGroup, setFullGroup]}>
      {props.children}
    </PostContext.Provider>
  );
};
