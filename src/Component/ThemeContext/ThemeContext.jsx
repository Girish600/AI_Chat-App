import React, {createContext, useContext, useState} from 'react';

const CreateTheme=createContext(); 
const theme =[{ 
    id:1, 
    backgroundColor:"#212121", 
    textColor:'white',       
}, 
{ 
    id:2, 
    backgroundColor:"white", 
    textColor:'black', 
   inputColor:'#F4F4F9' 
 
}] 
export const ThemeProvider=({children})=>{ 
    const saveId=localStorage.getItem('ThemeId')||1 
    const [id,setId]=useState(saveId); 
 
    const ChangeId=(value)=>{ 
        if(!value) return alert('please choose your theme') 
            setId(value) 
        localStorage.setItem('ThemeId',value) 
    } 
    return( 
     <CreateTheme.Provider value={{theme:theme.find((ele)=>ele.id==id),ChangeId}}> 
        {children} 
     </CreateTheme.Provider> 
    ) 
} 
export const useTheme=()=>useContext(CreateTheme)