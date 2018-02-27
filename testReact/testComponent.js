/**
 * @file test backbone import reaact
 * @author gushouchuang
 * @date 2017-12-29
 */
import React, {Component} from 'react'
import { Modal, Button, Form, Icon, Input, Checkbox, Upload, Select, Radio, DatePicker, Row, Col, } from 'antd'

import Title from '../common/reactComponent/Title'
import Filters from '../common/reactComponent/Filters'
import Editors from '../common/reactComponent/Editors'
import List from '../common/reactComponent/List'

import { getColumns } from './tableFields'

export default (props) => {

    const titleProps = {
        link: {
            label: '< 返回列表',
            onChangeCb() {
                // route hash
            }
        },
        title: '只是测试的react demo~',
        btnProps: [{
            label: '加一个',
            onClickCb: () => {
                console.log('加一个 业务逻辑')
                props.dispatch('add')
            },
        },
        {
            label: '导出',
            onClickCb: () => {
                console.log('导出 业务逻辑')
                // props.dispatch('import')
            },
        }]
    }

    const filtersProps = {
        list: [
            [{
                type: 'Select',
                field: 'university',
                label: '学校',
                dataSource: [{
                    label: '请选择',
                    value: '',
                },
                {
                    label: '大学1',
                    value: '1',
                },
                {
                    label: '大学22',
                    value: '2',
                }],
                onChangeCb: e => {
                    //
                    return props.dispatch('select university', e)
                }
            },
            {
                type: 'DatePicke',
                field: 'joinparty',
                label: '入党时间',
            },
            {
                type: 'DatePicke',
                field: 'leaveparty',
                needHMS: 'true',
                label: '退党时间',
            // },
            // {
            //     type: 'Input',
            //     field: 'name',
            //     label: '名字',
            //     width: 300,
            }],
            [{
                type: 'Select',
                field: 'gender',
                label: '性别',
                dataSource: [{
                    label: '请选择',
                    value: '',
                },
                {
                    label: '全部',
                    value: 'all',
                },
                {
                    label: '男',
                    value: 'male',
                },
                {
                    label: '女',
                    value: 'female',
                }],
            },
            {
                type: 'Number',
                field: 'age',
                label: '年龄',
                width: 150
            // },
            // {
            //     type: 'Diy',
            //     field: 'mark',
            //     label: '标签',
            //     width: 250
            }],
            [{
                type: 'NumberRange',
                field: 'grade',
                label: '年级',
                width: 250,
                defaultValue: {
                    max: 12
                }
            }]
        ],
        query: filters => {
            props.dispatch('query', filters)
        }
    }

    if (props.university !== 2) {
        filtersProps.list[0].push({
            type: 'Input',
            field: 'name',
            placeholder: '填写你的大名',
            label: '名字',
            width: 300,
        })
    } else {
        filtersProps.list[1][0].dataSource = [{
            label: '请选择',
            value: '',
        },
        {
            label: '新的了',
            value: 'allnew',
        },
        {
            label: '男变了',
            value: 'malenew',
        },
        {
            label: '女变了',
            value: 'femalenew',
        }]
    }

    const listProps = {
        columns: getColumns(props),
        dataSource: props.dataSource,
        total: props.total,
        // pageSize: 20, 
        tableReload: params => {
            console.log(params)
            props.dispatch('tableReload', params)
        }
    }

    const editorsProps = {
        list: [
            {
                type: 'Select',
                field: 'university',
                label: '学校',
                dataSource: [{
                    label: '请选择',
                    value: '',
                },
                {
                    label: '大学1',
                    value: '1',
                },
                {
                    label: '大学22',
                    value: '2',
                }],
                onChangeCb: e => {
                    //
                    return props.dispatch('select university', e)
                }
            },
            {
                type: 'DatePicke',
                field: 'joinparty',
                label: '入党时间',
            },
            {
                type: 'DatePicke',
                field: 'leaveparty',
                needHMS: 'true',
                label: '退党时间',
            },
            {
                type: 'Input',
                field: 'name',
                label: '名字',
                width: 300,
            },
            {
                type: 'Select',
                field: 'gender',
                label: '性别',
                dataSource: [{
                    label: '请选择',
                    value: '',
                },
                {
                    label: '全部',
                    value: 'all',
                },
                {
                    label: '男',
                    value: 'male',
                },
                {
                    label: '女',
                    value: 'female',
                }],
            },
            {
                type: 'Number',
                field: 'age',
                label: '年龄',
                width: 150
            }]
    }
    let editorsForm = null
    const handleSubmit = _ => {
        editorsForm.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        })
    }
    const handleOk = _ => {
        const { handleOk } = props
        debugger
        editorsForm && editorsForm.submit(handleSubmit)
        typeof handleOk === 'function' && handleOk()
    }
    

    return (
        <div>
            <Title {...titleProps} />
            <Filters {...filtersProps} />
            <List {...listProps} />
            { props.adding ? <Modal
                title={'操作日志'}
                onOk={handleOk}
                visible={true}
                onCancel={handleOk}
                cancelText={''}
                width={800}
                maskClosable={false}    
                footer={[
                    <Button key="submit" type="primary" size="large" onClick={handleOk}>
                        确定
                    </Button>
                ]}
            >
            <Editors ref={ref => {editorsForm = ref}} {...editorsProps}/>
            </Modal> : null}
        </div>
    )
}

