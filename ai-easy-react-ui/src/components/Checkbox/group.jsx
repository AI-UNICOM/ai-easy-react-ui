import React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Checkbox from './checkbox';

export default class CheckboxGroup extends React.Component{
    static defaultProps = {
        options: [],
        prefixCls: 'ant-checkbox-group',
    };
    static propTypes = {
        defaultValue: React.PropTypes.array,
        value: React.PropTypes.array,
        options: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func,
    };
    static childContextTypes = {
        checkboxGroup: React.PropTypes.any,
    };
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || props.defaultValue || [],
        };
    }
    getChildContext() {
        return {
            checkboxGroup: {
                toggleOption: this.toggleOption,
                value: this.state.value,
                disabled: this.props.disabled,
            },
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value || [],
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) ||
        !shallowEqual(this.state, nextState);
    }
    getOptions() {
        const { options } = this.props;
        return options.map(option => {
            if (typeof option === 'string') {
                return {
                    label: option,
                    value: option,
                }
            }
            return option;
        });
    }
    toggleOption = (option) => {
        const optionIndex = this.state.value.indexOf(option.value);
        const value = [...this.state.value];
        if (optionIndex === - 1) {
            value.push(option.value);
        } else {
            value.splice(optionIndex, 1);
        }
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(value);
        }
    }
    render() {
        const { props, state } = this;
        const { prefixCls, className, options } = props;
        let children = props.children;
        let cc="";
        if (options && options.length > 0) {
            cc = this.getOptions().map(option => (
            <Checkbox
                key={option.value}
                disabled={'disabled' in option ? option.disabled : props.disabled}
                value={option.value}
                checked={state.value.indexOf(option.value) !== -1}
                onChange={() => this.toggleOption(option)}
                className={`${prefixCls}-item`}
            >
            <span className="value_text">{option.label}</span>
            </Checkbox>
            ));
        }

        const classString = classNames(prefixCls, className);
        return (
            <div className={classString}>
            {cc}
            {children}
            </div>
        );
    }
}