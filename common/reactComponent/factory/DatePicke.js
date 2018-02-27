/**
 * @file app后台 filter DatePicke factory
 *
 * @author gushouchuang
 * @date 2018-1-4
 */
import React from 'react'
import moment from 'moment'

import { DatePicker } from 'antd'

export default (source, me) => {
    const sourceName = source.sourceName || 'filters'
    const dateProps = {
        size: source.size || 'default',
        onChange: (e, value) => {
            const sourceState = {
                ...me.state[sourceName],
                [source.field]: value
            }
            me.setState({
                [sourceName]: sourceState
            })
        }
    }
    // 需要精确到hh:mm:ss
    if (source.needHMS) {
        dateProps.format = "YYYY-MM-DD HH:mm:ss"
        dateProps.showTime = { defaultValue: moment('00:00:00', 'HH:mm:ss') }
    }

    return (
        <DatePicker {...dateProps} />
    )
}
