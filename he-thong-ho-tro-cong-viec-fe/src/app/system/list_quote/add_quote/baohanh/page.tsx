"use client";
import { fetchCustomer } from "@/store/slices/client/clientAction";
import { fetchPackage } from "@/store/slices/product/productAction";
import {
    Box,
    Button,
    Group,
    MultiSelect,
    NumberInput,
    Select,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Add_Customer_Dialog from "./addDialong";
import {
    selectQuoteIdBaogia,
    setIdBaoHanhBaoGia,
    setIdSanpham,
} from "@/store/slices/quote/quoteSlice";
import {
    addBaogiakhachhang,
    addBaohanhbaogia,
} from "@/store/slices/baohanhbaogia/baohanhbaogiaAction";
import { notifications } from "@mantine/notifications";
import { IconFileCheck } from "@tabler/icons-react";
import TuVanBaoGia from "../tuvanbaogia/page";
import { useRouter } from "next/navigation";
import { deleteQuote } from "@/store/slices/quote/quoteAction";

function Baohanh() {
    const router = useRouter();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { items, loading, error } = useSelector(
        (state: any) => state.product
    );
    const IdBaogia = useSelector(selectQuoteIdBaogia);
    const [continuequote2, setContinueQuote] = useState<boolean | undefined>(
        false
    );
    const [dialogOpened, setDialogOpened] = useState(false);
    const [selectedSanpham, setSelectedSanpham] = useState<any | null>(null);

    const [messErrorSanPham, setMessErrorSanPham] = useState<string>("");

    const dataCustomer = useSelector((state: any) => state.customer);
    useEffect(() => {
        const activePage = 1;
        const searchValue = "100";
        dispatch(fetchPackage({ activePage, searchValue }));
        dispatch(fetchCustomer({ activePage, searchValue }));
    }, [dispatch]);
    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        validate: {
            thoiGianBaoHanh: isNotEmpty(
                "Thời gian bảo hành không được để trống"
            ),
            thoiGianId: isNotEmpty("Loại thời gian không được để trống"),
            // khachHang: isNotEmpty("Khách hành không được để trống"),
        },
    });

    const selectOptionsBaoHanhId2 = (value: string | null) => {
        const dataSanpham = items?.content?.find(
            (item: any) => item.id.toString() === value
        );
        setSelectedSanpham(dataSanpham);
    };

    const selectOptionsCustomer = dataCustomer?.items?.content?.map(
        (option: any) => ({
            value: option.id.toString(),
            label: option.ten,
        })
    );

    const handleSubmit = async (values: typeof form.values | any) => {
        if (selectedSanpham) {
            setMessErrorSanPham("");
            const converDataBaohanhbaogia: any = {
                thoiGianBaoHanh: Number(values?.thoiGianBaoHanh),
                baoHanhId: Number(selectedSanpham?.baoHanh?.id),
                baoGiaId: IdBaogia,
                thoiGianId: Number(values?.thoiGianId),
            };
            // const converDataBaogiakhachhang: any = {
            //     baoGiaId: IdBaogia,
            //     khachHang: Array.isArray(values?.khachHang)
            //         ? values?.khachHang.map(Number)
            //         : [],
            // };

            dispatch(setIdSanpham(selectedSanpham?.id));
            // const resBaogiakhachhang = await dispatch(
            //     addBaogiakhachhang(converDataBaogiakhachhang)
            // );
            const resBaohanhbaogia = await dispatch(
                addBaohanhbaogia(converDataBaohanhbaogia)
            );
            if (resBaohanhbaogia.payload.code === 1000) {
                dispatch(
                    setIdBaoHanhBaoGia(resBaohanhbaogia.payload.result.id)
                );

                setContinueQuote(true);
            } else {
                notifications.show({
                    title: "Thêm thất bại",
                    message: `${resBaohanhbaogia.payload.response.data.message}`,
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } else {
            setMessErrorSanPham("Sản phẩm không được để trống");
        }
    };
    const submitDeleteQuote = async () => {
        try {
            await dispatch(deleteQuote(IdBaogia));
            router.push("/system/list_quote");
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };
    return (
        <>
            <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3 ">
                <p>Bảo hành </p>
            </Box>
            <div className=" bg-[#eceef0] p-4 rounded mb-3 ">
                <Select
                    disabled={continuequote2}
                    label="Sản phẩm"
                    withAsterisk
                    placeholder="Tùy chọn"
                    onChange={selectOptionsBaoHanhId2}
                    data={
                        items?.content?.map((data: any) => ({
                            value: data.id.toString(),
                            label: data.ten,
                        })) || []
                    }
                    style={{ width: "100%" }}
                    className="mr-4"
                    styles={{
                        input: {
                            borderColor: messErrorSanPham ? "red" : undefined,
                            "&:focus": {
                                borderColor: messErrorSanPham
                                    ? "red"
                                    : undefined,
                            },
                        },
                    }}
                />
                {messErrorSanPham && (
                    <p className="text-red-500">{messErrorSanPham}</p>
                )}
                <div className=" flex md:flex-nowrap flex-wrap">
                    <NumberInput
                        label="Thời gian bảo hành"
                        withAsterisk
                        placeholder="ví dụ: 90"
                        key={form.key("thoiGianBaoHanh")}
                        {...form.getInputProps("thoiGianBaoHanh")}
                        className="mr-4 w-[100%] md:w-[20%]"
                        disabled={continuequote2}
                    />
                    <Select
                        label=" "
                        placeholder="Tùy chọn"
                        data={[
                            { value: "1", label: "ngày" },
                            { value: "2", label: "tháng" },
                            { value: "3", label: "năm" },
                        ]}
                        key={form.key("thoiGianId")}
                        {...form.getInputProps("thoiGianId")}
                        className="mr-4 w-[100%] md:w-[20%]"
                        disabled={continuequote2}
                    />
                </div>
                {/* <MultiSelect
                    label="Nhập Tên khách hành"
                    withAsterisk
                    placeholder="Chọn khách hành"
                    data={selectOptionsCustomer || []}
                    key={form.key("khachHang")}
                    {...form.getInputProps("khachHang")}
                    searchable
                    clearable
                    disabled={continuequote2}
                />
                <Add_Customer_Dialog
                    opened={dialogOpened}
                    onClose={() => setDialogOpened(false)}
                /> */}
                {/* {continuequote2 ? null : (
                    <>
                        <Button
                            className="mt-2"
                            onClick={() => setDialogOpened(true)}
                            variant="filled"
                            type="submit"
                        >
                            Thêm khách hàng
                        </Button>
                    </>
                )} */}
            </div>
            {continuequote2 ? (
                <TuVanBaoGia />
            ) : (
                <>
                    <Box className="mb-3 flex justify-end">
                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            <Group justify="center" className="mt-6">
                                <Button
                                    variant="filled"
                                    color="gray"
                                    onClick={submitDeleteQuote}
                                >
                                    Hủy bỏ
                                </Button>

                                <Button variant="filled" type="submit">
                                    <IconFileCheck stroke={2} />
                                    Tiếp tục báo giá
                                </Button>
                            </Group>
                        </form>
                    </Box>
                </>
            )}
        </>
    );
}

export default Baohanh;
