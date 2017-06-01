import React from 'react'
import classNames from 'classnames'

const THEMECLASS="layui";
const componentClassName=`${THEMECLASS}-nav`

export default class Menu extends React.Component{
    static defaultProps={
        datas:[
            {name:"最新活动"},
            {name:"产品",sub:[
                {name:"选项1"},
                {name:"选项2"},
                {name:"选项3"}
            ]},
            {name:"大数据"}
        ],
        mode:"horizontal"
    }
    constructor(props){
        super(props)
        this.state={
            parentActiveIndex:0,
            childActiveIndex:0,
            parentShowIndex:-1,
        }
    }
    handlerClickParent=(i)=>{
        this.setState({
            parentActiveIndex:i
        })
    }
    handlerShowChilds=(i)=>{
        this.setState({
            parentShowIndex:i
        })
    }
    handlerHideChilds=(e)=>{
        e.stopPropagation()
        this.setState({
            parentShowIndex:-1
        })
    }
    render(){
        const {parentActiveIndex,childActiveIndex,parentShowIndex}=this.state;
        const {children,mode,datas=[],className,...others}=this.props;
        const classes = classNames(componentClassName,{
            [`${componentClassName}-tree`]:mode==="vertical"
        }, className);


        return(
            <ul className={classes}>
                {
                    datas.map((item,i)=>{
                        const {name,href,sub}=item;
                        const parentClass=classNames(`${componentClassName}-item`,{
                                [`${THEMECLASS}-this`]:i===parentActiveIndex
                            })
                        const dlClass=classNames(`${componentClassName}-child`,{
                            [`${THEMECLASS}-anim`]:sub&&sub.length?true:false,
                            [`${THEMECLASS}-anim-upbit`]:sub&&sub.length?true:false,
                            [`${THEMECLASS}-show`]:i===parentShowIndex
                        })

                        const iClass=classNames(`${componentClassName}-more`,{
                            [`${componentClassName}-mored`]:i===parentShowIndex
                        })
                        
                        if(sub&&sub.length){
                            
                            return (
                                <li key={i} className={parentClass} onClick={()=>{this.handlerClickParent(i)}}>
                                    <a href="javascript:;" onMouseEnter={(e)=>{this.handlerShowChilds(i)}} onMouseOut={this.handlerHideChilds}>
                                        {name}
                                        <span className={iClass} ></span>
                                    </a>
                                    <dl className={dlClass}>
                                        {
                                            sub.map((item,i)=>{
                                                return <dd  key={i}><a href={item.href}>{item.name}</a></dd>
                                            })
                                        }
                                    </dl>
                                </li>
                            )
                        }
                        return <li key={i} className={parentClass} onClick={()=>{this.handlerClickParent(i)}}><a href={href}>{name}</a></li>
                    })
                }
                {children}
                <span className={`${componentClassName}-bar`}></span>
            </ul>
        )
    }
}