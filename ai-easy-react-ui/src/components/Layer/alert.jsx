import React from 'react';
import Animate from 'rc-animate';
// import Icon from '../icon';
import classNames from 'classnames';

import '../_Style_/css/layui.css'
import '../_Style_/css/modules/code.css'
import '../_Style_/css/modules/layer/default/layer.css'

export default class Alert extends React.Component{
    static defaultProps = {
        type: 'info',
    }
    constructor(props) {
        super(props);
        this.state = {
            closing: true,
            closed: false,
        };
    }
    render(){
        return this.state.closed ? null : (
            <Animate
                component=""
                showProp="data-show"
                transitionName={`a-slide-up`}
                onEnd={this.animationEnd}
            >
            <div className="layui-layer layui-layer-dialog  layer-anim">
                <div className="layui-layer-title" >信息</div>
                <div id="" className="layui-layer-content">11</div>
                <span className="layui-layer-setwin">
                    <a className="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
                </span>
                <div className="layui-layer-btn layui-layer-btn-">
                    <a className="layui-layer-btn0">确定</a>
                </div>
                <span className="layui-layer-resize"></span>
            </div>
            </Animate>
        )
    }
}