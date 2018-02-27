/**
 * @file table list fields
 *
 * @auth gushouchuang
 * @date 2018-1-2
 */
import React from 'react'

import OperCell from '../common/reactComponent/tableRender/OperCell'

// 接收props
export const getColumns = (props) => {
	return [{ 
		title: '序号',
		dataIndex: 'id',
		key: 'id'
	}, 
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name'
	}, 
	{
		title: '年龄',
		dataIndex : 'age',
		key: 'age',
		sorter: e => {
			// 放弃antd提供的当前页排序 逻辑一致走table.onChange，此处仅出发sort的ui渲染
		}
	},
	{
		title: '性别',
		dataIndex: 'gender',
		key: 'gender'
	}, 
	{
		title: '手机号',
		dataIndex: 'tel',
		key: 'tel'
	}, 
	{
		title: '毕业院校',
		dataIndex: 'university',
		key: 'university'
	},
	{
		title: '自我介绍',
		dataIndex: 'desc',
		key: 'desc'
	},
	{
		title: '操作',
		dataIndex: 'oper',
		key: 'oper',
		render(value, row, index) {

			const e = {
				value,
				row,
				index,
			}
			const operProps = {
				list: [{
					label: '编辑',
					onClickCb() {
						props.dispatch('edit', e)
					}
				},
				{
					label: '删除',
					onClickCb() {
						props.dispatch('del', e)
					}
				}]
			}

			return (
				<OperCell {...operProps} />
			)
		}
	}]
}