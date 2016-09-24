import React from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { browserHistory } from 'react-router'
import { createUrl, host, publicRoute } from '../common/constants'
import { types } from '../reducers'
import Pager from '../components/Pager'

class Cat extends React.Component {

  constructor(props) {

    super(props)

  }

  ajax(nextProps) {
    let props = nextProps || this.props
    let {params} = props
    let prop = Object.keys(params)[0]
    let {query} = props.location
    this.props.getPosts({
      ...query,
      ['cat' + prop]: params[prop]
    }, 'set_posts')
    this.props.getCats({
      ...query,
      [prop]: params[prop]
    }, 'set_cat', (res) => {
      this.props.setProp({
        type: types.set_title
        ,data: 'category:' + res.result[0].name
      })
    })
  }

  componentWillMount() {
    this.ajax()
  }

  componentWillReceiveProps(nextProps) {
    if(
      JSON.stringify(nextProps.params) !== JSON.stringify(this.props.params) ||
      JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)
      ) {
      this.ajax(nextProps)
    }
  }

  componentDidUpdate() {
    if(typeof window !== 'undefined') window.prettyPrint()
  }

  render() {

    let cat = this.props.cat || {}
    let posts = this.props.posts || []
    return (

        <div>
          <div className="posts">
            {
              posts.length
              ?posts.map((post, index) => Post(post, index, false))
              :<p>no posts in this category</p>
            }
          </div>
          <Pager {...this.props} />
        </div>
        
    )
  }
}

let mapStateToProps = state => state
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Cat)