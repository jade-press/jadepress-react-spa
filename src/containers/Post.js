import { Component } from 'react'
import Post from '../components/Post'
import { pageSize } from '../common/constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { types } from '../reducers'

class Po extends Component {

  constructor(props) {

    super(props)

  }

  componentDidMount() {
    let {params} = this.props
    let {postSlug} = params
    let {query} = this.props.location
    this.props.getPosts({
      pageSize,
      page: query.page || 1,
      postSlug
    }, 'set_post', (res) => {
      this.props.setProp({
        type: types.set_title
        ,data: res.result[0].title
      })
    })
  }

  render() {

    let {post} = this.props

    return (

        <div className="posts">
          { post && Post(post, 0, true) }
        </div>
        
    )
  }
}

let mapStateToProps = state => state
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Po)