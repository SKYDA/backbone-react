/**
 * @file app后台 Abstract List (table + pager)
 * antd的table，默认集成了pager，pager相关渲染均交给antd走默认，我们只通过table.onChange去捕获翻页
 * 目前看起来pager，我们只需要设置pageSize和总的数据数量total即可
 *
 * @author gushouchuang
 * @date 2018-1-2
 */
import React, {Component, PropTypes} from 'react'

import _ from 'lodash'
import { Table } from 'antd'

const List =  ({
    columns,
    dataSource,
    pagination,
    pageSize,
    pageSizeOptions,
    pageNo,
    total, // 总共数据条数，非页数
    tableReload,
}) => {

    // 捕获sort、pager事件 => table.dataSource需要reload （暂时未有filter业务）
    // 由于antd.table的sort，仅支持dataSource的当前页排序，不符合业务需求，所以在此手动捕获
    function onTableChange (...rest) {
        const params = {
            ..._.pick(rest[0], 'current', 'pageSize'), // pager信息
            ..._.pick(rest[2], 'columnKey', 'field', 'order'), // sort信息
        }

        // 如果params中的字段为空，请保持业务model中存储的旧字段值，比如连续点两次asc排序，第二次rest[2]为{}
        params.pageNo = params.current || 1
        tableReload(params)
    }

    // 可以直接传pagination=false 屏蔽掉翻页
    pagination = pagination == null 
    ? {
        pageSize, // antd默认是10
        total,
        current: pageNo,
        showSizeChanger: !!pageSizeOptions.length,
        pageSizeOptions: pageSizeOptions,
    } : pagination

    const tableProps = {
        columns,
        dataSource,
        pagination,
    }
            
    return (
        <div style={{
            margin: ' 30px',
            paddingTop: '10px',
        }}>
            <Table onChange={onTableChange} {...tableProps} />
        </div>
    ) 
}

List.propTypes = {
    dataSource: PropTypes.array.isRequired,
    pagination: PropTypes.object,
    pageSizeOptions: PropTypes.arrayOf(
        PropTypes.string
    ),
    pageSize: PropTypes.number,
    pageNo: PropTypes.number,
    total: PropTypes.number,
    columns: PropTypes.array.isRequired,
    tableReload: PropTypes.func,
}

List.defaultProps = {
    columns: [],
    pagination: null,
    pageSizeOptions: [],
    pageSize: 10,
    pageNo: 1,
    total: 10,
    dataSource: [],
    tableReload: () => {},
}

export default List

