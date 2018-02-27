/**
 * @file app后台 filter Number factory
 *
 * @author gushouchuang
 * @date 2018-1-4
 */
import React from 'react'

import { InputNumber } from 'antd'

export default (source, me) => {
    const sourceName = source.sourceName || 'filters'
    const numberProps = {
        defaultValue: me.state[sourceName][source.field],
        style: {
            display: 'inline-block',
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
        <div style={{
            display: 'inline-block'
        }}>
            <InputNumber {...numberProps} />
        </div>
    )
}
