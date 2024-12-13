"use client";
import { AppShell, Group, Box, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import Logo from "@/component/system/Menu/Logo";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/notifications/styles.css";

import { NavbarManage } from "@/component/manage/NavManage/NavManage";
import MenuManage from "@/component/manage/NavManage/MenuManage";
import { DraggableAside } from "@/component/manage/AsideMenu/AsideMenu";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

function Managelayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <AppShell
      header={{ height: 80 }}
      footer={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
      }}
      aside={{
        width: 50,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <ModalsProvider>
        <Notifications />
        <AppShell.Header>
          <Group h="100%" px="md" style={{ justifyContent: "space-between" }}>
            <Box style={{ marginLeft: "30px" }}>
              <Logo />
            </Box>
          </Group>
        </AppShell.Header>

        <AppShell.Header>
          <Group h="100%" px="md" style={{ justifyContent: "space-between" }}>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "30px",
              }}
            >
              <Logo />
              {/* <Text
                style={{
                  marginLeft: "100px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                size="lg"
                fw={900}
                c="blue"
              >
               Quản Lý
              </Text> */}
            </Box>
            <MenuManage />

          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <NavbarManage />
        </AppShell.Navbar>

        <AppShell.Main>
          <Box>
            {children}
          </Box>
          {loading && (
              <FullScreenLoader visible={loading} />
          )}
        </AppShell.Main>
        <DraggableAside />
      </ModalsProvider>
    </AppShell>
  );
}

export default Managelayout;
