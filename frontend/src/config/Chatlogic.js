import React from 'react'

export const getSender=(users,loggeduser)=>{
   return users[0].name!==loggeduser?users[0].name:users[1].name;
}
   

   export const getSenderFull=(users,loggeduser)=>{
      return users[0]._id=loggeduser._id?users[0]:users[1];
      

   }
   export const isSamesender=(messages,m,i,user)=>{
      if (
         i < messages.length - 1 &&
         messages[i + 1].sender._id === m.sender._id &&
         messages[i].sender._id !== user._id
       )
         return 33;
       else if (
         (i < messages.length - 1 &&
           messages[i + 1].sender._id !== m.sender._id &&
           messages[i].sender._id !== user._id) ||
         (i === messages.length - 1 && messages[i].sender._id !== user._id)
       )
         return 0;
       else return "auto";


   }
   export const isSameuser=(messages,message,i)=>{
      return i>0&&messages[i-1].sender._id==message.sender._id;

   }



