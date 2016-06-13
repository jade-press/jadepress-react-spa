import React from 'react'

const Title = title => {
	if(title) return (
		<div>	
			<h1>{title}</h1>
			<hr />
		</div>
	)
	else return ''
}

export default Title