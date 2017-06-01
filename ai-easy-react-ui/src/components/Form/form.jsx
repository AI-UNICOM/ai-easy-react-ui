import React from 'react'
import classNames from 'classnames'

const THEMECLASS="layui";

export default class Form extends React.Component{
    render(){
        const {
            className,children,...others,
        } = this.props;
        const classes = classNames(THEMECLASS, {
            [`${THEMECLASS}-form`]:true
        }, className);
        return (
            <form className={classes} {...others}>
                {children}
            </form>
        )
    }
}