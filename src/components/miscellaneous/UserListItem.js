
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
// import { useContext} from "react";
// import AppContext from "../../context/AppContext";

const UserListItem = ({user, handleFunction }) => {
//   const { user } = useContext(AppContext);
// console.log("from userlistitem",user);
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background : "#69738E",
        // background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={1}
      mb={1}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;