import React from 'react'
import classNames from 'classnames'
import shallowEqual from 'shallowequal';
import RcRadio from 'rc-radio'

import './style.scss'

const THEMECLASS="layui";
export default class Radio extends React.Component{

  static contextTypes = {
    radioGroup: React.PropTypes.any,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  }

  render() {
    const { props, context } = this;
    const {
      className,
      children,
      style,
      ...restProps,
    } = props;
    const { radioGroup } = context;
    let radioProps= { ...restProps };
    if (radioGroup) {
      radioProps.onChange = radioGroup.onChange;
      radioProps.checked = props.value === radioGroup.value;
      radioProps.disabled = props.disabled || radioGroup.disabled;
    }
    const classnames = classNames(className, {
      [`${THEMECLASS}-form-radio`]: true,
      [`${THEMECLASS}-unselect`]: true,
      [`${THEMECLASS}-form-radioed`]: radioProps.checked,
      [`${THEMECLASS}-form-disabled`]: radioProps.disabled,
    });

    return (
      <label
        className={classnames}
        style={style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <RcRadio
          {...radioProps}
          prefixCls={THEMECLASS+"-radio"}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}

