"use client";
import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import {
    Autocomplete,
    Title,
    Box,
    TextInput,
    Button,
    Group,
    Paper,
    Table,
    Checkbox,
    Textarea,
    MultiSelect,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { NumberInput } from "@mantine/core";
import { Select } from "@mantine/core";
import { IconAlignBoxCenterBottom, IconFileCheck } from "@tabler/icons-react";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductPackage } from "@/store/slices/product_pakage/productPackageAction";
import { addQuote } from "@/store/slices/quote/quoteAction";
import FormatDate from "@/component/Format/FormatDate";
import Link from "next/link";
import { fetchWrranty } from "@/store/slices/warranty/warrantyAction";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import Baohanh from "./baohanh/page";
import { setIdBaogia } from "@/store/slices/quote/quoteSlice";

import Engineering_Technology from "./engineeringTechnology/page";
import Category_Function from "./categoryFunction/page";
import { useAuth } from "@/hooks/useAuth";
import SanPhamMayChu from "./sanphammaychu/page";
import Add_Customer_Dialog from "./baohanh/addDialong";
import { addBaogiakhachhang } from "@/store/slices/baohanhbaogia/baohanhbaogiaAction";
import { fetchCustomer } from "@/store/slices/client/clientAction";

const arr = [
    { title: "Trang chủ", href: "/system" },
    { title: "Danh sách báo giá", href: "/system/list_quote" },
    { title: "Thêm báo giá sản phẩm", href: "/system/add_quote" },
];

export default function ThemBaoGiamoi() {
    // const router = useRouter();
    const [dialogOpened, setDialogOpened] = useState(false);

    const [loadingcompoent, setLoading] = useState(false);
    const { user } = useAuth();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [searchValue, setSearchValue] = useState<string | undefined>("100");
    // const [MessErrWarranty, setmessErrWarranty] = useState<string | undefined>(
    //     undefined
    // );
    const [continuequote1, setContinueQuote] = useState<boolean | undefined>(
        false
    );
    const { items, loading, error } = useSelector(
        (state: any) => state.productPackage
    );

    const [activePage, setPage] = useState<number | any>(1);

    // const datawarranty = useSelector((state: any) => state.warranty);
    // const [selectedElementwarranty, setSelectedElement] = useState(null);
    const dataCustomer = useSelector((state: any) => state.customer);

    useEffect(() => {
        dispatch(fetchProductPackage({ activePage, searchValue }));
        dispatch(fetchCustomer({ activePage, searchValue }));
    }, [dispatch, activePage, searchValue]);

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        validate: {
            tieuDe: isNotEmpty("Tiêu đề không được để trống"),
            hieuluc: isNotEmpty("Ngày hiệu lực không được để trống"),
            sanpham: isNotEmpty("Gói sản phẩm không được để trống"),
            mocThoiGian: isNotEmpty("Thời gian không được để trống"),
            thoiGian: isNotEmpty("Loại thời gian không được để trống"),
            khachHang: isNotEmpty("Khách hàng không được để trống"),
        },
    });

    const handleSubmit = async (values: typeof form.values | any) => {
        const converData: any = {
            mocThoiGian: values.mocThoiGian,
            ngayHieuLuc: FormatDate(values.hieuluc),
            tieuDe: values.tieuDe,
            moTa: values?.moTa,
            nguoiDungId: 1, // chưa match khi user login với hệ thống CUCS nên để mặc định
            goiSanPhamId: Number(values.sanpham),
            thoiGianId: Number(values.thoiGian),
        };

        const res = await dispatch(addQuote(converData));
        if (res.payload.code === 1000) {
            // setContinueQuote(true);
            dispatch(setIdBaogia(res.payload.result.id));
            const converDataBaogiakhachhang: any = {
                baoGiaId: res.payload.result.id,
                khachHang: Array.isArray(values?.khachHang)
                    ? values?.khachHang.map(Number)
                    : [],
            };
            const resBaogiakhachhang = await dispatch(
                addBaogiakhachhang(converDataBaogiakhachhang)
            );
            if (resBaogiakhachhang.payload.code === 1000) {
                setContinueQuote(true);
            }
        } else {
            notifications.show({
                title: "Thêm thất bại",
                message: `${res.payload.response.data.message}`,
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
    };
    // goi san pham
    const selectOptions = items?.content?.map((option: any) => ({
        value: option.id.toString(),
        label: option.ten,
    }));

    useEffect(() => {
        dispatch(fetchWrranty({ activePage, searchValue }));
    }, [dispatch, activePage, searchValue]);
    const selectOptionsCustomer = dataCustomer?.items?.content?.map(
        (option: any) => ({
            value: option.id.toString(),
            label: option.ten,
        })
    );
    return (
        <>
            <FullScreenLoader visible={loadingcompoent} />
            <Paper style={{ maxWidth: "100%" }}>
                <Box className="my-3">
                    <Breadcrumbst ArrBreadcrumb={arr} />
                </Box>
                <Box className="py-3 px-3 bg-[#339af0] text-white rounded-md my-3 ">
                    <Title order={2}>Thêm báo giá sản phẩm</Title>
                </Box>
                <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3 ">
                    <p>Thông tin chung </p>
                </Box>
                <div className=" bg-[#eceef0] p-4 rounded mb-3 ">
                    <TextInput
                        label="Tiêu đề báo giá"
                        placeholder="Nhập Tiêu đề cần báo giá "
                        key={form.key("tieuDe")}
                        {...form.getInputProps("tieuDe")}
                        withAsterisk
                        className="mr-4"
                        disabled={continuequote1}
                    />
                    <div className="flex md:flex-nowrap flex-wrap">
                        <Select
                            label="Gói sản phẩm"
                            withAsterisk
                            placeholder="Tùy chọn"
                            data={selectOptions}
                            key={form.key("sanpham")}
                            {...form.getInputProps("sanpham")}
                            style={{ width: "100%" }}
                            className="mr-4"
                            disabled={continuequote1}
                        />
                    </div>
                    <div className=" flex md:flex-nowrap flex-wrap">
                        <DateTimePicker
                            withAsterisk
                            label="Ngày hiệu lực"
                            placeholder="Tháng/ngày/năm"
                            className="mr-4"
                            style={{ width: "100%" }}
                            key={form.key("hieuluc")}
                            {...form.getInputProps("hieuluc")}
                            disabled={continuequote1}
                        />
                        <NumberInput
                            label="Thời gian hiệu lực"
                            withAsterisk
                            placeholder="ví dụ: 90"
                            key={form.key("mocThoiGian")}
                            {...form.getInputProps("mocThoiGian")}
                            className="mr-4 w-[100%] md:w-[20%]"
                            disabled={continuequote1}
                        />
                        <Select
                            label=" "
                            placeholder="Tùy chọn"
                            data={[
                                { value: "1", label: "ngày" },
                                { value: "2", label: "tháng" },
                                { value: "3", label: "năm" },
                            ]}
                            key={form.key("thoiGian")}
                            {...form.getInputProps("thoiGian")}
                            className="mr-4 w-[100%] md:w-[20%]"
                            disabled={continuequote1}
                        />
                    </div>
                    <div>
                        <MultiSelect
                            label="Nhập Tên khách hàng"
                            withAsterisk
                            placeholder="Chọn khách hàng"
                            data={selectOptionsCustomer || []}
                            key={form.key("khachHang")}
                            {...form.getInputProps("khachHang")}
                            searchable
                            clearable
                            disabled={continuequote1}
                        />
                        {continuequote1 ? null : (
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
                        )}
                        <Add_Customer_Dialog
                            opened={dialogOpened}
                            onClose={() => setDialogOpened(false)}
                        />
                    </div>
                    <div>
                        <Textarea
                            resize="vertical"
                            label="Mô tả"
                            placeholder="Nhập mô tả báo giá"
                            key={form.key("moTa")}
                            {...form.getInputProps("moTa")}
                            disabled={continuequote1}
                            minRows={4}
                            maxRows={100}
                            autosize
                        />
                    </div>
                </div>
                {continuequote1 ? (
                    <Baohanh />
                ) : (
                    <>
                        <Box className="mb-3 flex justify-end">
                            <form onSubmit={form.onSubmit(handleSubmit)}>
                                <Group justify="center" className="mt-6">
                                    <Link href="/system/list_quote">
                                        <Button variant="filled" color="gray">
                                            Hủy bỏ
                                        </Button>
                                    </Link>
                                    <Button variant="filled" type="submit">
                                        <IconFileCheck stroke={2} />
                                        Thêm báo giá
                                    </Button>
                                </Group>
                            </form>
                        </Box>
                    </>
                )}
            </Paper>
            {/* <SanPhamMayChu/> */}
            {/* <Engineering_Technology/> */}
        </>
    );
}
