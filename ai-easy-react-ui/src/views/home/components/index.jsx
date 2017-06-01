import './index.scss'
import React from 'react'
import {render} from 'react-dom'
import { Router, Route,hashHistory,IndexRedirect,Link } from 'react-router'

import 'components/_Style_/css/layui.css'
// import ButtonView from 'components/Button/demo'
// import MenuNaView from './include/menuNav'

import Table from 'components/Table'

class App extends React.Component{
    render(){
        console.log("this.props.children",this.props.children)
        return (
            <div className="easy-react-component">
                <aside className="aside-container">
                    <ul>
                        <li className="">
                            <h4>Components</h4>
                            <ul className="">
                                <li className="type-divider">基本</li>
                                <li className="">
                                    <Link to="/button">
                                        按钮组
                                    </Link>
                                </li>
                                <li className="">
                                    <Link to="/menunav">
                                        导航与面包屑
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </aside>
                <section className="main-container">
                    <div className="main-content-container">
                        <Table></Table>
                    </div>
                </section>
            </div>
        )
    }
}
const routes = (
    <Route path="/" component={App}>
         {/*<Route path="button" component={ButtonView} />*/}
    </Route>
)

render(<Router routes={routes} history={hashHistory}/>,document.getElementById("demo"))
