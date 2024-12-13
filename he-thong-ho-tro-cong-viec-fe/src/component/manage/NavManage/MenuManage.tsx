"use client";
import { forwardRef } from "react";
import { IconAB2, IconBellRinging, IconMessage } from "@tabler/icons-react";
import { Group, Avatar, Menu, UnstyledButton, Box, Text } from "@mantine/core";
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    image: string;
    // name: string;
    // email: string;
    icon?: React.ReactNode;
}

function MenuManage() {
    const router = useRouter()
    const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
        ({ image, name, icon, ...others }: UserButtonProps, ref) => (
            <UnstyledButton
                ref={ref}
                style={{
                    padding: "var(--mantine-spacing-md)",
                    color: "var(--mantine-color-text)",
                    borderRadius: "var(--mantine-radius-sm)",
                }}
                {...others}
            >
                <Group>
                    <Avatar src={image} radius="xl" />
                </Group>
            </UnstyledButton>
        )
    );
    return (
        <>
            <Box
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "30",
                    marginRight: "30px",
                }}
            >
                <Box
                    style={{
                        marginRight: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => router.push('/system')}
                >
                    <IconAB2 stroke={2} />
                    <Text c="blue">Kinh doanh</Text>
                </Box>
                <Box
                    style={{
                        marginRight: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <IconBellRinging size="1.5rem" stroke={1.5} />
                </Box>
                <Box
                    style={{
                        marginRight: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <IconMessage size="1.5rem" stroke={1.5} />
                </Box>

                <Menu withArrow>
                    <Menu.Target>
                        <UserButton
                            image="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        />
                    </Menu.Target>

                    <Menu.Dropdown>
                        {/* <Menu.Item onClick={() => router.push('/system/acount')}>Thông tin tài khoản</Menu.Item> */}
                        <Menu.Item>Thông tin tài khoản</Menu.Item>
                        <Menu.Item onClick={() => alert("Cài đặt")}>Cài đặt</Menu.Item>
                        <Menu.Item onClick={() => signOut({ callbackUrl: '/login', redirect: true })}>Đăng xuất</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Box>
        </>
    );
}

export default MenuManage;