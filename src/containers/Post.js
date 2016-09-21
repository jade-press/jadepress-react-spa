import { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { types } from '../reducers'

class Po extends Component {

  constructor(props) {

    super(props)

  }

  ajax(nextProps = this.props) {
    let {params} = nextProps
    let pps = Object.keys(params)
    let {postSlug} = params
    let {query} = this.props.location
    let req = pps.reduce((prev, prop) => {
      if(prop.indexOf('cat') > -1) return prev
      prev[prop] = params[prop]
      return prev
    }, {})
    this.props.getPosts(req, 'set_post', (res) => {
      this.props.setProp({
        type: types.set_title
        ,data: res.result[0].title
      })
    })
  }

  componentDidMount() {
    this.ajax()
  }

  componentWillReceiveProps(nextProps) {
    if(
      JSON.stringify(nextProps.params) !== JSON.stringify(this.props.params)
      ) {
      this.ajax(nextProps)
    }
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