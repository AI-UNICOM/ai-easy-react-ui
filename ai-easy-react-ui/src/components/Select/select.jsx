import React from 'react'
import classNames from 'classnames'

const THEMECLASS="layui";

export default class Select extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selected:{},
            open:false
        }
    }
    bindModel=(name,value)=>{
        this.setState({
            [name]:value
        })
    }
    __setDropDownValue__=(value)=>{
        const {selected}=this.state;
        selected.value=value;
        this.setState({selected})
    }
    componentWillMount(){
        const {value} = this.props;
        this.__setDropDownValue__(value)
    }
    componentWillReceiveProps(nextProps){
        const {value} = nextProps;
        this.__setDropDownValue__(value)
    }
    onSelectChange=()=>{
        const {onChange}=this.props;
        const {option}=this.state;
        onChange(option.value,option)
    }
    onOptionsChange=(option)=>{
        this.setState({
            selected:option,
            open:false
        })
    }
    renderOption=(i,item,selected,options,defaultOption)=>{
        const option={
            label:item.children,
            value:item.value!==undefined?item.value:item.children,
            disabled:item.disabled
        }
        if(!option.value){
            defaultOption=option;
            return;
        }
        
        options.push(option)

        const _classes_ = classNames({
            [`${THEMECLASS}-this`]:(selected.value===option.value),
            [`${THEMECLASS}-disabled`]:option.disabled
        })
        return <dd key={i} className={_classes_} onClick={()=>{this.onOptionsChange(option)}}>{option.label}</dd>;
    }
    renderGroupOption=(children,selected,options,defaultOption)=>{
        return children.map((child,i)=>{
            return (
                this.renderOption(i,child.props,selected,options,defaultOption)
            )
        })
    }
    render(){
        let {open,selected}=this.state;
        const {
            className,children,...others,
        } = this.props;
        const classes = classNames(THEMECLASS, {
            [`${THEMECLASS}-unselect`]:true,
            [`${THEMECLASS}-form-select`]:true,
            [`${THEMECLASS}-form-selected`]:open
        }, className);

        let options=[],defaultOption={};
        const kids = React.Children.map(children, (child,i)=>{
            if (child == null) {
                return;
            }
            const type=child.type.toUpperCase();
            
            if(type==="OPTION"){
                const _children_=[child.props.children]
                {this.renderGroupOption(i,_children_,selected,options,defaultOption)}
            }else if(type==="OPTGROUP"){
                const _children_=Array.isArray(child.props.children)?child.props.children:[child.props.children]
                return (
                    <div key={i}>
                        <dt>{child.props.label}</dt>
                        {this.renderGroupOption(_children_,selected,options,defaultOption)}
                    </div>
                )
            }
        });
        const _selected_=options.filter(item=>selected.value==item.value);

        if(_selected_.length){

            selected=_selected_[0]
        }else{
            selected=defaultOption;
        }
        return (
            <div className={classes}>
                <div className={`${THEMECLASS}-select-title`}>
                    <input type="text" {...others} value={selected.label} onChange={()=>{this.onSelectChange()}} readOnly={true} onClick={()=>{this.bindModel("open",true)}} className={`${THEMECLASS}-input ${THEMECLASS}-unselect`}/>
                    <i className={`${THEMECLASS}-edge`}></i>
                </div>
                <dl className={`${THEMECLASS}-anim ${THEMECLASS}-anim-upbit ${THEMECLASS}-select-group`}>
                    {kids}
                </dl>
            </div>
        )
    }
}