/**
 * @file app后台 filter 自定义 DiySelect
 *
 * @author gushouchuang
 * @date 2018-1-4
 */
import React from 'react'

export default (source, me) => {
    // TODO
    const field = source.field
    const filters = me.state.filters
    
    const containerProps = {
    	onClick: () => {
    		me.setState({
    			[field + 'render']: true
    		})
    	}
    }

    const cbProps = {
        selected: me.state.filters[field],
    	// 回填数据到Filters
    	cbValue: list => {
    		me.setState({
    			filters: {
    				...me.state.filters,
    				[field]: list
    			},
                [field + 'render']: false
    		})	
    	},
    	// 业务与模板交互 显隐/加载
    	changeState: changeState => {
    		me.setState({
    			...changeState
    		})
    	}
    }

    const labelMax = source.labelMax || 15
    let label = []
    const list = me.state.filters[field] || []

    label = list.map(item => {
        return item.label
    })

    label = label.join(";")
    label.length > labelMax && (label = label.substring(0, labelMax - 1) + '...')
    label || (label = source.placeholder)

    return (
    	<div style={{
			display: 'inline-block',
    	}}>
    		<div {...containerProps} style={{
    			border: '1px solid #d9d9d9',
				lineHeight: '26px',
				position: 'relative',
				padding: '0 5px',
				cursor: 'pointer',	
                ...source.style
    		}}>
                {label}
    		</div>
    		{
    			me.state[field + 'render']
    			? source.render(cbProps)
    			: null
    		}
    	</div>
    )
}
