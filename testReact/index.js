/**
 * @file test import react
 *
 * @auth gushouchuang
 * @date 2018-1-2
 */
import { ComponentGenerator } from '../common/ReactBackbone'
import testComponent from './testComponent'

import service from './service'

const componentProps = {
    defaults: {
        dataSource: [],
        listParams: {},
    },
    view: {
        el: document.getElementById('react-container'),
        Component: testComponent,
        // life cyc
        preInit(options) {
            // this.uuuid = options.uuuid
        },
        load() {
            // @return {Array}
            // const state = this.model.toJSON()
            return [this.getUserList()]
        },
        prepare(state) { 
            // do somethings if you need 自行操作model
        },
        preRender() {
            // do somethings if you need
        },
        // 类似did mout
        initBehavior()  {
            // do somethings if you need
        },
        getUserList(params = {}) {
            return service.getTestReactUserList({}).then((response) => {
                let { list, total } = response

                return {
                    dataSource: list,
                    total: +total,
                }
            })
        },
        tableReload(params = {}) {
            // get && extend model中存储的原请求参数
            params = {
                ...params,
                ...this.model.get('listParams'),
            }
            // 请求
            this.getUserList(params)
            // set new params in model
            this.model.set({
                listParams: params
            }, {
                silent: true
            })
        },
        edit(e) {
            console.log(`编辑第${e.index}条信息`)
        },
        del(e) {
            console.log(`删除第${e.index}条信息`)
        },
        query(e) {
            console.log(`提交一次检索，目前的检索条件有：${e}`)
        },
        'select university'(e) {
            this.model.set('university', +e)

            // 虽然没暴露组件实体，但允许注入state，也有点不规矩...
            // 想改变的子组件的state，一定要在此返回
            return {
                gender: ''
            }
        },
        'add'() {
            this.model.set('adding', true)
        }
    }
}

const TestReact = ComponentGenerator(componentProps)

export { 
    TestReact
}