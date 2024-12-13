import { Modal, Button, TextInput, Group, Grid, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

interface EditContentFormProps {
  opened: boolean;
  onClose: () => void;
}

export default function EditContentForm({
  opened,
  onClose,
}: EditContentFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      tieuDe: "", // Trường cho tiêu đề
      moTa: "", // Trường cho mô tả
      theLoai: "", // Trường cho thể loại
    },
    validate: {
      tieuDe: isNotEmpty("Tiêu đề là bắt buộc"),
      theLoai: isNotEmpty("Thể loại là bắt buộc"),
      moTa: isNotEmpty("Vui lòng nhập mô tả"),
    },
  });

  const handleUpdate = async (values: typeof form.values) => {
    setLoading(true);
    // Call API to perform update here
    try {
      // Example API call (uncomment and modify as needed)
      // await api.updateContent(values);

      // Simulating an API call with a timeout for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000));
      notifications.show({
        title: "Cập nhật thành công",
        message: "Nội dung đã được cập nhật!",
        color: "teal",
        autoClose: 3000,
        position: "top-right",
      });
    } catch (error) {
      notifications.show({
        title: "Cập nhật thất bại",
        message: "Có lỗi xảy ra trong quá trình cập nhật.",
        color: "red",
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <FullScreenLoader visible={loading} />

      <Modal
        opened={opened}
        onClose={onClose}
        title="Cập nhật nội dung"
        size="lg"
        padding="sm"
      >
        <form onSubmit={form.onSubmit(handleUpdate)}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Tiêu đề" // Nhãn cho trường tiêu đề
                placeholder="Nhập tiêu đề..."
                {...form.getInputProps("tieuDe")}
                size="sm"
            
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Thể loại" // Nhãn cho trường thể loại
                placeholder="Chọn thể loại..."
                {...form.getInputProps("theLoai")}
                size="sm"
               
              />
            </Grid.Col>
          </Grid>

          <Textarea
            label="Mô tả"
            placeholder="Nhập mô tả..."
            autosize
            minRows={2}
            maxRows={4}
            {...form.getInputProps("moTa")}
          />

          <Group mt="xl">
            <Button type="submit" size="sm" disabled={loading}>
              Cập nhật
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
