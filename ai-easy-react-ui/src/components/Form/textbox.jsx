import React from 'react'
import classNames from 'classnames'

const THEMECLASS="layui";

export default class TextBox extends React.Component{
    static defaultProps={
        type:"text"
    }
    render(){
        const {
            type,className,children,...others,
        } = this.props;
        const classes = classNames(THEMECLASS, {
            [`${THEMECLASS}-input`]:true
        }, className);
        return (
           <input type={type} className={classes} {...others}/>
        )
    }
}