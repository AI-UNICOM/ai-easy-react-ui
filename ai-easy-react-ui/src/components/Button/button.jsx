import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import './style.scss'

const THEMECLASS="layui";

export const ButtonType = ["primary","normal","warm","danger","disabled"];
export const ButtonShape = ["radius"];
export const ButtonSize = ["big","small","mini"];
export const ButtonIcon = [];

export default class Button extends React.Component{
    static defaultProps = {
        type:"primary"
    };
    static propTypes = {
        type: React.PropTypes.string,
        shape:React.PropTypes.string,
        size:React.PropTypes.string,
        icon: React.PropTypes.string,
        onClick:React.PropTypes.func,
        className: React.PropTypes.string
    }
    constructor(props){
        super(props)
    }
    handleClick = (e) => {//劫持click事件
        const onClick = this.props.onClick;
        if (onClick) {
            onClick(e);
        }
    }
    render(){
        const {
            type, shape,size,icon,className,children,...others,
        } = this.props;
        const classes = classNames(THEMECLASS, {
            [`${THEMECLASS}-btn`]:true,
            [`${THEMECLASS}-${type}`]: type,
            [`${THEMECLASS}-${shape}`]: shape,
            [`${THEMECLASS}-${size}`]: size,
        }, className);
        const iconNode = icon ? <Icon content={icon}/>: null;
        return (
            <button className={classes} onClick={this.handleClick} {...others}>
                {iconNode}{children}
            </button>
        )
    }
}