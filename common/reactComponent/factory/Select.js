/**
 * @file app后台 filter Select factory
 *
 * @author gushouchuang
 * @date 2018-1-4
 */
import React from 'react'

import { Select } from 'antd'

export default (source, me) => {
    const sourceName = source.sourceName || 'filters'
    const dom = []
    let label = ''
    const fieldValue = me.state[sourceName][source.field]
    source.dataSource.forEach((item, index) => {
        // 获取当前的显示label 注意是== 有数字格式转换
        fieldValue == item.value && (label = item.label)
        dom.push(
            <Option key={index} value={item.value}>{item.label}</Option>
        )
    })

    const selectProps = {
        defaultValue: me.state[sourceName][source.field],
        value: label,
        style: {
            ...source.style
        },
        onChange: e => {
            // 外部业务注入
            let injectStateChange = {}

            source.onChangeCb && (injectStateChange = source.onChangeCb(e) || {})

            const sourceState = {
                ...me.state[sourceName],
                [source.field]: source.valueType === 'number'? +e : e, // 数字 or 字符串
                ...injectStateChange
            }
            me.setState({
                [sourceName]: sourceState
            })
        }
    }

    return (
        <Select {...selectProps}>
            {dom}
        </Select>
    )
}
