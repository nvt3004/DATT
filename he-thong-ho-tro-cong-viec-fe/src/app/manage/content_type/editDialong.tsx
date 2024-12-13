"use client";

import { Modal, Button, TextInput, Textarea, Group } from "@mantine/core";
import { useState, useEffect } from "react";
import { useForm, isNotEmpty } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

interface EditContentTypeDialogProps {
  opened: boolean;
  onClose: () => void;
  currentData?: { tieuDe: string; moTa: string }; // Made optional
}

export default function Edit_ContentType_Dialog({
  opened,
  onClose,
  currentData,
}: EditContentTypeDialogProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      tieuDe: currentData?.tieuDe || "",
      moTa: currentData?.moTa || "",
    },
    validate: {
      tieuDe: isNotEmpty("Vui lòng nhập tiêu đề"),
      moTa: isNotEmpty("Vui lòng nhập mô tả"),
    },
  });

  const handleSave = (values: typeof form.values) => {
    setLoading(true);
    setTimeout(() => {
      onClose();
      notifications.show({
        title: "Chỉnh sửa thành công",
        message: "Loại nội dung đã được cập nhật.",
        color: "teal",
        autoClose: 3000,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <FullScreenLoader visible={loading} />

      <Modal
        opened={opened}
        onClose={onClose}
        title="Chỉnh Sửa Loại Nội Dung"
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
          />

          <Group mt="xl">
            <Button type="submit" size="sm" disabled={loading}>
              Lưu
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
