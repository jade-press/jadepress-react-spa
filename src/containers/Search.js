import { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { types } from '../reducers'

class S extends Component {

  constructor(props) {

    super(props)

  }

  ajax(props = this.props) {
    let {params} = props
    let {query} = props.location
    this.props.getPosts({
      ...query
    }, 'set_posts', () => {
      this.props.setProp({
        type: types.set_title
        ,data: 'search "' + query.title + '"'
      })
    })
  }

  componentDidMount() {
    this.ajax()
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)) {
      this.ajax(nextProps)
    }
  }

  render() {

    let posts = this.props.posts || []
    let {query} = this.props.location
    return (

        <div className="posts">
          {
            posts.length
            ?posts.map((post, index) => Post(post, index, false))
            :<p>can not find any post with keyword: <b className="text-danger">{query.title}</b></p>
          }
        </div>
        
    )
  }
}

let mapStateToProps = state => state
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(S)