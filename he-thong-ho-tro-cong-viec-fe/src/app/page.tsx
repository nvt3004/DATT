"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession, getSession } from "next-auth/react";
import { Box, Button, Text } from "@mantine/core";
import { __findCurrentUser } from "@/api/account";
import { useAuth } from "@/hooks/useAuth";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPrimaryColor } from "@/store/slices/general/generalSlice";

const MyComponent = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user } = useAuth();

  // redux
  const dispatch = useDispatch();
  const primaryColor = useSelector(
    (state: RootState) => state.general.primaryColor
  );

  return (
    <>
      <Box>
        {status == "authenticated" ? (
          <Box>
            <Text>Đã đăng nhập với Token: {session?.accessToken}</Text>
            <Button variant="outline" color="red" onClick={() => signOut()}>
              Logout
            </Button>

            <Text>Hello, {user?.caNhan?.ten}</Text>
          </Box>
        ) : (
          <></>
        )}

        <Text c={primaryColor}>Hello world!</Text>

        <Button
          onClick={() => {
            if (primaryColor == "blue") {
              dispatch(setPrimaryColor("green"));
            } else {
              dispatch(setPrimaryColor("blue"));
            }
          }}
        >
          Change color
        </Button>
      </Box>
    </>
  );
};

export default MyComponent;
