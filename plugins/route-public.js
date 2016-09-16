

module.exports = function(ext) {

/**
 * catogory
 */

const 
local = ext.local
,setting = ext.setting
,tools = ext.tools
,log = ext.tools.log
,err = ext.tools.err
,path = require('path')
,baseThemeViewPath = ext.baseThemeViewPath
,getCats = ext.getCats
,getPosts = ext.getPosts
,buildThemeRes = tools.buildThemeRes
,_ = require('lodash')

let extend = {}
let basicPostFields = {
	id: 1
	,desc: 1
	,cats: 1
	,title: 1
	,tags: 1
	,slug: 1
	,files: 1
	,featuredFile: 1
	,createBy: 1
	,createTime: 1
	,html: 1
}

extend.publicCatspromise = function* (body, host) {

	let query = body
	let page = query.page || 1
	page = parseInt(page, 10) || 1
	let pageSize = query.pageSize || setting.pageSize
	pageSize = parseInt(pageSize, 10) || setting.pageSize

	let sea1 = _.pick(body, ['_id', 'id', 'slug', 'name'])
	sea1.page = page
	sea1.pageSize = pageSize

	let obj = yield getCats(sea1)

	let res = {
		pageSize: pageSize
		,total: obj?(obj.total || 0): 0
		,result: obj?(obj.cats?obj.cats:[obj]):[]
	}

	return Promise.resolve(res)

}

extend.publicCats = function* (next) {

	try {

		let res = yield extend.publicCatspromise(this.request.body, this.local.host)
		let user = this.session.user
		this.body = res

	} catch(e) {

		err('failed get public cats', e)
		this.body = {
			errorMsg: 'failed get public cats'
			,code: 1
		}

	}

}

extend.publicPostsPromise = function* (body, host) {

	let query = body
	let page = query.page || 1
	page = parseInt(page, 10) || 1
	let pageSize = query.pageSize || setting.pageSize
	pageSize = parseInt(pageSize, 10) || setting.pageSize

	let sea1 = _.pick(body, ['_id', 'id', 'slug', 'title', 'catid', 'cat_id', 'catslug'])

	sea1.page = page
	sea1.pageSize = pageSize
	let obj = yield getPosts(sea1)

	let res = {
		pageSize: pageSize
		,total: obj?(obj.total || 0):0
		,result: obj?(obj.posts || [obj]):[]
	}

	return Promise.resolve(res)

}


extend.publicPosts = function* (next) {

	try {

		let res = yield extend.publicPostsPromise(this.request.body, this.local.host)

		this.body = res

	} catch(e) {

		err('failed get public posts', e)
		this.body = {
			errorMsg: 'failed get public posts'
			,code: 1
		}

	}

}

extend.post = extend.home = extend.cat = extend.search = function* (next) {

	try {

		Object.assign(this.local, {
			themeRes: buildThemeRes(this.local.host)
			,publicRoute: setting.publicRoute
		})
		let user = this.session.user
		this.local.user = user
		this.render(baseThemeViewPath + 'index', this.local)

	} catch(e) {

		err('failed render page', this.href, e)
		this.status = 500
		this.local.error = e
		this.render(setting.path500, this.local)

	}
}

return extend

////end
}
