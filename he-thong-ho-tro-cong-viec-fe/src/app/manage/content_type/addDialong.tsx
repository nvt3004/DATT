import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Group,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { notifications } from "@mantine/notifications";

interface AddContentTypeDialogProps {
  opened: boolean;
  onClose: () => void;
}

export default function Add_ContentType_Dialog({
  opened,
  onClose,
}: AddContentTypeDialogProps) {
  const form = useForm({
    initialValues: {
      tieuDe: "",
      moTa: "",
    },
    validate: {
      tieuDe: isNotEmpty("Vui lòng nhập tiêu đề"),
      moTa: isNotEmpty("Vui lòng nhập mô tả"),
    },
  });

  const handleSave = () => {
    // Thực hiện lưu trữ giá trị tại đây nếu cần

    form.reset();
    onClose();

    notifications.show({
      title: "Thêm thành công",
      message: "Loại nội dung đã được thêm.",
      color: "teal",
      autoClose: 3000,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Thêm Loại Nội Dung Mới"
      size="lg"
      padding="sm"
    >
      <form onSubmit={form.onSubmit(handleSave)}>
        <TextInput
          label="Tiêu đề"
          placeholder="Nhập tiêu đề"
          {...form.getInputProps("tieuDe")}
          size="sm"
          style={{ marginBottom: "1rem" }}
        />

        <Textarea
          label="Mô tả"
          placeholder="Nhập mô tả"
          resize="vertical"
          {...form.getInputProps("moTa")}
          style={{ marginBottom: "1rem" }}
        />

        <Group mt="xl">
          <Button type="submit" size="sm">
            Thêm
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
