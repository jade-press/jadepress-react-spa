import React, { Component } from 'react'
import Posts from '../components/Posts'
import Title from '../components/Title'
import Footer from '../components/Footer'
import Nav from './Nav'
import { fetchItems } from '../actions'
import { post, query, params, path, href, host, pageSize, maxLink } from '../lib/tools'
import { connect } from 'react-redux'
import createHistory  from 'history/lib/createBrowserHistory'
import ReactPagenav from 'react-pagenav'

const history = createHistory()

class App extends Component {

  constructor(props) {

    super(props)

    $(window).on('resize', this.checkNavBar)
    const { dispatch } = this.props
    var action = {
      type: 'SET_TITLE'
      ,title: ''
    }
    let body = {
      page: query.page?parseInt(query.page, 10):1
    }

    if(query.title && path === '/s') {
      console.log(query)
      body.title = query.title
      action.title = 'search ' + query.title
    }
    else if(params.slug) {
      body.slug = params.slug
    }
    else if(params.id) {
      body.id = params.id
    }
    else if(params._id) {
      body._id = params._id
    } 
    else if(params.catslug) {
      body.catslug = params.catslug
    }
    else if(params.catid) {
      body.catid = params.catid
    }
    else if(params.cat_id) {
      body.catid = params.cat_id
    }

    dispatch(action)

    fetchItems(dispatch, 'posts', body, href)
    fetchItems(dispatch, 'cats', {})

    history.listen(location => {

      var loc = history.getCurrentLocation()
      var path = host + loc.pathname + (loc.query || '')

      if(this.props.querys[path]) {
        fetchItems(dispatch, 'posts', this.props.querys[path], path)
      }
    })
  }

  checkNavBar() {
    //collapse button
    if(!$('.navbar-toggler').is(':visible')) $('#menus').addClass('in')
    else $('#menus').removeClass('in')
  }

  postAction() {
    window.prettyPrint()
    this.checkNavBar()
  }

  componentDidMount() {
    this.postAction()
  }

  componentDidUpdate() {
    this.postAction()
  }

  onSearch(e) {

    const { dispatch } = this.props
    e.preventDefault()
    if(!this.props.query.title) return
    var path = host + '/s?title=' + this.props.query.title
    history.push(path.replace(host, ''))
    dispatch({
      type: 'SET_TITLE'
      ,title: 'search ' + this.props.query.title
    })
    fetchItems(dispatch, 'posts', this.props.query, path)

  }

  onChange(e) {
    const { dispatch } = this.props
    var title = e.target.value
    dispatch({
      type: 'SET_QUERY'
      ,query: {
        title: title
      }
    })
  }

  onPagerClick(page, path, e) {
    e.preventDefault()
    const dispatch = this.dispatch
    var query = this.query
    query.page = page
    history.push(path.replace(host, ''))
    console.log('query')
    console.log(query)
    fetchItems(dispatch, 'posts', query, path)
  }

  createUrl(unit) {
    var loc = history.getCurrentLocation()
    var path = host + loc.pathname + (loc.query || '')
    var tag = path.indexOf('?') > -1?'&':'?'
    return path + (unit.page  === 1?'': tag + 'page=' + unit.page)
  }

  onLinkClick(query, path, e) {
    e.preventDefault()
    const { dispatch } = this.props
    if(JSON.stringify(this.props.query) !== JSON.stringify(query)) {
      history.push(path)
      if(query.catid || query.cat_id || query._id) {
        dispatch({
          type: 'SET_TITLE'
          ,title: 'loading category... '
        })
      } else {
        dispatch({
          type: 'SET_TITLE'
          ,title: ''
        })
      }

      fetchItems(dispatch, 'posts', query, host + path)
    }
  }

  render() {

    return (
      <div id="content" className="container">
        <div className="row">
          <Nav {...this.props} onLinkClick={this.onLinkClick} onSearch={this.onSearch} onChange={this.onChange} />
          <div id="main" className="col-sm-8 col-md-8 col-lg-9 p-y-2 p-x-3">
            {
              Title(this.props.title)
            }
            {
              Posts(this.props.posts, this.onLinkClick, this)
            }
            <ReactPagenav
              {...this.props}
              page={this.props.query.page || 1}
              onLinkClick={this.onPagerClick} 
              pageSize={pageSize}
              maxLink={maxLink}
              createPageUrl={this.createUrl}
            ></ReactPagenav>
            { Footer() }
          </div>
        </div>
        
      </div>
    )
  }
}

function mapStateToProps(state) {

  return {
    ...state
  }

}

export default connect(mapStateToProps)(App)