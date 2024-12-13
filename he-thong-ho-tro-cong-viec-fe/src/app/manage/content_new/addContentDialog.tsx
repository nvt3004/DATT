import {
  Modal,
  Button,
  TextInput,
  Select,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

interface AddContentFormProps {
  opened: boolean;
  onClose: () => void;
}


const AddContentForm = ({ opened, onClose }: AddContentFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      ten: "",
      moTa: "",
    },

    validate: {
      ten: isNotEmpty("Tên là bắt buộc"),
      moTa: isNotEmpty("Mô tả là bắt buộc"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    setLoading(true);

    setTimeout(() => {
      onClose();
      form.reset();
      notifications.show({
        title: "Thêm thành công",
        message: "Nội dung đã được thêm vào danh sách.",
        color: "teal",
        autoClose: 3000,
        position: "top-right",
      });

      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <FullScreenLoader visible={loading} />

      <Modal opened={opened} onClose={onClose} title="Thêm loại nội dung" size="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput

            label="Tên"
            placeholder="Nhập tên"
            {...form.getInputProps("tieuDe")}
          />
          <TextInput

            label="Mô tả"
            placeholder="Nhập mô tả"
            {...form.getInputProps("moTa")}
          />
          <Button type="submit" fullWidth mt="md">
            Thêm
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddContentForm;
