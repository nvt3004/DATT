"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData_Report, deleteReport } from "@/store/slices/report/repostAction";
import { ThunkDispatch } from "redux-thunk";
import { useRouter } from "next/navigation";
import {
  Paper,
  Title,
  Box,
  Table,
  Pagination,
  Select,
  Group,
  Button,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconFileDownload, IconListDetails, IconPlus, IconTrashX } from "@tabler/icons-react";
import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import EditModal from "./EditReportModal";
import openCustomConfirmModal from "@/component/deleteConfirmModal/deleteConfirmModal";
import { PATHS } from './../../../store/configPath';

function Report() {
  const [activePage, setPage] = useState<number>(1);
  const [rowpage, setRowpage] = useState<number>();
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState<number>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [loadingnvg, setLoadingnvg] = useState(false);

  const router = useRouter();
  const arr = [
    { title: "Trang chủ", href: "#" },
    { title: "Danh Sách biên bản", href: "#" },
  ];

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { items, isloading } = useSelector((state: any) => state.report);


  useEffect(() => {
    dispatch(fetchData_Report({ page: activePage, size: pageSize }));
  }, [dispatch, activePage, pageSize]);


  const handleUpdateList = () => {
    dispatch(fetchData_Report({ page: activePage, size: pageSize }));
  }

  useEffect(() => {
    if (items?.result?.pageable?.pageSize) {
      setRowpage(items.result.pageable.pageSize);
      setTotalElements(items?.result?.totalElements);
    }
  }, [items]);

  const startIndex = rowpage ? (activePage - 1) * rowpage : 0;

  const openEditModal = (reportData: any) => {
    console.log("check reportData", reportData);
    
    setCurrentReport(reportData);
    setIsEditModalOpen(true);
  };

  const handleDeleteReport = async (currentReportId: string) => {
    try {
      setLoadingnvg(true);
      await dispatch(deleteReport(currentReportId));
      await dispatch(fetchData_Report({ page: activePage, size: pageSize }));
      setLoadingnvg(false);
    } catch (error) {
      console.error("Error deleting or fetching:", error);
    }
  };

  const handleNavigate_Deltel = (id: any) => {
    setLoadingnvg(true);
    router.push(`/system/report/detail/${id}`);
  }

  const handleNavigate_Add = () => {
    setLoadingnvg(true);
    router.push(`/system/report/add`);
  }

  const rows = items?.result?.content?.map((element: any, index: number) => {
    return (
      <>
        <Table.Tr key={index}>
          <Table.Td>{startIndex + index + 1}</Table.Td>
          <Table.Td>{element?.ten || "No data"}</Table.Td>
          <Table.Td>{element?.nguoiDung?.ten || "No data"}</Table.Td>
          <Table.Td>{element?.mota || "No data"}</Table.Td>
          <Table.Td>{element?.ngayTao || "No data"}</Table.Td>
          <Table.Td style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Tooltip label="Tải xuống" position="top" withArrow>
              <Button variant="subtle" color="blue"
                onClick={() => {
                  window.location.href = `${PATHS.Report_Download}/bienbanhop?bienBanHopId=${element?.id}`;
                }}
              >
                <IconFileDownload size={20} />
              </Button>
            </Tooltip>
            <Tooltip label="Xem chi tiết" position="top" withArrow>
              <Button
                variant="subtle"
                color="blue"
                onClick={() => handleNavigate_Deltel(element.id)}
              >
                <IconListDetails size={20} />
              </Button>
            </Tooltip>
            <Tooltip label="Xóa" position="top" withArrow>
              <Button
                variant="subtle"
                color="red"
                onClick={() => {
                  openCustomConfirmModal({
                    id: element.id,
                    onConfirmAction: async (id: string) => {
                      await handleDeleteReport(id);
                    },
                  });
                }}
              >
                <IconTrashX size={20} />
              </Button>
            </Tooltip>

            <Tooltip label="cập nhật" position="top" withArrow>
              <Button
                variant="subtle"
                color="blue"
                onClick={() => openEditModal(element)}
              >
                <IconEdit size={20} />
              </Button>
            </Tooltip>

          </Table.Td>
        </Table.Tr>
      </>
    );
  });

  return (
    <>
      <FullScreenLoader visible={isloading} />
      <FullScreenLoader visible={loadingnvg} />
      <Paper>
        <Breadcrumbst ArrBreadcrumb={arr} />
        <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3">
          <Title order={3}>Danh sách biên bản</Title>
        </Box>
        <Box style={{ display: "flex", justifyContent: "flex-end", borderRadius: "8px" }}>
          <Button leftSection={<IconPlus size={14} />} mb="8" onClick={() => handleNavigate_Add()}>
            Thêm biên bản họp
          </Button>
        </Box>
        <Box>
          <Table withTableBorder>
            <Table.Thead className="bg-[#339af0] text-white">
              <Table.Tr>
                <Table.Th style={{ textAlign: "center" }}>STT</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Tên biên bản</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Người tạo</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Mô tả</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Ngày tạo</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Hành động</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows?.length > 0 ? rows : <Table.Tr><Table.Td style={{ textAlign: "center", margin: "10px 0px" }} colSpan={12}>Không có dữ liệu</Table.Td></Table.Tr>}</Table.Tbody>
          </Table>
          <Group
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Box className="flex items-center">
              Hiển thị{" "}
              <Select
                value={pageSize.toString()}
                data={["5", "10", "15", "20"]}
                onChange={(value) => {
                  const newPageSize = Number(value);
                  setPageSize(newPageSize);

                  if (
                    totalElements &&
                    (activePage - 1) * newPageSize >= totalElements
                  ) {
                    setPage(1);
                  }
                }}
                className="w-[20%] mx-2"
              />
              Trên tổng số {totalElements}
            </Box>
            <Pagination
              value={activePage}
              onChange={setPage}
              total={items?.result?.totalPages}
            />
          </Group>
        </Box>
      </Paper>

      <EditModal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        reportData={currentReport}
        handleUpdateList={handleUpdateList}
      />
    </>
  );
}

export default Report;
