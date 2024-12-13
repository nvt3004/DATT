import { Modal, Box, Button, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { upDateReport_ingredient } from "@/store/slices/report/repostAction";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import { ThunkDispatch } from "redux-thunk";
import { fetchAll_User } from "@/store/slices/user/userAction";

interface EditModalProps {
    opened: boolean;
    onClose: () => void;
    title: string;
    data: any;
    reportId: number;
    handleUpdateIngredientList: () => void;

}

const EditUser = ({ opened, onClose, title, data, reportId, handleUpdateIngredientList }: EditModalProps) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [formData, setFormData] = useState(data);
    const [ngayTao, setNgayTao] = useState<Date | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const { items, loadings, error } = useSelector((state: any) => state.user);

    useEffect(() => {
        dispatch(fetchAll_User());
    }, [dispatch]);

    useEffect(() => {
        const userInfo = items.find((user: any) => user.ten === data.ten);
        if (userInfo) {
            setFormData(userInfo);
            setSelectedUserId(userInfo.id);
            if (userInfo.ngayTao) {
                const date = new Date(userInfo.ngayTao);
                setNgayTao(date);
            }
        } else {
            setFormData(data);
            setNgayTao(null);
        }
    }, [data, items]);

    const handleSave = async () => {
        const updatedFormData = {
            ten: formData.ten,
            donvi: formData.donvi,
            email: formData.email,
            bienBanHopId: reportId,
            nguoiDungId: selectedUserId || null,
        };
        setLoading(true);

        try {
            await dispatch(upDateReport_ingredient({ id: data.id, data: updatedFormData })).unwrap();
            handleUpdateIngredientList();
            notifications.show({
                title: "Thành công",
                message: "Dữ liệu đã được cập nhật thành công!",
                color: "green",
                position: "top-right"
            });
            onClose();
        } catch (error) {
            notifications.show({
                title: "Thất bại",
                message: "Cập nhật dữ liệu thất bại. Vui lòng thử lại!",
                color: "red",
                position: "top-right"
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
                <Select
                    label="Chọn người dùng"
                    value={formData.ten}
                    data={items.map((user: any) => ({ value: user.ten, label: user.ten }))}
                    onChange={(selectedName) => {
                        const selectedUser = items.find((user: any) => user.ten === selectedName);
                        if (selectedUser) {
                            setFormData(selectedUser);
                            setSelectedUserId(selectedUser.id);
                            if (selectedUser.ngayTao) {
                                setNgayTao(new Date(selectedUser.ngayTao));
                            }
                        }
                    }}
                />
                <Box style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
                    <Button onClick={handleSave} fullWidth mt="md">
                        Lưu
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default EditUser;
