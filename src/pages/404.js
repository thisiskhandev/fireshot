import { Button, Result } from 'antd'
import React from 'react'

export const DC = (props) => {
    return (
        <div className = 'text-center'>
         <Result
            status="404"
            title="404"
            subTitle="Puslapis, kurio ieškote neegzistuoja."
            extra={<Button onClick = {() => props.history.push('/')} type="primary">Grįžti</Button>}
        />
            
            
                   
         </div>
    )
}
