
import { host } from './constants'
console.log(host, 'host')
export default {
  get_posts: host + '/public-posts',
  get_cats: host + '/public-cats'
}