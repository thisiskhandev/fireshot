import React from 'react'
import { NavMenu } from './NavMenu'

export const UserLayout = (props) => {
    return (
        <div>
           {
               props.userMenu ? 
               <div>
                 <NavMenu />
              <div>
                {props.children}
              </div>

            </div>
            :
            props.children
           }
            
        </div>
    )
}
