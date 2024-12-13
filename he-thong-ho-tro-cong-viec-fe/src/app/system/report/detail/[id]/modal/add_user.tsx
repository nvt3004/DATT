"use client";
import { Modal, Button, Box, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchAll_User } from "@/store/slices/user/userAction";
import { notifications } from "@mantine/notifications";
import { addReport_ingredient } from "@/store/slices/report/repostAction";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";


interface ModalAddUserProps {
    opened: boolean;
    onClose: () => void;
    reportId: number;
    updateImtergay: () => void;
}

const ModalAddUser: React.FC<ModalAddUserProps> = ({
    opened,
    onClose,
    reportId,
    updateImtergay,
}) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { items, loading, error } = useSelector((state: any) => state.user);
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [loadingnvg, setLoadingnvg] = useState(false);

    useEffect(() => {
        dispatch(fetchAll_User());
    }, [dispatch]);

    const handleAdd = async () => {
        if (selectedMember) {
            const memberInfo = items.find(
                (member: any) => String(member.id) === selectedMember
            );
            const newReport = {
                ten: memberInfo.ten,
                donvi: memberInfo.donvi || "",
                email: memberInfo.email || "",
                bienBanHopId: reportId,
                nguoiDungId: Number(selectedMember),
            };
            try {
                setLoadingnvg(true);
                const res = await dispatch(addReport_ingredient(newReport));
                if (res.payload.code === 1000) {
                    updateImtergay();
                    setSelectedMember(null);
                    onClose();
                    setLoadingnvg(false);
                    notifications.show({
                        title: "Thành công",
                        message: "Đã thêm thành viên vào biên bản thành công!",
                        color: "green",
                        position: "top-right",
                    });
                } else {
                    setLoadingnvg(false);
                    notifications.show({
                        title: "Lỗi",
                        message:
                            "Người dùng đã tồn tại trong biên bản họp!",
                        color: "red",
                        position: "top-right",
                    });
                }
            } catch (error) {
                setLoadingnvg(false);
                console.log(error);
                notifications.show({
                    title: "Lỗi",
                    message: "Có lỗi xảy ra khi thêm thành viên vào biên bản!",
                    color: "red",
                    position: "top-right",
                });
            }

        }
    };

    return (
        <>
            <FullScreenLoader visible={loadingnvg} />
            <Modal opened={opened} onClose={onClose} title="Thêm nhanh thành viên">
                <Select
                    label="Chọn thành viên"
                    placeholder="Chọn thành viên từ danh sách"
                    data={items.map((member: any) => ({
                        value: String(member.id),
                        label: member.ten,
                    }))}
                    value={selectedMember}
                    onChange={setSelectedMember}
                    searchable
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
                        disabled={!selectedMember}
                        style={{ marginTop: "10px" }}
                    >
                        Thêm thành viên
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ModalAddUser;
