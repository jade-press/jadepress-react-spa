import React from 'react'
import { Link } from 'react-router'
import { createUrl, host, publicRoute } from '../common/constants'

const CatLink = (cat, index, sep) =>  {

	const url = createUrl(cat, '', publicRoute.cat)
	return (
		<span key={cat._id}>
			{index && sep?', ':''}
			<Link
				to={url}
				title={cat.desc || cat.name}
			>{cat.name}</Link>
		</span>
	)

}

export default CatLink