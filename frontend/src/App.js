import React from "react";
import {Route,Routes,BrowserRouter} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import { Button, ButtonGroup } from '@chakra-ui/react';
import Chat from "./Pages/Chat";
      


function App() {
  return (
    <div className="App">
     {/* <Button colorScheme='blue'>Button</Button> */}
        
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chat />} />

          </Routes>
          
    </div>
  );
}

export default App;
