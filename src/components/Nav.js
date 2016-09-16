import { Component } from 'react'
import CatLink from './CatLink'
import { siteName, host } from '../common/constants'
import { Link, browserHistory } from 'react-router'
import { types } from '../reducers'

export default class Nav extends Component {

	constructor (props) {
		super(props)
	}

	onChange(e) {
		let { setProp } = this.props
		let {query} = this.props.location
		setProp({
			type: types.set_query,
			data: Object.assign(query, {
				title: e.target.title
			})
		})
	}

	onSearch(e) {
		e.preventDefault()
		let query = this.props.query
		browserHistory.pushState(`/s?title=${query.title}`)
	}

	render () {

		let {query} = this.props.location

		return (

			<div id="nav" className="col-sm-4 col-md-4 col-lg-3">

				<div className="hidden-sm-up clearfix p-y-1">
					<Link to="/">{siteName}</Link>
					<button className="navbar-toggler pull-xs-right" type="button" data-toggle="collapse" data-target="#menus">&#9776;</button>
				</div>

				<nav id="menus" className="collapse">
					<div className="p-y-1" />
					<div className="lists text-sm-right">
						<div className="hidden-sm-down">
							<Link to="/" className="font-weight-bold form-control-lg">{siteName}</Link>
							<hr />
						</div>

						<form action={host + '/s'} onSubmit={this.onSearch.bind(this)}>
							<div className="form-group">
								<div className="input-group">
									<input className="form-control" name="title" type="search" value={query.title} onChange={this.onChange.bind(this)} />
									<span className="input-group-btn">
										<button className="btn btn-secondary" type="submit">search</button>
									</span>
								</div>
							</div>
						</form>

						{(this.props.cats || []).map(CatLink)}
					</div>
					
					<div className="p-y-1 hidden-sm-up" />
				</nav>

			</div>

		)
	}
}