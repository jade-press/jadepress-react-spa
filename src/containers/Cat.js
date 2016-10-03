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

  static async fetchData(props) {
    let {params} = props
    let prop = Object.keys(params)[0]
    let {query} = props.location

    await props.getCats({
      ...query,
      [prop]: params[prop]
    }, 'set_cat', (res) => {
      props.setProp({
        type: types.set_title
        ,data: 'category:' + res.result[0].name
      })
    })

    await props.getPosts({
      ...query,
      ['cat' + prop]: params[prop]
    }, 'set_posts')

  }

  componentDidMount() {
    if (!window.h5.state.posts) {
      Cat.fetchData(this.props)
    } else delete window.h5.state.posts
    window.prettyPrint()
  }

  componentWillReceiveProps(nextProps) {
    if(
      JSON.stringify(nextProps.params) !== JSON.stringify(this.props.params) ||
      JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)
      ) {
      Cat.fetchData(nextProps)
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