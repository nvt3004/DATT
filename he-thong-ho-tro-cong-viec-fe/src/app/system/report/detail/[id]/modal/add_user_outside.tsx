"use client";
import { Modal, Button, Box, TextInput, Notification } from "@mantine/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchAll_User } from "@/store/slices/user/userAction";
import { notifications } from "@mantine/notifications";
import { addReport_ingredient_outside } from "@/store/slices/report/repostAction";

interface ModalAddUserProps {
    opened: boolean;
    onClose: () => void;
    reportId: number;
    updateImtergay: () => void;
}

const ModalAddUser_outside: React.FC<ModalAddUserProps> = ({
    opened,
    onClose,
    reportId,
    updateImtergay,
}) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        unit: "",
        email: "",
    });
    useEffect(() => {
        dispatch(fetchAll_User());
    }, [dispatch]);

    const validateForm = () => {
        const newErrors = {
            name: "",
            unit: "",
            email: "",
        };

        let isValid = true;
        if (!name.trim()) {
            newErrors.name = "Tên không được để trống!";
            isValid = false;
        }
        if (!unit.trim()) {
            newErrors.unit = "Đơn vị không được để trống!";
            isValid = false;
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email.trim()) {
            newErrors.email = "Email không được để trống!";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Email không hợp lệ!";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleAdd = async () => {
        if (validateForm()) {
            const userData = {
                ten: name,
                donvi: unit,
                email: email,
                bienBanHopId: reportId,
            };

            try {
                const res = await dispatch(
                    addReport_ingredient_outside(userData)
                );
                if (res.payload.code === 1000) {
                    updateImtergay();
                    onClose();
                    notifications.show({
                        title: "Thành công",
                        message: "Đã thêm thành viên vào biên bản thành công!",
                        color: "green",
                        position: "top-right",
                    });
                    setName("");
                    setUnit("");
                    setEmail("");
                    onClose();
                }
            } catch (error) {
                console.log(error);
                setName("");
                setUnit("");
                setEmail("");
                notifications.show({
                    title: "Lỗi",
                    message: "Người dùng đã tồn tại trong biên bản họp!",
                    color: "red",
                    position: "top-right",
                });
            }
        } 
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Thêm nhanh thành viên">
            <Box mb="md">
                <TextInput
                    label="Tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên"
                    required
                    error={errors.name}
                />
            </Box>

            <Box mb="md">
                <TextInput
                    label="Đơn vị"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="Nhập đơn vị"
                    required
                    error={errors.unit}
                />
            </Box>

            <Box mb="md">
                <TextInput
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email"
                    required
                    error={errors.email}
                />
            </Box>

            <Button onClick={handleAdd} color="blue" fullWidth>
                Lưu
            </Button>
        </Modal>
    );
};

export default ModalAddUser_outside;
