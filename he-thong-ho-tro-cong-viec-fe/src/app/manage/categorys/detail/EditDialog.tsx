"use client";
import { Modal, TextInput, Button, Stack } from "@mantine/core";
import { useState, useEffect } from "react";
interface EditDialogProps {
  opened: boolean;
  onClose: () => void;
  data: any;
}
export default function EditDialog({ opened, onClose, data } : EditDialogProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Chỉnh sửa thông tin"
      centered
    >
      <Stack>
        {formData &&
          Object.keys(formData).map((key) => (
            <TextInput
              key={key}
              label={key}
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
            />
          ))}
        <Button onClick={handleSave}>Lưu</Button>
      </Stack>
    </Modal>
  );
}
