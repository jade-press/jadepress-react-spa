
import React, { Component, PropTypes } from 'react'
import Post from './Post'

const Posts = function(posts, onLinkClick, ctx) {

	if(posts.length) return (
		<div className="posts">
			{
				posts.map(Post(onLinkClick, ctx))
			}
		</div>
	)
	else return (
		<div className="posts p-x-1 p-y-2">no result</div>
	)
}
export default Posts