import React, { useState } from "react";
import { Text, Button, Flex, Stack, Popover, NavLink } from "@mantine/core";
import { IconHome, IconSettings, IconUser } from "@tabler/icons-react";

export function AsideSystem() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [openedPopover, setOpenedPopover] = useState<number | null>(null);

  // Danh sách các item trong aside
  const asideItems = [
    {
      id: 1,
      label: "Home",
      icon: IconHome,
      subMenu: [
        { id: "home-1", label: "Dashboard", icon: IconHome, },
        { id: "home-2", label: "Activity", icon: IconHome, },
      ],
    },
    {
      id: 2,
      label: "Settings",
      icon: IconSettings,
      subMenu: [
        { id: "settings-1", label: "Account" , icon: IconHome,},
      ],
    },
    {
      id: 3,
      label: "Profile",
      icon: IconUser,
      subMenu: [
        { id: "profile-1", label: "View Profile", icon: IconHome, },
      ],
    },
  ];

  const handleClick = (id: number) => {
    setActiveItem(id);
    setOpenedPopover(id);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        position: "fixed",
        right: 0,
        top: 0,
        width: "50px",
      }}
    >
      <Stack>
        {asideItems.map((item: any) => (
          <Popover
            key={item.id}
            width="200px"
            position="left"
            withArrow
            shadow="md"
            opened={openedPopover === item.id}
            onChange={(opened) => setOpenedPopover(opened ? item.id : null)}
          >
            <Popover.Target>
              <NavLink
                leftSection={<item.icon size="1rem" stroke={1.5} />}
                active={activeItem === item.id}
                variant={activeItem === item.id ? "filled" : "light"}
                onClick={() => handleClick(item.id)}
                style={{ cursor: "pointer" }}
              />
            </Popover.Target>
            <Popover.Dropdown style={{ height: "100%" }}>
              <Stack mt="sm" __size="lg">
                {item.subMenu.map((sub: any) => (
                  <Button
                    key={sub.id}
                    variant="light"
                    fullWidth
                    size="xs"
                    style={{ justifyContent: "start" }}
                  >
                    {sub.label}
                  </Button>
                ))}
              </Stack>
            </Popover.Dropdown>
          </Popover>
        ))}
      </Stack>
    </div>
  );
}
