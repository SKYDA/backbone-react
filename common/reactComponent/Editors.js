/**
 * @file app后台 Abstract Editors
 *
 * 1.list 层级与位置对应
 * 2.目前支持 Select Input DatePicke NumberRange Number Button 自定义 / 不支持Radio Checkbox Mutilselect
 *
 * @author gushouchuang
 * @date 2018-1-3
 */
import React, { Component, PropTypes } from 'react'
import { Form, Row, Col, } from 'antd'
const FormItem = Form.Item

import factory from './factory/index'

const TYPE_LIST = ['Select', 'Input', 'DatePicke', 'NumberRange', 'Number', 'Button', 'DiySelect']
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

class EditorsNoForm extends Component {
    constructor(...args) {
        super(...args)

        this.state = {}
        // 待校验的field
        this._valNumberRange = []

        this.initState()

        this.creatFieldFactory = this.creatFieldFactory.bind(this)
        this.innerValidate = this.innerValidate.bind(this)
    }

    initState() {
        let editors = {}
        // 请自觉保持数组嵌套格式
        this.props.list.forEach(item => {
            editors[item.field] = typeof item.defaultValue === 'undefined'
                ? ''
                : item.defaultValue

            if (item.type === 'NumberRange') {
                this._valNumberRange.push(item)
                editors[item.field] = {
                    max: item.defaultValue ? item.defaultValue.max : undefined,
                    min: item.defaultValue ? item.defaultValue.min : undefined,
                }
            }
            else if (item.type === 'DiySelect') {
                editors[item.field] = []
            }
        })

        this.state = {
            ...this.state,
            editors
        }
    }

    creatFieldFactory() {
        // 支持list的多层数组嵌套 
        const editors = []

        this.props.list.map((item, index) => {
            // 同一层级的结构
            let list = []

            item.sourceName = 'editors'
            if (!item.type || TYPE_LIST.indexOf(item.type) === -1) {
                console.error(`miss item.type or not support this type: ${item.type}`)
                alert('看console.error')
            } else {
                const itemProps = {
                    key: `editors-field-${index}`,
                    // style: {
                    //     width: item.width,
                    //     display: 'inline-block',
                    //     marginRight: '15px',
                    //     padding: '5px 0',
                    // }
                }

                editors.push(
                    <FormItem
                        {...formItemLayout}
                        {...itemProps}
                        label={item.label}
                    >
                        {factory[`get${item.type}`](item, this)}
                    </FormItem>
                )
            }

        })
        return editors
    }

    // 内部校验
    // 1.numberRange的max min是否为空 和 大小顺序
    innerValidate(editors) {
        const state = this.state.editors

        return !this._valNumberRange.find(item => {
            const { max, min } = state[item.field]

            const matchUndefined = ('' + max + min).match(/undefined/g)

            if (
                (matchUndefined != null && matchUndefined.length === 1) // 有一个未填
                || (matchUndefined == null && max < min) // 大小反了
            ) {
                let tip = '确保'
                item.label && (tip += item.label)
                tip += '字段填写完整且大小正确'
                alert(tip)

                return true
            }
        })
    }
    handleSubmit = _ => {
        debugger
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                this.props.query && this.props.query(values)
            }
        })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                {this.creatFieldFactory()}
            </Form>
        )
    }
}

EditorsNoForm.propTypes = {
    list: PropTypes.array,
    submitDisabled: PropTypes.bool,
    query: PropTypes.func.isRequired,
}

EditorsNoForm.defaultProps = {
    list: [],
    submitDisabled: false, // 查询按钮的disabled
    query: () => { },
}
const Editors = Form.create()(EditorsNoForm)
export default Editors

