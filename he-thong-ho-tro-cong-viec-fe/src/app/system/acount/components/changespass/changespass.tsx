import { Tabs } from "@mantine/core";
import { Paper, Button, Container, Group, Anchor } from "@mantine/core";
import { isNotEmpty, matchesField, useForm } from "@mantine/form";
import { PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
function Changespass() {
  const router = useRouter();
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    validateInputOnBlur: true,
    mode: "uncontrolled",
    initialValues: {
      matkhau: "",
      xacnhanmatkhau: "",
    },
    validate: {
      matkhau: isNotEmpty("Mật khẩu không được để trống"),
      xacnhanmatkhau: matchesField("matkhau", "Mật khẩu không tương tự"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    router.push("/login");
    form.reset();
  };
  return (
    <>
      {" "}
      <Container size={460} my={30}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <PasswordInput
              label="Mật khẩu mới"
              placeholder="nhập mật khẩu mới"
              key={form.key("matkhau")}
              {...form.getInputProps("matkhau")}
              visible={visible}
              onVisibilityChange={toggle}
            />
            <PasswordInput
              label="Xác nhận mật khẩu mới"
              placeholder="nhập mật khẩu mới"
              key={form.key("xacnhanmatkhau")}
              {...form.getInputProps("xacnhanmatkhau")}
              visible={visible}
              onVisibilityChange={toggle}
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

export default Changespass;
