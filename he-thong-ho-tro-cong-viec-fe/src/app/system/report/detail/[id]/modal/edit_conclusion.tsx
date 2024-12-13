import { Modal, Textarea, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";
import { updateReport_conclude } from "@/store/slices/report/repostAction";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import { ThunkDispatch } from "redux-thunk";

interface EditModalProps {
    opened: boolean;
    onClose: () => void;
    title: string;
    data: {
        id: number | string;
        mota: string;
    };
    reportId: number;
    handleUpdateIngredientList: () => void;
}

const EditConclusion = ({ opened, onClose, title, data, reportId, handleUpdateIngredientList }: EditModalProps) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [formData, setFormData] = useState({
        mota: data.mota,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setFormData({
            mota: data.mota,
        });
    }, [data]);

    const validateInput = () => {
        if (formData.mota.length == 0) {
            setError("Mô tả không được để trống.");
            return false;
        } 
        setError(null);
        return true;
    };

    const handleSave = async () => {
        if (!validateInput()) return;

        const updatedFormData = {
            mota: formData.mota,
            bienBanHopId: reportId,
        };
        setLoading(true);

        try {
            await dispatch(updateReport_conclude({ id: data.id, data: updatedFormData })).unwrap();
            handleUpdateIngredientList();
            notifications.show({
                title: "Thành công",
                message: "Dữ liệu đã được cập nhật thành công!",
                color: "green",
                position: "top-right",
            });
            onClose();
        } catch (error) {
            notifications.show({
                title: "Thất bại",
                message: "Cập nhật dữ liệu thất bại. Vui lòng thử lại!",
                color: "red",
                position: "top-right",
            });
            console.error("Lỗi khi cập nhật:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FullScreenLoader visible={loading} />

            <Modal opened={opened} onClose={onClose} title={`Chỉnh sửa ${title}`}>
                <Textarea
                    label="Mô tả"
                    value={formData.mota}
                    onChange={(event) => {
                        setFormData({ ...formData, mota: event.currentTarget.value });
                        validateInput();
                    }}
                    minRows={6}
                    maxRows={100}
                    autosize
                />

                <Button onClick={handleSave} fullWidth mt="md" disabled={!!error}>
                    Lưu
                </Button>
            </Modal>
        </>
    );
};

export default EditConclusion;
