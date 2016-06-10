

module.exports = function(ext) {


'use strict'

/**
 * catogory
 */

var 
local = ext.local
,setting = ext.setting
,tools = ext.tools
,log = ext.log
,err = ext.err
,db = ext.db
,path = require('path')
,baseThemeViewPath = ext.baseThemeViewPath
,Pager = ext.Pager
,pager = ext.pager
,getCats = ext.getCats
,getPosts = ext.getPosts
,buildThemeRes = tools.buildThemeRes

var extend = {}
var basicPostFields = {
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

extend.publicCatspromise = function* (body) {

	let query = body
	let page = query.page || 1
	page = parseInt(page, 10) || 1
	let pageSize = query.pageSize || setting.pageSize
	pageSize = parseInt(pageSize, 10) || setting.pageSize

	let user = this.session.user
	this.local.user = user

	let sea1 = _.pick(body, ['_id', 'id', 'slug', 'name'])
	sea1.page = page
	sea1.pageSize = pageSize
	let obj = yield getCats(sea1)

	let res = {
		pageSize: pageSize
		,total: obj.total
		,themeRes: buildThemeRes(this.local.host)
		,publicRoute: setting.publicRoute
		,createUrl: tools.createUrl
		,cats: objc.cats
	}

	return Promise.resolve(res)

}

extend.publicCats = function* (next) {

	try {

		let res = yield extend.publicCatspromise(this.request.body)

		this.body = res

	} catch(e) {

		err('failed get public cats', e)
		this.body = {
			errorMsg: 'failed get public cats'
			,code: 1
		}

	}

}

extend.publicPostsPromise = function* (body) {

	let query = body
	let page = query.page || 1
	page = parseInt(page, 10) || 1
	let pageSize = query.pageSize || setting.pageSize
	pageSize = parseInt(pageSize, 10) || setting.pageSize

	let user = this.session.user
	this.local.user = user

	let sea1 = _.pick(body, ['_id', 'id', 'slug', 'title'])
	sea1.page = page
	sea1.pageSize = pageSize
	let obj = yield getPosts(sea1)

	let res = {
		pageSize: pageSize
		,total: obj.total
		,themeRes: buildThemeRes(this.local.host)
		,publicRoute: setting.publicRoute
		,createUrl: tools.createUrl
		,posts: objc.posts
	}

	return Promise.resolve(res)

}


extend.publicPosts = function* (next) {

	try {

		let res = yield extend.publicCatspromise(this.request.body)
		this.body = res

	} catch(e) {

		err('failed get public posts', e)
		this.body = {
			errorMsg: 'failed get public posts'
			,code: 1
		}

	}

}

extend.home = extend.post = extend.cat = extend.search = function* (next) {
	try {

		Object.assign(this.local, {
			themeRes: buildThemeRes(this.local.host)
			,createUrl: tools.createUrl
		})

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
