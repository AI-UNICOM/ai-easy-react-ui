import React from 'react'
import classNames from 'classnames'

const THEMECLASS="layui";

export default class TextBox extends React.Component{
    static defaultProps={
        type:"text"//text,password,
    }
    render(){
        const {
            type,className,children,...others,
        } = this.props;
        const classes = classNames(THEMECLASS, {
            [`${THEMECLASS}-input`]:true
        }, className);
        if(type==="textarea"){
            return (
                <textarea className={`${THEMECLASS}-textarea`}></textarea>
            )
        }
        return (
           <input type={type} className={classes} {...others}/>
        )
    }
}