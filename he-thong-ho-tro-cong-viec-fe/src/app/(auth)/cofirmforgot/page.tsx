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
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

function ConfirmForgot() {
    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            pin: "",
        },
        validate: {
            pin: isNotEmpty("Pin không được để trống"),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        form.reset();
    };
    return (
        <>
            <Container size={460} my={30}>
                    <Title ta="center">Xác nhận mã pin?</Title>
                    <Text c="dimmed" fz="sm" ta="center">
                        Nhập mã pin của bạn để nhận liên kết đặt lại mật khẩu
                    </Text>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Paper
                            withBorder
                            shadow="md"
                            p={30}
                            radius="md"
                            mt="xl"
                        >
                            <TextInput
                                label="Pin"
                                placeholder="VD:12313123"
                                key={form.key("pin")}
                                {...form.getInputProps("pin")}
                            />
                            <Group justify="space-between" mt="lg">
                                <Anchor c="dimmed" size="sm"></Anchor>
                                <Button type="submit">Xác nhận</Button>
                            </Group>
                        </Paper>
                    </form>
                </Container>
        </>
    );
}

export default ConfirmForgot;
