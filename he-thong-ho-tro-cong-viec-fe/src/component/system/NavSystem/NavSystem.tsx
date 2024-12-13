"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Popover, Button, NavLink, Stack, Paper, Box } from "@mantine/core";
import {
  IconHome,
  IconTools,
  IconCirclePlus,
  IconHistory,
  IconCalendarStats,
  IconListSearch,
  IconFilePlus,
  IconZoomOut,
  IconZoomIn,
} from "@tabler/icons-react";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

export function NavbarSystem({
  onCollapse,
  setLoading
}: {
  onCollapse: any;
  setLoading: any
}) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [openedPopover, setOpenedPopover] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const navItems = [
    {
      id: 1,
      label: "Trang Chủ",
      icon: IconHome,
      subMenu: [{ id: "1", label: "Dashboard", router: "/system", icon: IconHome }],
    },
    {
      id: 2,
      label: "Báo Giá",
      icon: IconTools,
      subMenu: [
        { id: "1", label: "Danh Sách Báo Giá", router: "/system/list_quote", icon: IconTools },
        { id: "2", label: "Tạo Báo Giá", router: "/system/list_quote/add_quote", icon: IconCirclePlus },

      ],
    },
    {
      id: 3,
      label: "Biên bản họp",
      icon: IconCalendarStats,
      subMenu: [
        { id: "1", label: "Danh sách biên bản họp", router: "/system/report", icon: IconListSearch },
        { id: "2", label: "Tạo biên bản họp", router: "/system/report/add", icon: IconFilePlus },
      ],
    },
  ];

  const handleClick = (id: number) => {
    setActiveItem(id);
    setOpenedPopover(id);
  };

  const handlePushRouter = (route: string) => {
    startTransition(() => {
      router.push(route);
    });
  };

  const toggleCollapse = () => {
    const newCollapseState = !isCollapsed;
    setIsCollapsed(newCollapseState);
    onCollapse(newCollapseState);
  };

  return (
    <>
      <FullScreenLoader visible={isPending} />
      <Paper style={{ display: "flex", height: "auto" }}>

        <Box
          style={{
            width: isCollapsed ? "50px" : "180px",
            transition: "width 0.3s",
          }}
        >
          <Stack>
            <Button
              onClick={toggleCollapse}
              style={{
                padding: "0px",
                marginRight: isCollapsed ? "10px" : "0px",
                width: "40px",
              }}
              variant={isCollapsed ? "filled" : "default"}
              color={isCollapsed ? "blue" : "gray"}
            >
              {isCollapsed ? <IconZoomIn size={15} stroke={2} /> : <IconZoomOut size={15} stroke={2} />}
            </Button>

            {navItems.map((item) => (
              <Popover
                key={item.id}
                width="250px"
                position="right"
                withArrow
                shadow="md"
                opened={openedPopover === item.id}
                onChange={(opened) => setOpenedPopover(opened ? item.id : null)}
              >
                <Popover.Target>
                  <NavLink
                    label={isCollapsed ? "" : item.label}
                    leftSection={<item.icon size="1rem" stroke={1.5} />}
                    active={activeItem === item.id}
                    variant={activeItem === item.id ? "filled" : "light"}
                    onClick={() => handleClick(item.id)}
                    style={{
                      cursor: "pointer",
                      marginRight: isCollapsed ? "15px" : "0px",
                      width: isCollapsed ? "45px" : "100%",
                      borderRadius: "20px",
                      height: isCollapsed ? "40px" : "50px",
                      lineHeight: isCollapsed ? "40px" : "50px",
                    }}
                  />
                </Popover.Target>

                <Popover.Dropdown style={{ height: "100%" }}>
                  <Stack mt="sm" __size="lg">
                    {item.subMenu.map((sub: any) => (
                      <Button
                        leftSection={<sub.icon size="1rem" stroke={1.5} />}
                        key={sub.id}
                        variant="light"
                        fullWidth
                        size="xs"
                        style={{ justifyContent: "start" }}
                        onClick={() => handlePushRouter(sub.router)}
                      >
                        {sub.label}
                      </Button>
                    ))}
                  </Stack>
                </Popover.Dropdown>
              </Popover>
            ))}
          </Stack>
        </Box>
      </Paper>
    </>

  );
}
