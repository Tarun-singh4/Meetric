"use client"
import { authClient } from "@/src/lib/auth-client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@base-ui/react";
export default function Home() {
  const { data: session} = authClient.useSession() 


  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const onSubmit=()=>{
    authClient.signUp.email({
      email,name,password
    },{
        onSuccess: () => {
            window.alert("user created successfully")
        },
        onError: () => {
            window.alert("something went wrong")
    }, });
  }

  const onLogin=()=>{
    authClient.signIn.email({
      email,password
    },{
        onSuccess: () => {
            window.alert("user created successfully")
        },
        onError: () => {
            window.alert("something went wrong")
    }, });
  }
  if(session){
    return(
      <div className="flex flex-col p-4 gap-4">
        <p>logged in as {session.user.name}</p>
        <Button onClick={()=> authClient.signOut()}>sign out</Button>
      </div>
    );
  }


  return (
    <div className="flex flex-col gep-y-10">
    <div className="flex flex-col gap-4" p-4>
      <input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
      <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

      <button onClick={onSubmit}>create user</button>
    </div>



    <div className="flex flex-col gap-4" p-4>
       <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

      <button onClick={onLogin}>login</button>
    </div>
    </div>
  )
}
//shadcn@4.7.0

  