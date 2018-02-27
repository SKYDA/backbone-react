/**
 * @file app后台 Abstract Table Render Oper
 *
 * @author gushouchuang
 * @date 2018-1-3
 */
import React, {Component, PropTypes} from 'react'

const OperCell =  ({
    list,
}) => {

    function creatAFactory () {
        return list.map((item, index) => {
            let aProps = {
                key: item.key || 'a' + index,
                href: "javascript:;",
                onClick: item.onClickCb,
                style: {
                    display: 'inline-block',
                    lineHeight: '18px',
                    padding: '0 8px',
                    borderLeft: '1px solid #ccc',
                }
            }

            if (index === 0) {
                aProps.style.borderLeft = 'none'
                aProps.style.paddingLeft = '0'
            }

            return (
                <a {...aProps}>{item.label}</a>
            )
        })
    }

    return (
        <div className="app-back-oper-cell">
            {creatAFactory()}
        </div>
    ) 
}

OperCell.propTypes = {
    list: PropTypes.array,
}

OperCell.defaultProps = {
    list: [],
}

export default OperCell

