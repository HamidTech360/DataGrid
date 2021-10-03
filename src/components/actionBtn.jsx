import React from 'react'
import { Fab } from '@mui/material'

const ActionBtn = ({color, label, onClick, colored, top})=>{
    return(
        <div onClick={onClick} style={{position:'absolute', top:top, left:'80%'}}>
            <Fab color={color} aria-label="copy" style={{backgroundColor:colored, color:'white'}}>
                {label}
            </Fab>
        </div>
    )
}
export default ActionBtn 