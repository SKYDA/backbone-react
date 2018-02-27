/**
 * @file app后台 filter Input factory
 *
 * @author gushouchuang
 * @date 2018-1-4
 */
import React from 'react'

import { Input } from 'antd'

export default (source, me) => {
    const sourceName = source.sourceName || 'filters'
    const inputProps =  {
        defaultValue: me.state[sourceName][source.field],
        placeholder: source.placeholder,
        style: {
            display: 'inline-block',
            width: source.width - 70, // 给label的默认宽度 可以通过selfStyle.width进行覆盖
            ...source.style, 
        },
        onChange: e => {
            const sourceState = {
                ...me.state[sourceName],
                [source.field]: value
            }
            me.setState({
                [sourceName]: sourceState
            })
        }
    }

    return (
        <Input {...inputProps} />
    )
}
