import React from 'react'
import classNames from 'classnames'

const THEMECLASS="layui";

export default class Item extends React.Component{
    render(){
        const {
            label,msg,type,className,children,...others,
        } = this.props;
        const classes = classNames(THEMECLASS, {
            [`${THEMECLASS}-form-item`]:true
        }, className);
        return (
            <div className={classes} {...others}>
                <label className={`${layui}-form-label`}>{label}</label>
                <div className={`${layui}-form-${type}`}>
                    {children}
                </div>
                <div className={`${layui}-form-mid ${layui}-form-aux`}>{msg}</div>
            </div>
        )
    }
}