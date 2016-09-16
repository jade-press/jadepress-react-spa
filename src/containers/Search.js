import { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

class S extends Component {

  constructor(props) {

    super(props)

  }

  componentDidMount() {
    let {params} = this.props
    let {query} = this.props.location
    this.props.getPosts({
      ...query
    }, 'set_posts')
  }

  render() {

    let {posts} = this.props
    
    return (

        <div className="posts">
          {(posts || []).map((post, index) => Post(post, index, false))}
        </div>
        
    )
  }
}

let mapStateToProps = state => state
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(S)