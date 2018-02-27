/**
 * @file app后台 Abstract Filters
 *
 * 1.list 层级与位置对应
 * 2.目前支持 Select Input DatePicke NumberRange Number Button 自定义 / 不支持Radio Checkbox Mutilselect
 *
 * @author gushouchuang
 * @date 2018-1-3
 */
import React, {Component, PropTypes} from 'react'

import factory from './factory/index'

const TYPE_LIST = ['Select', 'Input', 'DatePicke', 'NumberRange', 'Number', 'Button', 'DiySelect']

class Filters extends Component {
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
        let filters = {}
        // 请自觉保持数组嵌套格式
        this.props.list.forEach(row => {
            row.forEach(item => {

                filters[item.field] = typeof item.defaultValue === 'undefined'
                    ? ''
                    : item.defaultValue

                if (item.type === 'NumberRange') {
                    this._valNumberRange.push(item)
                    filters[item.field] = {
                        max: item.defaultValue ? item.defaultValue.max : undefined,
                        min: item.defaultValue ? item.defaultValue.min : undefined,
                    }
                }
                else if (item.type === 'DiySelect') {
                    filters[item.field] = []
                }
            })
        })

        this.state = {
            ...this.state,
            filters
        }
    }

    creatFieldFactory () {
        // 支持list的多层数组嵌套 
        const filter = []

        this.props.list.map((row, index) => {
            // 同一层级的结构
            let list = []

            row.forEach((item, fIndex) => {
                if (!item.type || TYPE_LIST.indexOf(item.type) === -1) {
                    console.error(`miss item.type or not support this type: ${item.type}`)
                    alert('看console.error')
                } else {
                    const itemProps = {
                        key: `filters-field-${index}-${fIndex}`,
                        style: {
                            width: item.width,
                            display: 'inline-block',
                            marginRight: '15px',
                            padding: '5px 0',
                        }
                    }

                    list.push(
                        <div {...itemProps}> 
                            {
                                item.label
                                ? <span style={{
                                    paddingRight: '8px',
                                    display: 'inline-block',
                                }}>{item.label}:</span>
                                : null
                            }
                            {factory[`get${item.type}`](item, this)}
                        </div>
                    )
                }
            })
            // 默认 第一行的最右侧为'查询'按钮 无需在业务中配置
            if (index === 0) {
                list.push(  
                    factory.getButton({
                        type: 'Button',
                        skin: 'primary',
                        field: 'submit',
                        disabled: this.props.submitDisabled,
                        text: '查询',
                        key: 'filters-field-submit',
                        style: {
                            width: '120px',
                            height: '30px',
                            float: 'right',
                        },
                        onClickCb: () => {
                            this.submit()
                        }
                    })
                )
            }

            const rowKey = `filters-row-${index}`

            filter.push(
                <div key={rowKey}>
                    {list}
                </div>
            )

        })
        return filter
    }

    // 内部校验
    // 1.numberRange的max min是否为空 和 大小顺序
    innerValidate(filters) {
        const state = this.state.filters
        
        return !this._valNumberRange.find(item => {
            const {max, min} = state[item.field]

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

    submit() {
        const filters = this.state.filters
        if (this.innerValidate(filters)) {
            this.props.query && this.props.query(filters)
        }
    }

    render() {
        return (
            <div className="app-back-filters"  style={{
                padding: '10px 35px 0',
            }}>
                {this.creatFieldFactory()}
            </div>
        )
    }
}

Filters.propTypes = {
    list: PropTypes.array,
    submitDisabled: PropTypes.bool,
    query: PropTypes.func.isRequired,
}

Filters.defaultProps = {
    list: [],
    submitDisabled: false, // 查询按钮的disabled
    query: () => {},
}

export default Filters

