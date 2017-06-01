import React from 'react'
import RcPagination from 'rc-pagination'
import classNames from 'classnames'

import './style.scss'

const THEMECLASS="layui";

export default class Pagination extends React.Component{
    static defaultProps = {
        prefixCls: `${THEMECLASS}-laypage`
    };
    static propTypes={
        total: React.PropTypes.number.isRequired,
        defaultCurrent:React.PropTypes.number,
        current: React.PropTypes.number,
        defaultPageSize: React.PropTypes.number,
        pageSize:React.PropTypes.number,
        onChange: React.PropTypes.func,
        showSizeChanger:React.PropTypes.bool,
        pageSizeOptions:React.PropTypes.array,
        onShowSizeChange:React.PropTypes.func,
        showQuickJumper:React.PropTypes.bool,
        size:React.PropTypes.string,
        simple:React.PropTypes.bool,
        locale:React.PropTypes.object,
        className:React.PropTypes.string
    }
    render() {
        const { className, size, ...restProps } = this.props;
        const isSmall = size === 'small';
        return (
            <RcPagination
                {...restProps}
                className={classNames(className)}
            />
        );
    }
}