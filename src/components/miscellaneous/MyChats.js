import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../../config/ChatLogic';
import GroupChatModal from './GroupChatModal';

const MyChats = () => {
  const [loggedUser, setloggedUser] = useState();
  const {Chats,selectedChat,setselectedChat,user,setChats,fetchAgain} = useContext(AppContext);
  const toast = useToast();
  const fetchChats = async()=>{
    try {
      const config ={
        headers :{
            Authorization : `Bearer ${user.token}`
        },
    }
    const {data} = await axios.get("http://localhost:4000/chat",config);
    console.log("my chat", data);
    setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
    });
    }
  }
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    console.log("fetching data agin",fetchAgain);
    console.log("Mychats",data.user);
    setloggedUser(data.user);
    fetchChats();
  }, [fetchAgain]);
  
  return (
    <Box
    display={{base : selectedChat? "none" : "flex" , md:"flex"}}
    flexDir={"column"}
    alignItems={"center"}
    p={3}
    bg={"white"}
    w={{base : "100%", md : "31%"}}
    borderRadius={"lg"}
    borderWidth={"1px"}>
      <Box
      pb={3}
      px={3}
      fontSize={{base: "28px", md:"30px"}}
      display="flex"
      w={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}>
        My Chats
        <GroupChatModal>
        <Button
        display={"flex"}
        fontSize={{base : "17px", md : "10px", lg:"17px"}}
        rightIcon={<AddIcon/>}>new Group</Button>
        </GroupChatModal>
      </Box>
      <Box
      display={"flex"}
      flexDir={"column"}
      p={3}
      bg={"#F8F8F8"}
      w={"100%"}
      h={"100%"}
      borderRadius={"lg"}
      overflow={"hidden"}>
        {Chats?(
          <Stack overflow={"scroll"}>
            {Chats.map((chat)=>{
              return (
                <Box
                onClick={()=>{setselectedChat(chat)}}
                cursor={"pointer"}
                bg={selectedChat === chat? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={chat._id}
                _hover={{
                  background: "#38B2AC",
                  color: "white",
                }}>
                  <Text>{!chat.isGroupChat?(getSender(loggedUser,chat.users)):(chat.chatName)}</Text>
                </Box>
              )
            })}
          </Stack>
        ):(
          <ChatLoading/>
        )}
      </Box>
    </Box>
  )
}

export default MyChats