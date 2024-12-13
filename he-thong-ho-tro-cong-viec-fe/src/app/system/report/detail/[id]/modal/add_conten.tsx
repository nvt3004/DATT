"use client";
import { useState } from "react";
import { Modal, Button, TextInput, Text, Box, Textarea } from "@mantine/core";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { notifications } from "@mantine/notifications";
import { addReport_conten } from "@/store/slices/report/repostAction";

interface ModalAddContenProps {
    opened: boolean;
    onClose: () => void;
    id: number | null;
    reporTen: string | null;
    updateImtergay: () => void;
}

function ModalAddConten({
    opened,
    onClose,
    id,
    reporTen,
    updateImtergay,
}: ModalAddContenProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [speechContent, setSpeechContent] = useState<string>("");

    const handleAdd = () => {
        if (speechContent) {
            const newReport = {
                mota: speechContent,
                bienBanThanhPhanId: id,
            };

            dispatch(addReport_conten(newReport))
                .then(() => {
                    updateImtergay();
                    setSpeechContent("");
                    onClose();
                    notifications.show({
                        title: "Thành công",
                        message: "Đã thêm phát biểu thành công!",
                        color: "green",
                        position: "top-right",
                    });
                })
                .catch((error) => {
                    console.log(error);
                    notifications.show({
                        title: "Lỗi",
                        message: "Có lỗi xảy ra khi thêm phát biểu!",
                        color: "red",
                        position: "top-right",
                    });
                });
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Thêm nội dung phát biểu"
        >
            <Text>
                <strong>Người phát biểu:</strong>
            </Text>

            <Textarea
                label={`Nội dung phát biểu của ${reporTen}`}
                placeholder="Nhập nội dung phát biểu"
                value={speechContent}
                onChange={(e) => setSpeechContent(e.currentTarget.value)}
                style={{ marginTop: "10px" }}
                minRows={6}
                maxRows={100}
                autosize
            />

            <Box
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "15px",
                }}
            >
                <Button
                    onClick={handleAdd}
                    disabled={!speechContent}
                    style={{ marginTop: "10px" }}
                >
                    Lưu phát biểu
                </Button>
            </Box>
        </Modal>
    );
}

export default ModalAddConten;
