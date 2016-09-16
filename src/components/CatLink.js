
import { Link } from 'react-router'
import { createUrl, host, publicRoute } from '../common/constants'

const CatLink = (cat, index) =>  {

	const url = createUrl(cat, '', publicRoute.cat)
	return (
		<span key={cat._id}>
			{index?', ':''}
			<Link
				to={url}
				title={cat.desc || cat.name}
			>{cat.name}</Link>
		</span>
	)

}

export default CatLink