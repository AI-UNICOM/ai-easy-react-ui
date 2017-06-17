import React from 'react'
import classNames from 'classnames'
import './style.scss'
const THEMECLASS="layui"
const COMPONENTNAME=`${THEMECLASS}-tab`
// const Themes=[`brief`]

class Tab extends React.Component {
    static defaultProps={
        theme:"card"
    }
    constructor(props){
        super(props)
        this.state={
            active:0
        }
    }
    onTabChange=(i)=>{
        this.setState({
            active:i
        })
    }
    render() {
        const {children,theme}=this.props;
        const {active}=this.state;
        const items = React.Children.map(children, (child,i)=>{
            if (child == null||!child.type||child.type.name!="Item") {
                return;
            }
            if(child.props.active){
                this.setState({
                    active:i
                })
            }
            const classes=classNames({
                [`${THEMECLASS}-this`]:active==i
            })
            return <li className={classes} onClick={()=>{this.onTabChange(i)}}>{child.props.label}</li>
        });
        const contents= React.Children.map(children, (child,i)=>{
            if (child == null||!child.type||child.type.name!="Item") {
                return;
            }
            const classes=classNames(`${COMPONENTNAME}-item`,{
                [`${THEMECLASS}-show`]:active==i
            })
            return <div className={classes} >{child.props.children}</div>
        });
        const classes=classNames(`${COMPONENTNAME}`,{
            [`${COMPONENTNAME}-${theme}`]:theme
        }) 
        return(
            <div className={classes}>
                <ul className={`${COMPONENTNAME}-title`}>
                    {items}
                </ul>
                <div className={`${COMPONENTNAME}-content`}>
                    {contents}
                </div>
            </div>
       )
    }
}
class Item extends React.Component{
    render(){
        const {children}=this.props;
        return children
    }
}


Tab.Item=Item;

export default Tab