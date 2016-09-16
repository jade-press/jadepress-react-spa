
const Title = title => {
	return title
		?<div>	
			<h1>{title}</h1>
			<div className="p-y-2" />
		</div>
		:null
}

export default Title