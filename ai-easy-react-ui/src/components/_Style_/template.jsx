import React from 'react'

export default class Temp extends React.Component{
    render(){
        const {title,children}=this.props;

        return (
            <div className="markdown">
                <h1>{title}</h1>
                <hr/>
                <h2>展示</h2>
                {children}
                <h2>使用</h2>
                <pre>
                    <code>
                        1111
                    </code>
                </pre>
            </div>
        )
    }
}