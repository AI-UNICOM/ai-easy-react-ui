import React from 'react'
import classNames from 'classnames'

const THEMECLASS="layui";

export default class Icon extends React.Component{
    render(){
        const {
            className,children,content,...others
        }=this.props;
        const classes = classNames(THEMECLASS, {
            [`${THEMECLASS}-icon`]:true
        }, className);
        return (
            <i className={classes} {...others} >{content||children}</i> 
        )
    }
}