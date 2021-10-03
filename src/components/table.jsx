import React, {useState, useEffect} from 'react'
import ActionBtn from './actionBtn'
import './style.css'
 import 'font-awesome/css/font-awesome.css'
import faker from 'faker'
import { Fab } from '@mui/material'

const Table = ()=> {
        
        const [stateData, setStateData] = useState([])
        const [addNewInput, setAddNewInput] = useState(false)
        const [inputValues, setInputValues] = useState({
            firstName:'',
            lastName:'',
            email:''
        })
        const [displayBtn, setDisplayBtn] = useState(false)
        const [displayPasteBtn, setDisplayPasteBtn] = useState(false)
        const [cutItems, setCutItems] = useState([])
        useEffect(()=>{
            let allData = []
            let i = 0
            while(i < 100){
                allData.push({
                    id:i,
                    firstName:faker.name.firstName(0),
                    lastName: faker.name.lastName(0),
                    email: faker.internet.email()
                })
                i++
            }
            setStateData(allData)
            console.log(allData, faker.name.lastName)
           

        }, [])
        const handleChange = (e)=>{
            const data = {...inputValues}
            data[e.currentTarget.name] = e.currentTarget.value
            setInputValues(data)          
            
        }

        const handleSave = ()=>{
            if(inputValues.firstName !== ""){
                const data = [...stateData]
                data.push(inputValues)
                setStateData(data)
                alert('record saved successfully')
                console.log(stateData);
            }
        }

        const handleEditing = (e)=>{
            let i = 0
            while(i <= 3){
                const currentRow = e.currentTarget.parentNode.parentNode.children
                const EachRow = currentRow[i]
                EachRow.contentEditable = 'true'
                currentRow[1].focus()
                i++
            }
          
        }

        const handleDelete = (item)=>{
            const cloneData = [...stateData]
            const filteredData =  cloneData.filter(el=>el.id !== item.id)
            setStateData(filteredData)
        }

        const handleAddNew = ()=>{
            setAddNewInput(true)
           
        }
        const handleSelection = (e, item)=>{
            
            let selectedItems = []
            if(e.currentTarget.checked == true){
                console.log(item.id);
                const itemId= stateData.indexOf(item)
                const data = [...stateData]
                data[itemId].isSelected = true
                setStateData(data)
                //console.log(data[item.id]);
                console.log(stateData[item.id])
                e.currentTarget.checked =false
                
            }else{
                const itemId= stateData.indexOf(item)
                const data = [...stateData]
                data[itemId].isSelected = false
                setStateData(data)
                console.log(stateData[itemId])
            }
            const selected = stateData.map(el=>el.isSelected )
            if(selected.length > 0){
                setDisplayBtn(true)
                console.log(displayBtn);
            }else if(selected.length==0){
                setDisplayBtn(false)
                console.log(selected.length);
                console.log(displayBtn);
            }
        }

        const HandleCopy = ()=>{
            setDisplayPasteBtn(true)
            setDisplayBtn(false)
            
        }
        const HandleCut =  ()=>{
            const selected = stateData.filter(el=>el.isSelected)
            setCutItems(selected)
            const cloneData = [...stateData]
            const filteredData =  cloneData.filter(el=>!el.isSelected)
            setStateData(filteredData)
            HandleCopy()

        }
        const HandlePaste = ()=>{
            const data = [...stateData]
            cutItems.map(item=>data.unshift(item))
            const copiedItems = stateData.filter(el=>el.isSelected)
            copiedItems.map(el=>{
                el.isSelected = false
                data.unshift(el)
                
            })
            setStateData(data)
            console.log(stateData)
            setDisplayPasteBtn(false)


        }
        
        return (
            <div>
                {/* {handleDisplayBtn()} */}
                {(displayBtn)? <ActionBtn top={300} color="primary" label="copy" onClick={()=>HandleCopy()} />:<div></div>}
                {(displayBtn)? <ActionBtn colored="red" top={360} label="cut" onClick={()=>HandleCut()} />:<div></div>}
                {(displayPasteBtn)? <ActionBtn color="secondary" top={300} label="paste" onClick={()=>HandlePaste()} />:<div></div>}
                <button 
                    className="btn" 
                    style={{color: 'royalblue'}}
                    onClick={()=>handleAddNew()}
                >+ Add New Item</button>
               <table className="table table-striped">
                   <thead className="thead-dark">
                       <tr>
                           <th></th>
                           <th scope="col">#</th>
                           <th scope="col">First Name</th>
                           <th scope="col">Last Name</th>
                           <th scope="col">Email</th>
                       </tr>
                 
                   </thead>

                   <tbody>
                        {addNewInput &&  <tr>
                            <td>  </td>
                            <td> <input type="text" className="inputs" onChange={(e)=>handleChange(e)} name="firstName" /> </td>
                            <td> <input type="text" className="inputs" onChange={(e)=>handleChange(e)} name="lastName" /> </td>
                            <td> <input type="text" className="inputs" onChange={(e)=>handleChange(e)} name="email" /> </td>
                            <td><button className="btn btn-success" onClick={()=>handleSave()}>save</button></td>
                        </tr>
                        }
                        {stateData.map((item, index)=>
                            <tr  key={index} style={{backgroundColor: item.isSelected ? 'pink':''}}>
                                <td> <input type="checkbox" name="check" onClick={(e)=>handleSelection(e, item)} /> </td>
                                <td >{index}</td>
                                <td >{item.firstName}</td>
                                <td >{item.lastName}</td>
                                <td >{item.email}</td>
                                <td> <i className="fa fa-edit" onClick ={(e)=>handleEditing(e)}></i> </td>
                                <td> <i className="fa fa-trash" onClick={()=>handleDelete(item)}></i> </td>
                            </tr>
                        )}
                        
                    </tbody>
               </table>
            </div>
        )
   
}




export default Table 
