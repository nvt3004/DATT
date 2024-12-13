"use client";
import {
    Modal,
    Button,
    TextInput,
    Group,
    
    Select,
    Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { fetchAdvise, updateAdvise } from "@/store/slices/advise/adviseAction";
import { useSelector } from "react-redux";
import { fetchWrranty } from "@/store/slices/warranty/warrantyAction";
import { fetchPackage, updateProduct } from "@/store/slices/product/productAction";

interface Edit_Advise_Dialog_Props {
    opened: boolean;
    onClose: () => void;
    Data?: any;
    activePage: number;
    searchValue: string | undefined;
}

export default function Edit_Advise_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: Edit_Advise_Dialog_Props) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { items, loading, error } = useSelector((state: any) => state.wrranty);

    console.log('items wrranty', items);
    
    useEffect(() => {
        const pagedata = {
            activePage: 1,
            searchValue: "100",
        };
        dispatch(fetchWrranty(pagedata));
    }, [dispatch, activePage, searchValue]);
    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            id: "",
            ten: "",
            moTa: "",
            baoHanhId: "",
        },
        validate: {
            ten: (value: string) => {
                if (!value) return "Tên Sản phẩm không được để trống";

                if (value.length >= 100) {
                    return "Số lượng không vượt quá 100 kí tự";
                }
                return null;
            },
            moTa: (value: string) => {
                if (!value) return "Mô tả không được để trống";

                if (value.length >= 250) {
                    return "Số lượng không vượt quá 250 kí tự";
                }
                return null;
            },
            baoHanhId: (value: string) => {
                if (!value) return "Mô tả không được để trống";

             
            },
        },
    });

    const handleUpdate = async (values: typeof form.values) => {
        const convertData = {
            id: values?.id,
            ten: values?.ten,
            moTa: values?.moTa,
            baoHanhId: Number(values?.baoHanhId)
            
        }
        console.log('convertData' , convertData);
        
        const res = await dispatch(updateProduct(convertData));
      
        if (res?.payload?.code === 1000) {
            notifications.show({
                title: "Chỉnh sửa thành công",
                message: "Sản phẩm đã chỉnh sửa.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        } else {
            notifications.show({
                title: "Chỉnh sửa thất bại",
                message: `Sản phẩm không được chỉnh sửa.`,
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        form.reset();
        dispatch(fetchPackage({ activePage, searchValue }));
        onClose();
    };
    useEffect(() => {
        if (Data) {
            console.log('Data.id', Data.id);
            console.log('Data.baoHanhId.toString() .id', Data.baoHanhId.toString() );
            
            form.setValues({
                id: Data.id || "",
                ten: Data.ten || "",
                moTa: Data.moTa || "",
                baoHanhId: Data.baoHanhId.toString() || "",
            });
        }
    }, [Data]);
    const selectOptionsBaoHanh = items?.content?.map((option: any) => ({
        value: option.id.toString(),
        label: option.moTa,
    }));
    return (
        <>
            <Modal
                opened={opened}
                onClose={onClose}
                title="Cập nhật sản phẩm"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                <TextInput
                        label="Sản phẩm"
                        placeholder="Nhập tên sản phẩm"
                        key={form.key("ten")}
                        {...form.getInputProps("ten")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />
                    <Textarea
                        label="Mô tả"
                        placeholder="Nhập mô tả"
                        resize="vertical"
                        key={form.key("moTa")}
                        {...form.getInputProps("moTa")}
                        style={{ marginBottom: "1rem" }}
                        minRows={4}
                        maxRows={10}
                        autosize
                    />
                    <Select
                        label="Bảo hành"
                        placeholder="Chọn bảo hành"
                        key={form.key("baoHanhId")}
                        data={selectOptionsBaoHanh}
                        {...form.getInputProps("baoHanhId")}
                        style={{ marginBottom: "1rem" }}
                        size="sm"
                    />

                    <Group mt="xl" justify="flex-end">
                        <Button type="submit" size="sm">
                            Cập nhật
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
