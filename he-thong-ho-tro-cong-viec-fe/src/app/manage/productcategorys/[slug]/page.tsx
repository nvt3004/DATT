"use client";

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import {
    deleteHangmuc,
    fetchHangmuc,
} from "@/store/slices/hangmuc/hangmucAction";
import {
    editproductCategorys,
    fetchproductCategorysDetail,
} from "@/store/slices/productcategorys/productcategorysAction";
import {
    ActionIcon,
    Box,
    Button,
    Card,
    Group,
    Input,
    MultiSelect,
    Select,
    Table,
    Title,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
    IconArrowDown,
    IconArrowUp,
    IconEdit,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useRouter } from "next/navigation";
import {
    deleteackage,
    fetchPackage,
} from "@/store/slices/product/productAction";
import Add_Hangmuc_Dialog from "../../categorys/addDialong";
import Add_Product_Dialog from "../../products/addDialong";
import Edit_Advise_Dialog from "../../products/editDialong";
import { formatPrice } from "@/component/Format/FormatProce";
import Edit_Agent_Dialog from "../../categorys/editDialong";
import {
    deleteNhom_chucnang,
    fetchNhom_chucnang,
} from "@/store/slices/nhom_chucnang/nhom_chucnangAction";
import Add_Nhomchucnang_Dialog from "../../functional_group/addDialong";
import Edit_Nhomchucnang_Dialog from "../../functional_group/editDialong";
import {
    deleteChucnang,
    fetchChucnang,
} from "@/store/slices/chucnang/chucnangAction";
import Add_Chucnang_Dialog from "../../function/addDialong";
import Edit_Chucnang_Dialog from "../../function/editDialong";

const arr = [
    { title: "Trang chủ", href: "/manage" },
    { title: "Quản lý", href: "/manage" },
    { title: "Sản phẩm hạng mục", href: "/manage/productcategorys" },
    {
        title: "Chỉnh sửa Sản phẩm hạng mục",
        href: "",
    },
];
function Editproductcategorys({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const [dialogOpenedSanPham, setDialogOpenedSanPham] = useState(false);
    const [dialogOpenedSanPhamCapNhat, setDialogOpenedSanPhamCapNhat] =
        useState(false);
    const [dialogOpenedHangMuc, setDialogOpenedHangMuc] = useState(false);
    const [dialogOpenedHangMucCapNhat, setDialogOpenedHangMucCapNhat] =
        useState(false);
    const [dialogOpenedNhomChucNang, setDialogOpenedNhomChucNang] =
        useState(false);
    const [
        dialogOpenedNhomChucNangCapNhat,
        setDialogOpenedNhomChucNangCapNhat,
    ] = useState(false);
    const [dialogOpenedChucNang, setDialogOpenedChucNang] = useState(false);
    const [dialogOpenedChucNangCapNhat, setDialogOpenedChucNangCapNhat] =
        useState(false);

    const [activeValueSanPham, setActiveValueSanPham] =
        useState<any>(undefined);
    const [activeValueHangMuc, setActiveValueHangMuc] =
        useState<any>(undefined);
    const [activeValueNhomChucNang, setActiveValueNhomChucNang] =
        useState<any>(undefined);
    const [activeValueChucNang, setActiveValueChucNang] =
        useState<any>(undefined);
    const [isVisibleSanPham, setIsVisibleSanPham] = useState(false);
    const [isVisibleHangMuc, setIsVisibleHangMuc] = useState(false);
    const [isVisibleNhomChucNang, setIsVisibleNhomChucNang] = useState(false);
    const [isVisibleChucNang, setIsVisibleChucNang] = useState(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { items, loading, error } = useSelector(
        (state: any) => state.product
    );
    const productcategorys = useSelector(
        (state: any) => state.productcategorys
    );

    const NhomChucNang = useSelector((state: any) => state.nhomchucnang);
    const Hangmuc = useSelector((state: any) => state.hangmuc);
    const ChucNang = useSelector((state: any) => state.chucnang);
    const [activePage, setActivePage] = useState(1);
    const [searchValue, setSearchValue] = useState("100");
    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        validate: {
            sanPhamId: isNotEmpty("Sản phẩm không được để trống"),
            hangMucId: isNotEmpty("Hạng mục không được để trống"),
        },
    });
    const handleSubmit = async (values: typeof form.values | any) => {
        try {
            const converData = {
                id: Number(params.slug),
                hangMucId: Number(values?.hangMucId),
                sanPhamId: Number(values?.sanPhamId),
            };
            const res = await dispatch(editproductCategorys(converData));

            if (res.payload.code === 1000) {
                form.reset();
                notifications.show({
                    title: "Thêm thành công",
                    message: "Sản phẩm hạng mục đã được thêm.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                router.push("/manage/productcategorys");
            } else {
                notifications.show({
                    title: "Thêm thất bại",
                    message: "Sản phẩm hạng mục chưa được thêm.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Lỗi khi gọi API. Vui lòng thử lại.");
        }
    };

    const selectOptionsProducts = items?.content?.map((option: any) => ({
        value: option.id.toString(),
        label: option.ten,
    }));
    const selectOptionsHangMuc = Hangmuc?.items?.result?.content?.map(
        (option: any) => ({
            value: option.id.toString(),
            label: option.ten,
        })
    );
    useEffect(() => {
        dispatch(fetchHangmuc({ activePage, searchValue }));
        dispatch(fetchPackage({ activePage, searchValue }));
        dispatch(fetchNhom_chucnang({ activePage, searchValue }));
        dispatch(fetchChucnang({ activePage, searchValue }));
    }, [dispatch, activePage, searchValue]);
    useEffect(() => {
        const id = params.slug;

        dispatch(fetchproductCategorysDetail(id));
    }, [dispatch, activePage, searchValue]);
    useEffect(() => {
        if (productcategorys) {
    
            form.setValues({
                sanPhamId: productcategorys?.items?.result?.sanPham?.id.toString() || "",
                hangMucId: productcategorys?.items?.result?.hangMuc?.id.toString() || "",
            });
        }
    }, [productcategorys]);
    
    useEffect(() => {
        if (
            selectOptionsHangMuc?.length > 0 &&
            !selectOptionsHangMuc.find((option : any)  => option.value === form.values.hangMucId)
        ) {
            form.setFieldValue("hangMucId",  productcategorys?.items?.result?.hangMuc?.id.toString());
        }
    }, [selectOptionsHangMuc]);

    const handlerDeleteSanPham = async (id: string) => {
        try {
            await dispatch(deleteackage(id));
            dispatch(fetchPackage({ activePage, searchValue }));
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };
    const handlerDeleteHangMuc = async (id: string) => {
        try {
            await dispatch(deleteHangmuc(id));
            await dispatch(fetchHangmuc({ activePage, searchValue }));
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };
    const handlerDeleteNhomChucNang = async (id: string) => {
        try {
            await dispatch(deleteNhom_chucnang(id));
            await dispatch(fetchNhom_chucnang({ activePage, searchValue }));
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };

    const listTHangMuc = Hangmuc?.items?.result?.content?.map(
        (item: string | any, index: number) => (
            <Table.Tr key={index}>
                <Table.Td>
                    <Box>{item?.ten}</Box>
                </Table.Td>
                <Table.Td>{formatPrice(item?.gia)}</Table.Td>
                <Table.Td>{item?.soLuong}</Table.Td>
                <Table.Td>{item?.donViTinh?.ten}</Table.Td>
                <Table.Td>{item?.moTa}</Table.Td>
                <Table.Td    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <ActionIcon
                        color="blue"
                        onClick={() => {
                            setDialogOpenedHangMucCapNhat(true);

                            setActiveValueHangMuc({
                                id: item.id,
                                ten: item.ten,
                                gia: item.gia,
                                soLuong: item.soLuong,
                                moTa: item.moTa,
                                donViTinh: item.donViTinh.id,
                            });
                        }}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconEdit size={20} />
                    </ActionIcon>{" "}
                    <ActionIcon
                        color="red"
                        onClick={() => handlerDeleteHangMuc(item?.id)}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconTrash size={20} />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>
        )
    );
    const listNhomNang = NhomChucNang?.items?.result?.content?.map(
        (item: string | any, index: number) => (
            <Table.Tr key={index}>
                <Table.Td>
                    <Box>{item?.ten}</Box>
                </Table.Td>

                <Table.Td>{item?.hangMuc?.ten}</Table.Td>
                <Table.Td>{item?.moTa}</Table.Td>
                <Table.Td    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <ActionIcon
                        color="blue"
                        onClick={() => {
                            setDialogOpenedNhomChucNangCapNhat(true);
                            setActiveValueNhomChucNang({
                                id: item.id,
                                ten: item.ten,
                                moTa: item.moTa,
                                hangMuc: item.hangMuc?.id,
                            });
                        }}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconEdit size={20} />
                    </ActionIcon>{" "}
                    <ActionIcon
                        color="red"
                        onClick={() => handlerDeleteNhomChucNang(item?.id)}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconTrash size={20} />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>
        )
    );
    const listChucNang = ChucNang?.items?.result?.content?.map(
        (item: string | any, index: number) => (
            <Table.Tr key={index}>
                <Table.Td>
                    <Box>{item?.ten}</Box>
                </Table.Td>

                <Table.Td>{item?.nhomChucNang?.ten}</Table.Td>
                <Table.Td> {formatPrice(item?.gia)}</Table.Td>
                <Table.Td    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <ActionIcon
                        color="blue"
                        onClick={() => {
                            setDialogOpenedChucNangCapNhat(true);
                            setActiveValueChucNang({
                                id: item.id,
                                ten: item.ten,
                                moTa: item.moTa,
                                gia: item.gia,
                                nhomChucNang: item.nhomChucNang.id,
                            });
                        }}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconEdit size={20} />
                    </ActionIcon>{" "}
                    <ActionIcon
                        color="red"
                        onClick={() => handlerDeleteChucNang(item?.id)}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconTrash size={20} />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>
        )
    );
    const listTproducts = items?.content?.map(
        (item: string | any, index: number) => (
            <Table.Tr key={index}>
                <Table.Td>
                    <Box>{item?.ten}</Box>
                </Table.Td>
                <Table.Td>{item?.baoHanh?.moTa}</Table.Td>
                <Table.Td>{item?.moTa}</Table.Td>
                <Table.Td    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <ActionIcon
                        color="blue"
                        onClick={() => {
                            setDialogOpenedSanPhamCapNhat(true);
                            setActiveValueSanPham({
                                id: item.id,
                                ten: item?.ten,
                                moTa: item?.moTa,
                                baoHanhId: item?.baoHanh?.id,
                                BaoHanhMoTa: item?.baoHanh?.moTa,
                            });
                        }}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconEdit size={20} />
                    </ActionIcon>{" "}
                    <ActionIcon
                        color="red"
                        onClick={() => handlerDeleteSanPham(item?.id)}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconTrash size={20} />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>
        )
    );
    const handlerDeleteChucNang = async (id: string) => {
        try {
            await dispatch(deleteChucnang(id));
            await dispatch(fetchChucnang({ activePage, searchValue }));
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };
    return (
        <>
            <Box style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <Group
                    mb="md"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Breadcrumbst ArrBreadcrumb={arr} />
                </Group>
                <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3">
                    <Input.Label size="17">
                        Chỉnh sửa Sản phẩm hạng mục{" "}
                    </Input.Label>
                </Box>

                <Card
                    withBorder
                    shadow="md"
                    style={{ borderRadius: "12px", overflow: "hidden" }}
                >
                    <div className=" bg-[#eceef0] p-4 rounded mb-3 ">
                        <Box className="mb-2">
                            <Title order={3}>
                                Sản phẩm{" "}
                                <ActionIcon
                                    variant="filled"
                                    aria-label="Settings"
                                    onClick={() =>
                                        setIsVisibleSanPham((prev) => !prev)
                                    }
                                >
                                    {isVisibleSanPham ? (
                                        <IconArrowUp
                                            stroke={2}
                                            style={{
                                                width: "70%",
                                                height: "70%",
                                            }}
                                        />
                                    ) : (
                                        <IconArrowDown
                                            stroke={2}
                                            style={{
                                                width: "70%",
                                                height: "70%",
                                            }}
                                        />
                                    )}
                                </ActionIcon>
                            </Title>
                            {isVisibleSanPham ? (
                                <>
                                    <Table
                                        striped
                                        highlightOnHover
                                        withTableBorder
                                        withColumnBorders
                                    >
                                        <Table.Thead className="bg-[#339af0] text-white mt-3 ">
                                            <Table.Tr>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Sản phẩm
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Bảo hành
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Mô tả
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Thao tác
                                                </Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {listTproducts}
                                        </Table.Tbody>
                                    </Table>{" "}
                                </>
                            ) : null}
                        </Box>
                        <Box className="mb-2">
                            <Title order={3}>
                                Hạng Mục {"  "}
                                <ActionIcon
                                    variant="filled"
                                    aria-label="Settings"
                                    onClick={() =>
                                        setIsVisibleHangMuc((prev) => !prev)
                                    }
                                >
                                    {isVisibleHangMuc ? (
                                        <IconArrowUp
                                            stroke={2}
                                            style={{
                                                width: "70%",
                                                height: "70%",
                                            }}
                                        />
                                    ) : (
                                        <IconArrowDown
                                            stroke={2}
                                            style={{
                                                width: "70%",
                                                height: "70%",
                                            }}
                                        />
                                    )}
                                </ActionIcon>
                            </Title>
                            {isVisibleHangMuc ? (
                                <>
                                    <Table
                                        striped
                                        highlightOnHover
                                        withTableBorder
                                        withColumnBorders
                                    >
                                        <Table.Thead className="bg-[#339af0] text-white mt-3 ">
                                            <Table.Tr>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Hạng mục
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Giá
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Số lượng
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Đơn vị tính
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Mô tả
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Thao tác
                                                </Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {listTHangMuc}
                                        </Table.Tbody>
                                    </Table>
                                </>
                            ) : null}
                        </Box>
                        <Box className="mb-2">
                            <Title order={3}>
                                Nhóm chức năng{" "}
                                <ActionIcon
                                    variant="filled"
                                    aria-label="Settings"
                                    onClick={() =>
                                        setIsVisibleNhomChucNang(
                                            (prev) => !prev
                                        )
                                    }
                                >
                                    {isVisibleNhomChucNang ? (
                                        <IconArrowUp
                                            stroke={2}
                                            style={{
                                                width: "70%",
                                                height: "70%",
                                            }}
                                        />
                                    ) : (
                                        <IconArrowDown
                                            stroke={2}
                                            style={{
                                                width: "70%",
                                                height: "70%",
                                            }}
                                        />
                                    )}
                                </ActionIcon>
                            </Title>
                            {isVisibleNhomChucNang ? (
                                <>
                                    <Table
                                        striped
                                        highlightOnHover
                                        withTableBorder
                                        withColumnBorders
                                    >
                                        <Table.Thead className="bg-[#339af0] text-white mt-3 ">
                                            <Table.Tr>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Nhóm chức năng
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Hạng mục
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Mô tả
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Thao tác
                                                </Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {listNhomNang}
                                        </Table.Tbody>
                                    </Table>{" "}
                                </>
                            ) : null}
                        </Box>
                        <Box className="mb-2">
                            <Title order={3}>
                                Chức năng{" "}
                                <ActionIcon
                                    variant="filled"
                                    aria-label="Settings"
                                    onClick={() =>
                                        setIsVisibleChucNang((prev) => !prev)
                                    }
                                >
                                    {isVisibleChucNang ? (
                                        <IconArrowUp
                                            stroke={2}
                                            style={{
                                                width: "70%",
                                                height: "70%",
                                            }}
                                        />
                                    ) : (
                                        <IconArrowDown
                                            stroke={2}
                                            style={{
                                                width: "70%",
                                                height: "70%",
                                            }}
                                        />
                                    )}
                                </ActionIcon>
                            </Title>
                            {isVisibleChucNang ? (
                                <Table
                                    striped
                                    highlightOnHover
                                    withTableBorder
                                    withColumnBorders
                                >
                                    <Table.Thead className="bg-[#339af0] text-white mt-3 ">
                                        <Table.Tr>
                                            <Table.Th
                                                style={{ textAlign: "center" }}
                                            >
                                                Chức năng
                                            </Table.Th>
                                            <Table.Th
                                                style={{ textAlign: "center" }}
                                            >
                                                Nhóm chức năng
                                            </Table.Th>
                                            <Table.Th
                                                style={{ textAlign: "center" }}
                                            >
                                                Giá
                                            </Table.Th>

                                            <Table.Th
                                                style={{ textAlign: "center" }}
                                            >
                                                Thao tác
                                            </Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>{listChucNang}</Table.Tbody>
                                </Table>
                            ) : null}
                        </Box>
                        <Button
                            rightSection={<IconPlus size={16} />}
                            onClick={() => setDialogOpenedSanPham(true)}
                            className="mt-2 mr-2"
                        >
                            Thêm sản phẩm
                        </Button>
                        <Button
                            rightSection={<IconPlus size={16} />}
                            onClick={() => setDialogOpenedHangMuc(true)}
                            className="mt-2 mr-2"
                        >
                            Thêm hạng mục
                        </Button>
                        <Button
                            rightSection={<IconPlus size={16} />}
                            onClick={() => setDialogOpenedNhomChucNang(true)}
                            className="mt-2 mr-2"
                        >
                            Thêm nhóm chức năng
                        </Button>
                        <Button
                            rightSection={<IconPlus size={16} />}
                            onClick={() => setDialogOpenedChucNang(true)}
                            className="mt-2 mr-2"
                        >
                            Thêm chức năng
                        </Button>
                        <Select
                            label="Sản phẩm"
                            withAsterisk
                            placeholder="Chọn sản phẩm"
                            data={selectOptionsProducts}
                            key={form.key("sanPhamId")}
                            {...form.getInputProps("sanPhamId")}
                            style={{ width: "100%" }}
                            className="mr-4"
                        />
                        <Select
                            label="Hạng mục"
                            withAsterisk
                            placeholder="Chọn hạng mục"
                            data={selectOptionsHangMuc}
                            key={form.key("hangMucId")}
                            {...form.getInputProps("hangMucId")}
                            style={{ width: "100%" }}
                            className="mr-4"
                        />
                    </div>

                    <Box className="mb-3 flex justify-end">
                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            <Group justify="center" className="mt-6">
                                <Link href="/manage/productcategorys">
                                    <Button variant="filled" color="gray">
                                        Hủy bỏ
                                    </Button>
                                </Link>
                                <Button variant="filled" type="submit">
                                    Chỉnh sửa sản phẩm hạng mục
                                </Button>
                            </Group>
                        </form>
                    </Box>
                </Card>
            </Box>
            <Add_Product_Dialog
                opened={dialogOpenedSanPham}
                onClose={() => setDialogOpenedSanPham(false)}
                activePage={activePage}
                searchValue={searchValue}
            />
            <Edit_Advise_Dialog
                opened={dialogOpenedSanPhamCapNhat}
                onClose={() => setDialogOpenedSanPhamCapNhat(false)}
                Data={activeValueSanPham}
                activePage={activePage}
                searchValue={searchValue}
            />
            <Add_Hangmuc_Dialog
                opened={dialogOpenedHangMuc}
                onClose={() => setDialogOpenedHangMuc(false)}
                activePage={activePage}
                searchValue={searchValue}
            />
            <Edit_Agent_Dialog
                opened={dialogOpenedHangMucCapNhat}
                onClose={() => setDialogOpenedHangMucCapNhat(false)}
                Data={activeValueHangMuc}
                activePage={activePage}
                searchValue={searchValue}
            />
            <Add_Nhomchucnang_Dialog
                opened={dialogOpenedNhomChucNang}
                onClose={() => setDialogOpenedNhomChucNang(false)}
                activePage={activePage}
                searchValue={searchValue}
            />
            <Edit_Nhomchucnang_Dialog
                opened={dialogOpenedNhomChucNangCapNhat}
                onClose={() => setDialogOpenedNhomChucNangCapNhat(false)}
                Data={activeValueNhomChucNang}
                activePage={activePage}
                searchValue={searchValue}
            />
            <Add_Chucnang_Dialog
                opened={dialogOpenedChucNang}
                onClose={() => setDialogOpenedChucNang(false)}
                activePage={activePage}
                searchValue={searchValue}
            />
            <Edit_Chucnang_Dialog
                opened={dialogOpenedChucNangCapNhat}
                onClose={() => setDialogOpenedChucNangCapNhat(false)}
                data={activeValueChucNang}
                activePage={activePage}
                searchValue={searchValue}
            />
        </>
    );
}

export default Editproductcategorys;
