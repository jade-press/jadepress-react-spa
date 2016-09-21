import { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { types } from '../reducers'
import Pager from '../components/Pager'

class Home extends Component {

  constructor(props) {

    super(props)

  }

  ajax(nextProps) {
    let props = nextProps || this.props
    let {params} = props
    let {query} = props.location
    this.props.getPosts({
      ...query
    }, 'set_posts', () => {
      this.props.setProp({
        type: types.set_title
        ,data: ''
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

  componentDidUpdate() {
    window.prettyPrint()
  }

  render() {

    let {posts} = this.props
    return (

        <div>
          <div className="posts">
            {(posts || []).map((post, index) => Post(post, index, false))}
          </div>
          <Pager {...this.props} />
        </div>
        
    )
  }
}

let mapStateToProps = state => state
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)