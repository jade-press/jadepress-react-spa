
import React, { Component, PropTypes } from 'react'
import Post from './Post'

const Posts = function(posts, onLinkClick, ctx) {
	return (
		<div className="posts">
			{
				posts.map(Post(onLinkClick, ctx))
			}
		</div>
	)
}
export default Posts