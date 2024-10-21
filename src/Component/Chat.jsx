import React from "react";
import parse from 'html-react-parser';
import {marked}  from "marked";
import "./Chat.css";
import { useTheme } from "./ThemeContext/ThemeContext";

function Chat({ message, loading}) {
  console.log("message", message);
  const { theme, ChangeId } = useTheme();

  return (
    <>
    <section className="p-4 m-2 justify-center mychat">
      <div className="mychat-section flex w-full flex-col">

        {message?.map((ele) => {
          return <> <div className={ele.role=="user"?"user-data self-end":"chatgpt-data self-start"} style={{color: theme.textColor , backgroundColor:ele.role=="user" && theme.backgroundColor}}>{ele?.content && parse(marked(ele.content))}</div> <br/>
          </>
        })}
        {loading &&  <div className="flex justify-start w-full"><span className="loading loading-dots items-start justify-start loading-lg "></span></div>}
       

      </div>
      {/* <button onClick={()=>setData(data+1)}>Add</button> */}
      </section>
    </>
  );
}

export default Chat;
