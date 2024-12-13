"use client";
import { AppShell, Group, Box, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { NavbarSystem } from "@/component/system/NavSystem/NavSystem";
import { AsideSystem } from "@/component/system/AsideSystem/AsideSystem";
import MenuSystem from "@/component/system/Menu/Menu";
import Logo from "@/component/system/Menu/Logo";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/notifications/styles.css";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

function SystemLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  const handleNavbarCollapse = (collapsed: boolean) => {
    setIsNavbarCollapsed(collapsed);
  };
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
        width: isNavbarCollapsed ? 60 : 180,
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
                Kinh doanh
              </Text> */}
            </Box>
            <MenuSystem />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <NavbarSystem
            onCollapse={handleNavbarCollapse}
            setLoading={setLoading}
          />
        </AppShell.Navbar>

        <AppShell.Main>
          <Box
            // style={{
            //   visibility: loading ? "hidden" : "visible",
            //   width: "100%",
            //   height: "100%",
            // }}
          >
            {children}
          </Box>
          {loading && (
            <FullScreenLoader visible={loading} />
          )}
        </AppShell.Main>

        <AppShell.Aside p="md">
          <AsideSystem />
        </AppShell.Aside>
      </ModalsProvider>
    </AppShell>
  );
}

export default SystemLayout;
