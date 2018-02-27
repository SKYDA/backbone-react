/**
 * @file app后台 Abstract Table Render Img
 *
 * @author gushouchuang
 * @date 2018-1-3
 */
import React, {Component, PropTypes} from 'react'

import { Modal } from 'antd'

class ImgRender extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
        	visible: false
        }

        this.showModal = this.showModal.bind(this)
    }

    showModal() {
    	this.setState({
    		visible: true
    	})
    }

    render() {
    	const modalProps = {
    		title: this.props.title || '窗口',
	        visible: this.state.visible,
	        footer: null,
	        onCancel: () => {
	            this.setState({
	            	visible: false
	            })
	        }
    	}

        return (
            <div className="app-back-img-cell">
            	<div onClick={this.showModal} style={{
            		cursor: 'pointer',
            		textAlign: 'center',
            	}}>
		            <img src={this.props.src} width='80' height='80' />
		        </div>
	        {
            	this.state.visible
            	? <Modal {...modalProps}>
                    <img src={this.props.src} width={this.props.width} height={this.props.height} />
                </Modal>
            	: null
            }s
            </div>
        )
    }
}

ImgRender.propTypes = {
    url: PropTypes.string,
}

ImgRender.defaultProps = {
    url: '',
}

export default ImgRender

