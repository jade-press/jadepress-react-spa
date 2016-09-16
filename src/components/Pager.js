import { Link } from 'react-router'
import { createUrl, host, publicRoute, maxLink, pageSize } from '../common/constants'
import { Component } from 'react'
import RPager from 'react-pagenav'

export default class Pager extends Component {

	constructor (props) {
		super(props)
	}

	unitRender() {

    return (unit, index) => {
      let {query, pathname} = this.props.location
      let span = unit.isPager
                ?<span aria-hidden={true} dangerouslySetInnerHTML={ {__html: unit.html} } />
                :<span dangerouslySetInnerHTML={ {__html: unit.html} } />

      let sr = unit.isPager
              ?<span className="sr-only" dangerouslySetInnerHTML={ {__html: unit.srHtml} } />
              :null

      let url = {
        pathname,
        query: {
          ...query,
          page: (unit.page === 1
                ?undefined
                :unit.page)
        }
      } 
        

      return (
        <li key={index} className={'page-item ' + unit.class}>
          <Link className="page-link" to={url} aria-label={unit.ariaLabel}>
            {span}
            {sr}
          </Link>
        </li>
      )
    }

	}

	onSearch(e) {
		e.preventDefault()
		browserHistory.push(`/s?title=${this.state.title}`)
	}

	render () {

		let {query} = this.props.location
    let {total} = this.props
    let state = {
      page: parseInt(query.page || 1, 10),
      maxLink,
      pageSize,
      total,
      unitRender: this.unitRender.bind(this)()
    }
		return total > pageSize
      ?<RPager {...state} />
      :null
	}
}