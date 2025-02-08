import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_POSTS = gql`
query{
  getPosts {
    id
    title
  }
}
`
const GetPosts = () => {
const {loading:getPostsDataLoading,error:getPostsDataError,data:getPostsData} = useQuery(GET_POSTS);
  return (
    <div>
        GetPosts
        {getPostsData?.getPosts?.map((gp)=>
          <p key={gp.id}>{gp.title}</p>
        )}
    </div>
  )
}

export default GetPosts