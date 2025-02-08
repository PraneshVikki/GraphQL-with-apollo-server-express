import React, { useState } from 'react'
import {gql, useMutation, useQuery} from '@apollo/client';

const CREATE_POST = gql`
mutation CreatePost(    
    $id: ID!,
    $title: String!,
    $content: String,
    $author_id: ID!
    ){
  createPost(postInput: {id: $id, title: $title,content: $content,author_id: $author_id}) {
    title
  }
}
`

const CreatePosts = () => {
const [updateCreatePost,{data:createPostData,loading:createPostLoading,error:createPostError}] = useMutation(CREATE_POST);
const [formData, setFormData] = useState({
    id:'',
    title:'',
    content:'',
    author_id:''

})

const handleSubmit = (event) => {
    event.preventDefault();
    updateCreatePost({
        variables: {
            id: formData.id,
            title: formData.title,
            content: formData.content,
            author_id: formData.author_id
        }
    })
}

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log(createPostData);

  return (
    <div>
        <p>CreatePosts</p>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name='id' onChange={handleInputChange}/>
            <input type="text" name='title' onChange={handleInputChange}/>
            <input type="text" name='content' onChange={handleInputChange}/>
            <input type="text" name='author_id' onChange={handleInputChange}/>
            <button type='submit'>Create Post</button>
            <p>{createPostData?.createPost?.title}</p>
        </form>
    </div>
  )
}

export default CreatePosts