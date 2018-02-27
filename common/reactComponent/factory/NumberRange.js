/**
 * @file app后台 filter NumberRange factory
 *
 * @author gushouchuang
 * @date 2018-1-4
 */
import React from 'react'

import { InputNumber } from 'antd'

export default (source, me) => {
    const minProps = {
        defaultValue: me.state.filters[source.field].min,
        style: {
            display: 'inline-block',
        },
        onChange: (e, value) => {
            const filters = {
                ...me.state.filters,
                [source.field]: {
                    ...me.state.filters[source.field],
                    min: e
                }
            }
            me.setState({
                filters
            })
        }
    }

    const maxProps = {
        defaultValue: me.state.filters[source.field].max,
        style: {
            display: 'inline-block',
            ...source.style,
        },
        onChange: e => {
            const filters = {
                ...me.state.filters,
                [source.field]: {
                    ...me.state.filters[source.field],
                    max: e
                }
            }
            me.setState({
                filters
            })
        }
    }

    return (
        <div style={{
            display: 'inline-block'
        }}>
            <InputNumber {...minProps} />
            <span style={{
                padding: '0 5px'
            }}>至</span>
            <InputNumber {...maxProps} />
        </div>
    )
}
