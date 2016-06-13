
import React from 'react'
import { createUrl, host, publicRoute } from '../lib/tools'

const CatLink = (onLinkClick, ctx, sep) =>  {

	return (cat, index) => {
		const url = createUrl(cat, host, publicRoute.cat)
		return (
			<span key={cat._id}>
				{index&&sep?', ':''}
				<a
					href={url}
					title={cat.desc || cat.name}
					onClick={
						onLinkClick.bind(ctx, {
							cat_id: cat._id
						}, url.replace(host, ''))
					}>{cat.name}</a>
			</span>
		)
	}
}

export default CatLink