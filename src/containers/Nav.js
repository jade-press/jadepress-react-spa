import React, { Component } from 'react'
import CatLink from '../components/CatLink'
import { siteName, host } from '../lib/tools'

export default class Nav extends Component {

	render() {

		return (

			<div id="nav" className="col-sm-4 col-md-4 col-lg-3">

				<div className="hidden-sm-up clearfix p-y-1">
					<a href={host} onClick={this.props.onLinkClick.bind(this, {}, '/')}>{siteName}</a>
					<button className="navbar-toggler pull-xs-right" type="button" data-toggle="collapse" data-target="#menus">&#9776;</button>
				</div>

				<nav id="menus" className="collapse">
					<div className="p-y-1" />
					<div className="lists text-sm-right">
						<div className="hidden-sm-down">
							<a href={host} className="font-weight-bold form-control-lg" onClick={this.props.onLinkClick.bind(this, {}, '/')}>{siteName}</a>
							<hr />
						</div>

						<form action={host + '/s'} onSubmit={this.props.onSearch.bind(this)}>
							<div className="form-group">
								<div className="input-group">
									<input className="form-control" name="title" type="search" defaultValue={this.props.query.title} onChange={this.props.onChange.bind(this)} />
									<span className="input-group-btn">
										<button className="btn btn-secondary" type="submit">search</button>
									</span>
								</div>
							</div>
						</form>

						{this.props.cats.map(CatLink(this.props.onLinkClick, this))}
					</div>
					
					<div className="p-y-1 hidden-sm-up" />
				</nav>

			</div>

		)
	}
}