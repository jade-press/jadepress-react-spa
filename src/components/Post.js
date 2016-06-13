
//Post

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CatLink from './CatLink'
import { createUrl, host, publicRoute } from '../lib/tools'

const Post = (onLinkClick, ctx) => {

	return post => {
		const url = createUrl(post, host, publicRoute.post)
		const isSingle = ctx.props.isSinglePost
		var link = ''
		if(isSingle) {
			link = <h2>{post.title}</h2>
		} else {
			link = (
				<h2>
					<a
						href={url}
						onClick={onLinkClick.bind(ctx, {
							_id: post._id
						}, url.replace(host, ''))}
					>
						{post.title}
					</a>
				</h2>
			)
		}
		return (
			<div className="post p-y-2" key={post._id}>
				{link}
				<hr />
				<p className="time">
					{'by '}
					<span className="text-muted">{post.createBy.name}</span>
					{', at '}
					<span className="text-muted">{post.createTime}</span>
					{', in '}
					{
						post.cats.map(CatLink(onLinkClick, ctx, true))
					}
				</p>
				<div className="p-y-1" />
				<div className="post-content" dangerouslySetInnerHTML={ {__html: post.html} } />
			</div>
		)
	}

}

export default Post