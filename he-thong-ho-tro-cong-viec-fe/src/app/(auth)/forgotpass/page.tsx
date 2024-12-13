"use client";
import {
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./ForgotPassword.module.css";
import { isEmail, useForm } from "@mantine/form";
import Link from "next/link";

export default function ForgotPassword() {
    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            email: "",
        },
        validate: {
            email: isEmail("Email không hợp lệ"),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        form.reset();
    };
    return (
        <>
            <Container size={460} my={30}>
                <Title className={classes.title} ta="center">
                    Quên mật khẩu của bạn?
                </Title>
                <Text c="dimmed" fz="sm" ta="center">
                    Nhập email của bạn để nhận liên kết đặt lại
                </Text>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                        <Box className="flex justify-start items-center mb-2">
                            <Anchor
                                c="dimmed"
                                size="sm"
                                className={classes.control}
                            >
                                <Center inline>
                                    <IconArrowLeft
                                        style={{
                                            width: rem(12),
                                            height: rem(12),
                                        }}
                                        stroke={1.5}
                                    />
                                </Center>
                            </Anchor>
                            <Link href="/login">
                                <Text ml={5}>Quay về</Text>
                            </Link>
                        </Box>
                        <TextInput
                            label="Email"
                            placeholder="me@mantine.dev"
                            required
                            key={form.key("email")}
                            {...form.getInputProps("email")}
                        />
                        <Group
                            justify="space-between"
                            mt="lg"
                            className={classes.controls}
                            style={{justifyContent: 'end' , display: 'flex'}}
                        >
                            <Button className={classes.control} type="submit">
                                Reset mật khẩu
                            </Button>
                        </Group>
                    </Paper>
                </form>
            </Container>
        </>
    );
}
