import React from 'react'

const Title = title => {
	if(title) return (
		<div>	
			<h1>{title}</h1>
			<div className="p-y-2" />
		</div>
	)
	else return ''
}

export default Title