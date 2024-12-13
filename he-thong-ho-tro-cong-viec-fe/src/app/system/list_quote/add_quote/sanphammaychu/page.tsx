"use client";
import {
    ActionIcon,
    Box,
    Button,
    Checkbox,
    Group,
    Input,
    Table,
    Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
    selecIdSanphamBaoGia,
    selectQuoteIdBaogia,
    setIdSanPhamBaoGia,
} from "@/store/slices/quote/quoteSlice";

import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import {
    deleteQuote,
    fetchDeatailQuote,
} from "@/store/slices/quote/quoteAction";
import { deleteMaychu, fetchMaychu } from "@/store/slices/maychu/maychuAction";
import {
    addProductSever,
    addProductSeverList,
    deleteProductSever,
} from "@/store/slices/productsever/productSeverAction";
function SanPhamMayChu() {
    const router = useRouter();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [SelectedRowsMayChu, setsetSelectedRowsMayChu] = useState<
        number[] | any
    >([]);
    const IdBaogia = useSelector(selectQuoteIdBaogia);
    const sanPhamBaoGiaId = useSelector(selecIdSanphamBaoGia);
    const [continuequote4, setContinueQuote] = useState<boolean | undefined>(
        false
    );
    const [dataQuote, setdDataQuote] = useState<any | undefined>(false);
    useEffect(() => {
        const activePage = 1;
        const searchValue = "100";
        dispatch(fetchMaychu({ activePage, searchValue }));
    }, [dispatch]);

    const { items, loading, error } = useSelector((state: any) => state.maychu);
    const handlerDelete = async (id: string) => {
        try {

            await dispatch(deleteProductSever(id));
            // const activePage = 1;
            // const searchValue = "100";
            // dispatch(fetchMaychu({ activePage, searchValue }));
            // const id = IdBaogia;
            // dispatch(fetchDeatailQuote(IdBaogia));
            notifications.show({
                title: "Thành công",
                message: "Xóa thành công!",
                color: "green",
                position: "top-right",
            });
        } catch (error) {
            console.error("Error deleting or fetching:", error);
            notifications.show({
                title: "Lỗi!",
                message: "Có lỗi xảy ra khi xóa Tư vấn!",
                color: "green",
                position: "top-right",
            });
        }
    };
    //

    const rows = items?.result?.content?.map(
        (item: string | any, index: number) => (
            <Table.Tr
                key={item.id}
                style={{
                    transition: "background-color 0.2s ease",
                    fontSize: "16px",
                    height: "60px",
                    borderCollapse: "separate",
                    marginBottom: "10px",
                }}
                bg={
                    SelectedRowsMayChu.includes(item.id)
                        ? "var(--mantine-color-blue-light)"
                        : undefined
                }
            >
                <Table.Td style={{ textAlign: "center" }}>
                   
                    <Checkbox
                        aria-label="Select row"
                        checked={SelectedRowsMayChu.includes(item.id)}
                        onChange={(event) =>
                            setsetSelectedRowsMayChu(
                                event.currentTarget.checked
                                    ? [...SelectedRowsMayChu, item.id]
                                    : SelectedRowsMayChu.filter(
                                          (item: any) =>
                                              item.id !== item.position
                                      )
                            )
                        }
                    />
                </Table.Td>
                <Tooltip
                    label={item.ten}
                    position="top"
                    withArrow
                    multiline
                    style={{
                        maxWidth: 300,
                        whiteSpace: "normal",
                    }}
                >
                    <Table.Td className="p-3 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.ten}
                    </Table.Td>
                </Tooltip>
                <Tooltip
                    label={item.moTa}
                    position="top"
                    withArrow
                    multiline
                    style={{
                        maxWidth: 300,
                        whiteSpace: "normal",
                    }}
                >
                    <Table.Td className="p-3 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.moTa ? item.moTa : "Không có mô tả"}
                    </Table.Td>
                </Tooltip>
                <Table.Td>
                    {item?.listSanPhamMayChuChiTiet?.length ? (
                        <ul>
                            {item?.listSanPhamMayChuChiTiet?.map(
                                (chiTiet: any, indexChiTiet: number) => {
                                    return (
                                        <li key={chiTiet.id}>
                                            {chiTiet?.thongSo?.ten || "N/A"}:{" "}
                                            {chiTiet?.giaTri ||
                                                "Không có giá trị"}
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    ) : (
                        "Không có thông tin chi tiết"
                    )}
                </Table.Td>
            </Table.Tr>
        )
    );

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
    });

    const handleSubmit = async (values: typeof form.values | any) => {
        if (SelectedRowsMayChu.length === 0) {
            notifications.show({
                title: "Lỗi",
                message: "Vui lòng điền đầy đủ thông tin!",
                color: "red",
                position: "top-right",
            });
            return;
        }

        const DataSanPhamMayChu = {
            sanPhamBaoGiaId: sanPhamBaoGiaId,
            mayChuIds: SelectedRowsMayChu,
        };
        // addProductSeverList
        const res = await dispatch(addProductSeverList(DataSanPhamMayChu));
        if (res.payload.code === 1000) {
            setsetSelectedRowsMayChu([]);
            notifications.show({
                title: "Thành công",
                message: "Đã thêm máy chủ!",
                color: "green",
                position: "top-right",
            });
            const id = IdBaogia;
            const resQuoteDetail = await dispatch(fetchDeatailQuote({ id }));
            setdDataQuote(resQuoteDetail?.payload);
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
    const submitDeleteQuote = async () => {
        try {
            await dispatch(deleteQuote(IdBaogia));
            router.push("/system/list_quote");
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };
    const listSanPhamMayChu = dataQuote?.listSanPhamBaoGia?.length
        ? dataQuote?.listSanPhamBaoGia?.map(
              (element: any, indexBaoGia: number) =>
                  element?.listSanPhamMayChu?.map(
                      (mayChuItem: any, indexMayChu: number) => {
                          return (
                              <Table.Tr key={`${element.id}-${mayChuItem.id}`}>
                                  <Table.Td>
                                      {mayChuItem?.mayChu?.ten || "N/A"}
                                  </Table.Td>
                                  <Table.Td>
                                      {mayChuItem?.mayChu
                                          ?.listSanPhamMayChuChiTiet?.length ? (
                                          <ul>
                                              {mayChuItem?.mayChu?.listSanPhamMayChuChiTiet?.map(
                                                  (
                                                      chiTiet: any,
                                                      indexChiTiet: number
                                                  ) => {
                                                      return (
                                                          <li key={chiTiet.id}>
                                                              {chiTiet?.thongSo
                                                                  ?.ten ||
                                                                  "N/A"}
                                                              :{" "}
                                                              {chiTiet?.giaTri ||
                                                                  "Không có giá trị"}
                                                          </li>
                                                      );
                                                  }
                                              )}
                                          </ul>
                                      ) : (
                                          "Không có thông tin chi tiết"
                                      )}
                                  </Table.Td>
                                  <Table.Td>
                                      {mayChuItem?.mayChu?.moTa ||
                                          "Không có mô tả"}
                                  </Table.Td>
                                  {/* <Table.Td style={{ textAlign: "center" }}>
                                      <ActionIcon
                                          color="red"
                                          onClick={() =>
                                              handlerDelete(mayChuItem?.id)
                                          }
                                          style={{ margin: "0px 10px" }}
                                      >
                                          <IconTrash size={20} />
                                      </ActionIcon>
                                  </Table.Td> */}
                              </Table.Tr>
                          );
                      }
                  )
          )
        : null;
    return (
        <>
            <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3 ">
                <p>Máy chủ </p>
            </Box>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead className="bg-[#339af0] text-white ">
                    <Table.Tr>
                        <Table.Th style={{ textAlign: "center" }}>#</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>
                            Máy chủ
                        </Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>
                            Mô tả
                        </Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>
                            Cấu hình
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            {listSanPhamMayChu ? (
                <div className=" bg-[#eceef0] p-4 rounded mt-3">
                    <Input.Label>Sản phẩm máy chủ được chọn</Input.Label>
                    <Table
                        striped
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                    >
                        <Table.Thead  style={{ backgroundColor: "#339af0" , color: "white"}}>
                            <Table.Tr>
                                <Table.Th className="text-center">
                                    Máy chủ
                                </Table.Th>
                                <Table.Th className="text-center">
                                    Cấu hình
                                </Table.Th>
                                <Table.Th className="text-center">
                                    Mô tả
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{listSanPhamMayChu}</Table.Tbody>
                    </Table>
                </div>
            ) : null}

            {continuequote4 ? null : (
                <>
                    <Button
                        className="mt-2"
                        onClick={handleSubmit}
                        variant="filled"
                        type="submit"
                    >
                        Thêm Máy chủ
                    </Button>
                </>
            )}

            {continuequote4 ? (
                <> </>
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

                                <Button
                                    onClick={() =>
                                        router.push("/system/list_quote/")
                                    }
                                    variant="filled"
                                    color="green"
                                    className="mt-1"
                                >
                                    Lưu báo giá
                                </Button>
                            </Group>
                        </form>
                    </Box>
                </>
            )}
        </>
    );
}

export default SanPhamMayChu;
