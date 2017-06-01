import React from 'react'
import { cloneElement } from 'react'
import classNames from 'classnames'
import './style.scss'

const THEMECLASS="layui";

export default class Nav extends React.Component{
    static defaultProps={
        separator:"&gt;"
    }
    render(){
        const {separator, children,className, ...restProps } = this.props;
        const classnames=classNames({
            [`${THEMECLASS}-breadcrumb`]:true
        },className)
        let child;
        if(children){
            child=React.Children.map(children, (item, index) => {
                if (!item) {
                    return item;
                }
                return cloneElement(item, {
                    separator,
                    key: index,
                    hasSeparator:index===children.length-1
                });
            })
        }
        return (
            <span className={classnames} {...restProps}>
                {child}
            </span>
        )
    }
}

export class Item extends React.Component{
    render(){
        const {separator, children,hasSeparator, ...restProps } = this.props;

        let link=<a {...restProps}>{children}</a>;
        if(separator&&!hasSeparator){
            link=<a {...restProps}>{children}<span className={`${THEMECLASS}-box`} dangerouslySetInnerHTML={{__html:separator}}></span></a>
        }
        return link
    }
}