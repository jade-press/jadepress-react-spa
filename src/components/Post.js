import React from 'react'
import catLink from './CatLink'
import { createUrl, host, publicRoute } from '../common/constants'
import { Link } from 'react-router'

const Post = (post, index, isSingle = false) => {

	const url = createUrl(post, '', publicRoute.post)
	let title = isSingle
		?null
		:<h2>
			<Link to={url}>
				{post.title}
			</Link>
		</h2>

	return (
		<div className="post p-y-2" key={post._id}>
			{title}
			<hr />
			<p className="time">
				{'by '}
				<span className="text-muted">{post.createBy.name}</span>
				{', at '}
				<span className="text-muted">{post.createTime}</span>
				{', in '}
				{
					post.cats.map(catLink)
				}
			</p>
			<div className="p-y-1" />
			<div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
		</div>
	)

}

export default Post