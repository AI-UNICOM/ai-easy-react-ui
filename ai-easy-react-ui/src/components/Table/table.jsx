import React from 'react'

export default class Table extends React.Component{
    render(){
        return(
            <table className="layui-table">
                <colgroup>
                    <col width="50"/>
                    <col width="150"/>
                    <col width="150"/>
                    <col width="200"/>
                    <col/>
                </colgroup>
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>人物</th>
                        <th>民族</th>
                        <th>出场时间</th>
                        <th>格言</th>
                    </tr> 
                </thead>
                <tbody>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>贤心</td>
                    <td>汉族</td>
                    <td>1989-10-14</td>
                    <td>人生似修行</td>
                </tr>
                </tbody>
            </table>
        )
    }
}