"use client";
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from "@mantine/core";
import classes from "./resgister.module.css";
import Link from "next/link";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";

export default function AuthenticationTitle() {
    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        validate: {
            email: isEmail("Email không hợp lệ"),
            matKhau: isNotEmpty("Mật khẩu không được để trống"),
            sodt: isNotEmpty("Số điện thoại không được để trống"),
            hoten: isNotEmpty("Họ và tên không được để trống"),
        },
    });
    const handleSubmit = (values: typeof form.values) => {
    };
    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Đăng kí!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Bạn đã có tài khoản?{" "}
                <Anchor size="sm" component="button">
                    Đăng nhập
                </Anchor>
            </Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput
                        label="Họ và Tên"
                        placeholder="Nhập họ và tên"
                        key={form.key("hoten")}
                        {...form.getInputProps("hoten")}
                    />
                    <TextInput
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        key={form.key("sodt")}
                        {...form.getInputProps("sodt")}
                    />
                    <TextInput
                        label="Email"
                        placeholder="you@mantine.dev"
                        key={form.key("email")}
                        {...form.getInputProps("email")}
                    />
                    <PasswordInput
                        label="Mật khẩu"
                        placeholder="nhập mật khẩu"
                        mt="md"
                        key={form.key("matKhau")}
                        {...form.getInputProps("matKhau")}
                    />
                    <Group justify="space-between" mt="lg">
                        <Link href="/forgotpass">
                            <Anchor component="button" size="sm">
                                Quên mật khẩu?
                            </Anchor>
                        </Link>
                    </Group>
                    <Button fullWidth mt="xl" type="submit">
                        Đăng kí
                    </Button>
                </Paper>
            </form>
        </Container>
    );
}
