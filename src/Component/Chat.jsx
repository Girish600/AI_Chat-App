import React from "react";
import parse from 'html-react-parser';
import {marked}  from "marked";
import "./Chat.css";

function Chat({ message, loading}) {
  console.log("message", message);

  return (
    <>
    <section class="p-4 m-2 justify-center mychat">
      <div className="mychat-section">

        {message?.map((ele) => {
          return <> <div className={ele.role=="user"?"user-data":"chatgpt-data"}>{ele?.content && parse(marked(ele.content))}</div> <br/>
          </>
        })}
        {loading &&  <div class="flex items-center justify-start w-full"><span class="loading loading-dots loading-lg "></span></div>}
       

      </div>
      {/* <button onClick={()=>setData(data+1)}>Add</button> */}
      </section>
    </>
  );
}

export default Chat;
