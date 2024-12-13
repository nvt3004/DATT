import { Modal, TextInput, Button, Group, Select, Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchAll_User } from "@/store/slices/user/userAction";
import FormatDate from "@/component/Format/FormatDate";
import { updateReport } from "@/store/slices/report/repostAction";
import { notifications } from "@mantine/notifications";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

interface EditModalProps {
    opened: boolean;
    onClose: () => void;
    reportData: any;
    handleUpdateList: () => void;
}

function EditModal({ opened, onClose, reportData, handleUpdateList }: EditModalProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { items: users } = useSelector((state: any) => state.user);

    const parseDate = (dateString?: string) => {
        if (!dateString) return new Date();
        const [datePart, timePart] = dateString.split(" ");
        const [day, month, year] = datePart.split("/").map(Number);
        const [hours, minutes] = timePart.split(":").map(Number);
        return new Date(year, month - 1, day, hours, minutes);
    };

    const [ten, setTen] = useState(reportData?.ten || "");
    const [diadiem, setDiadiem] = useState(reportData?.diadiem || "");
    const [giobatdau, setGiobatdau] = useState<Date>(parseDate(reportData?.giobatdau));
    const [gioketthuc, setGioketthuc] = useState<Date>(parseDate(reportData?.gioketthuc));
    const [mota, setMota] = useState(reportData?.mota || "");
    const [nguoiDungId, setNguoiDungId] = useState(reportData?.nguoiDung?.id || "");
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchAll_User());
    }, [dispatch]);

    useEffect(() => {
        if (reportData) {
            setTen(reportData.ten || "");
            setDiadiem(reportData.diadiem || "");
            setGiobatdau(parseDate(reportData.giobatdau));
            setGioketthuc(parseDate(reportData.gioketthuc));
            setMota(reportData.mota || "");
            if (reportData?.nguoiDung?.ten && users?.length > 0) {
                const foundUser = users.find(
                    (user: any) => user.ten === reportData.nguoiDung.ten
                );
                if (foundUser) {
                    setNguoiDungId(foundUser.id.toString());
                }
            }
        }
    }, [reportData, users]);

    const validate = () => {
        const newErrors: any = {};
        if (!ten) newErrors.ten = "Tên biên bản là bắt buộc.";
        if (!diadiem) newErrors.diadiem = "Địa điểm là bắt buộc.";
        if (!giobatdau) newErrors.giobatdau = "Giờ bắt đầu là bắt buộc.";
        if (!gioketthuc) newErrors.gioketthuc = "Giờ kết thúc là bắt buộc.";
        if (!nguoiDungId) newErrors.nguoiDungId = "Người tạo là bắt buộc.";
        if (!mota) newErrors.mota = "Mô tả là bắt buộc.";
        if (mota.length > 255) newErrors.mota = "Mô tả không được vượt quá 255 ký tự.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        const updatedFormData = {
            ten,
            diadiem,
            giobatdau: FormatDate(giobatdau),
            gioketthuc: FormatDate(gioketthuc),
            mota,
            nguoiDungId: Number(nguoiDungId),
        };

        console.log("updatedFormData", updatedFormData);

        setLoading(true);
        try {
            await dispatch(updateReport({ id: reportData.id, data: updatedFormData })).unwrap();
            handleUpdateList();
            setLoading(false);
            notifications.show({
                title: "Thành công",
                message: "Dữ liệu đã được cập nhật thành công!",
                color: "green",
                position: "top-right",
            });
            onClose();
        } catch (error) {
            setLoading(false);
            notifications.show({
                title: "Thất bại",
                message: "Cập nhật dữ liệu thất bại. Vui lòng thử lại!",
                color: "red",
                position: "top-right",
            });
        }
    };

    return (
        <>
            <FullScreenLoader visible={loading} />
            <Modal opened={opened} onClose={onClose} title="Cập nhật biên bản" size="lg">
                <Select
                    label="Người tạo"
                    placeholder="Chọn người tạo"
                    value={nguoiDungId}
                    onChange={setNguoiDungId}
                    data={users?.map((user: any) => ({
                        value: user.id.toString(),
                        label: user.ten,
                    })) || []}
                    error={errors.nguoiDungId}
                    searchable
                />
                <TextInput
                    label="Tên biên bản"
                    value={ten}
                    onChange={(e) => {
                        const value = e.target.value;
                        setTen(value);
                        setErrors((prevErrors: any) => {
                            const newErrors = { ...prevErrors };
                            if (!value) newErrors.ten = "Tên biên bản là bắt buộc!";
                            else delete newErrors.ten;
                            return newErrors;
                        });
                    }}
                    error={errors.ten}
                />

                <DateTimePicker
                    label="Giờ bắt đầu"
                    value={giobatdau}
                    onChange={(value) => {
                        setGiobatdau(value as Date);
                        setErrors((prevErrors: any) => {
                            const newErrors = { ...prevErrors };
                            if (!value) newErrors.giobatdau = "Giờ bắt đầu là bắt buộc!";
                            else delete newErrors.giobatdau;
                            return newErrors;
                        });
                    }}
                    error={errors.giobatdau}
                />

                <DateTimePicker
                    label="Giờ kết thúc"
                    value={gioketthuc}
                    onChange={(value) => {
                        setGioketthuc(value as Date);
                        setErrors((prevErrors: any) => {
                            const newErrors = { ...prevErrors };
                            if (!value) newErrors.gioketthuc = "Giờ kết thúc là bắt buộc!";
                            else delete newErrors.gioketthuc;
                            return newErrors;
                        });
                    }}
                    error={errors.gioketthuc}
                />

                <Textarea
                    label="Địa điểm"
                    value={diadiem}
                    onChange={(e) => {
                        const value = e.target.value;
                        setDiadiem(value);
                        setErrors((prevErrors: any) => {
                            const newErrors = { ...prevErrors };
                            if (!value) newErrors.diadiem = "Địa điểm là bắt buộc!";
                            else delete newErrors.diadiem;
                            return newErrors;
                        });
                    }}
                    error={errors.diadiem}
                    autosize
                    minRows={4}
                    maxRows={10}
                />

                <Textarea
                    label="Mô tả"
                    value={mota}
                    onChange={(e) => {
                        const value = e.target.value;
                        setMota(value);
                        setErrors((prevErrors: any) => {
                            const newErrors = { ...prevErrors };
                            if (!value) newErrors.mota = "Mô tả là bắt buộc!";
                            else if (value.length > 255) newErrors.mota = "Mô tả không được vượt quá 255 ký tự!";
                            else delete newErrors.mota;
                            return newErrors;
                        });
                    }}
                    error={errors.mota}
                    autosize
                    minRows={4}
                    maxRows={10}
                />

                <Group mt="md">
                    <Button color="blue" onClick={handleSave} ml="auto">
                        Lưu
                    </Button>
                </Group>
            </Modal>
        </>
    );
}

export default EditModal;
