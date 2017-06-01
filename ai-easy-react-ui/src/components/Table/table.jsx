import React from 'react'
import CheckBox from '../Checkbox'
import classNames from 'classnames'

const THEMECLASS="layui";
const componentClassName=`${THEMECLASS}-table`
export default class Table extends React.Component{
    static defaultProps={
        keyName:"name",
        dataSource:[
            {name:"魏",age:"2",sex:"男",address:"南京",qita:"qita"},
            {name:"王",age:"2",sex:"男",address:"南京",qita:"qita"}
        ],
        columns:[
            {
                title: '姓名',
                name: 'name',
                render: item => <h1>{item.address}</h1>,
            }, {
                title: '年龄',
                name: 'age',
            }, {
                title: '地址',
                name: 'address',
            },{
                title: '性别',
                name: 'sex',
            }
        ],
        rowSelection : {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        }
    }
    // static propTypes={
    //     columns:React.PropTypes.array.isRequired,
    //     dataSource:React.PropTypes.array
    // }
    constructor(props){
        super(props)
        this.state={
            _SelectedIndex_:[]
        }
    }
    handlerRowSelected=(checked,value)=>{
        let {_SelectedIndex_}=this.state
        const {rowSelection:{onChange},dataSource,keyName}=this.props
        if(checked){
            _SelectedIndex_.push(value)
            _SelectedIndex_=Array.from(new Set(_SelectedIndex_))
        }else{
            _SelectedIndex_.splice(_SelectedIndex_.indexOf(value),1)
        }
        
        this.setState({
            _SelectedIndex_
        })
        const [rows,selected]=[[],[]]
        dataSource.forEach((item,i)=>{
            if(_SelectedIndex_.indexOf(i)>-1){
                rows.push(item)
                selected.push(item[keyName]||i)
            }
        })
        onChange(selected,rows);
    }
    handlerAllSelected=()=>{
        
    }
    render(){
        const {skin,hasEven,columns,dataSource,rowSelection,...others}=this.props;
        const _classes_ = classNames(componentClassName,{
            [`${componentClassName}-even`]:hasEven,
            [`${componentClassName}-line`]:skin==="line",//行边框
            [`${componentClassName}-row`]:skin==="row",//列边框
            [`${componentClassName}-nob`]:skin==="nob",//无边框
        })

        const isCheckBox=rowSelection!==undefined
        
        //渲染 colgroup
        const ColGroup=columns.map((item,i)=>{
            return <col key={i} width={item.width}/>
        })
        const ColGroupCheckBox=isCheckBox? <col width="20"/>:null

        //渲染 thead
        const TheadTr=columns.map((item,i)=>{
            return <th key={i}>{item.title}</th>
        })
        const TheadTrCheckBox=isCheckBox? <th><CheckBox /></th>:null

        //渲染 tbody
        const TbodyTrCheckBox=(i,item)=>isCheckBox? <td><CheckBox onChange={(e)=>{this.handlerRowSelected(e.target.checked,i)}} /></td>:null
        const TbodyTr=dataSource.map((item,i)=>{
            return (
                <tr key={i}>
                    {TbodyTrCheckBox(i,item)}
                    {
                        columns.map((m,j)=>{
                            if(m.render){
                                return <td key={j}>{m.render(item)}</td>
                            }
                            return <td key={j}>{item[m.name]}</td>
                        })
                    }
                </tr>   
            )
        })

        return(
            
            <table className={_classes_}>
                <colgroup>
                    {ColGroupCheckBox}
                    {ColGroup}
                </colgroup>
                <thead>
                    <tr>
                        {TheadTrCheckBox}
                        {TheadTr}
                    </tr> 
                </thead>
                <tbody>
                    {TbodyTr}
                </tbody>
            </table>
        )
    }
}