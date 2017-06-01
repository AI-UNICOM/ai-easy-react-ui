import React from 'react';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import shallowEqual from 'shallowequal';

import './style.scss'

const THEMECLASS="layui";
export default class Checkbox extends React.Component{
    // static defaultProps = {
    //     THEMECLASS: 'ant-checkbox',
    //     indeterminate: false,
    // };
    static contextTypes = {
        checkboxGroup: React.PropTypes.any,
    };
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState) ||
            !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
    }
    render() {
        const { props, context } = this;
        const {
            className,
            children,
            indeterminate,
            style,
            onMouseEnter,
            onMouseLeave,
            ...restProps,
        } = props;
        const { checkboxGroup } = context;
        let checkboxProps = {...restProps}
        if (checkboxGroup) {
            checkboxProps.onChange = () => checkboxGroup.toggleOption({ label: children, value: props.value });
            checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
            checkboxProps.disabled = 'disabled' in props ? props.disabled : checkboxGroup.disabled;
        };
        // const classString = classNames(className, {
        //     [`${THEMECLASS}-wrapper`]: true,
        //     [`${THEMECLASS}-wrapper-checked`]: checkboxProps.checked,
        //     [`${THEMECLASS}-wrapper-disabled`]: checkboxProps.disabled,
        // })
        const classnames = classNames(className, {
            [`${THEMECLASS}-form-checkbox`]: true,
            [`${THEMECLASS}-unselect`]: true,
            [`${THEMECLASS}-form-checked`]: checkboxProps.checked,
            [`${THEMECLASS}-form-disabled`]: checkboxProps.disabled,
        });
        const checkboxClass = classNames({
            [`${THEMECLASS}-indeterminate`]: indeterminate,
        })
        return (
               <label className={classnames}
                    style={style}
                    onMouseEnter={props.onMouseEnter}
                    onMouseLeave={props.onMouseLeave}
                >
                    <RcCheckbox
                    {...checkboxProps}
                    prefixCls={THEMECLASS+"-checkbox"}
                    
                    />
                    {children !== undefined ? children : null}
                </label>  
        )
    }
}