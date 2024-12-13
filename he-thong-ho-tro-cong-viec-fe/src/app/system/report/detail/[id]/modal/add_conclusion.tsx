"use client";
import { useState } from "react";
import { Modal, Button, Box, Textarea } from "@mantine/core";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { notifications } from "@mantine/notifications";
import { addReport_conclude } from "@/store/slices/report/repostAction";

interface ModalAddContenProps {
    opened: boolean;
    onClose: () => void;
    id: number | null;
    updateImtergay: () => void;
}

function ModalAddConclusion({
    opened,
    onClose,
    id,
    updateImtergay,
}: ModalAddContenProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [speechContent, setSpeechContent] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    // Hàm validate nội dung
    const validateInput = (content: string) => {
        if (content.trim() === "") {
            setError("Nội dung không được để trống");
            return false;
        }
      
        setError(null);
        return true;
    };

    const handleAdd = () => {
        // Kiểm tra validate trước khi dispatch
        if (!validateInput(speechContent)) return;

        const newReport = {
            mota: speechContent,
            bienBanHopId: id,
        };

        dispatch(addReport_conclude(newReport))
            .then(() => {
                updateImtergay();
                setSpeechContent(""); // Reset giá trị sau khi thành công
                onClose();
                notifications.show({
                    title: "Thành công",
                    message: "Đã thêm kết luận thành công!",
                    color: "green",
                    position: "top-right",
                });
            })
            .catch((error) => {
                console.error(error);
                notifications.show({
                    title: "Lỗi",
                    message: "Có lỗi xảy ra khi thêm kết luận!",
                    color: "red",
                    position: "top-right",
                });
            });
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Thêm kết luận">
            <Textarea
                label="Nội dung kết luận"
                placeholder="Nhập nội dung phát biểu"
                value={speechContent}
                onChange={(e) => {
                    setSpeechContent(e.currentTarget.value);
                    validateInput(e.currentTarget.value); // Kiểm tra lỗi mỗi khi giá trị thay đổi
                }}
                style={{ marginTop: "10px" }}
                minRows={6}
                maxRows={100}
                autosize
            />

            <Box style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
                <Button
                    onClick={handleAdd}
                    disabled={!speechContent || !!error} // Disable khi có lỗi hoặc không có nội dung
                    style={{ marginTop: "10px" }}
                >
                    Lưu kết luận
                </Button>
            </Box>
        </Modal>
    );
}

export default ModalAddConclusion;
