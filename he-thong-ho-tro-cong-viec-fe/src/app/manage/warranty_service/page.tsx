"use client";
import {
  Button,
  Card,
  Group,
  Table,
  Box,
  Pagination,
  Select,
  Text,
  Popover,
} from "@mantine/core";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import Add_WarrantyService_Dialog from "./addDialong"; // Ensure you have this dialog component
import Edit_WarrantyService_Dialog from "./editDialong"; // Ensure you have this dialog component
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import openCustomConfirmModal from "@/component/deleteConfirmModal/deleteConfirmModal";

import { deleteWarrantyService, fetchWarrantyService } from "@/store/slices/warrantyservice/warrantyserviceAction";

interface ActiveService {
  id: string;
  noiDung: string;
  baoHanh: number;
}

const breadcrumbArr = [
  { title: "Trang chủ", href: "/manage" },
  { title: "Quản lý", href: "/manage" },
  { title: "Dịch vụ bảo hành", href: "/manage/warrantyService" },
];

export default function WarrantyServicePage() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { items, loading, error } = useSelector((state: any) => state.warrantyService);
  const [activePage, setPage] = useState<number | any>(1);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [activeService, setActiveService] = useState<ActiveService | undefined>(undefined);
 
  const [rowpage, setRowpage] = useState<number | any>(5);
  const [searchValue, setSearchValue] = useState<string | undefined>("5");
  const [totalElements, setTotalElements] = useState<number | undefined>();

  useEffect(() => {
    if (items?.result?.pageable?.pageSize) {
      setRowpage(items.result.pageable.pageSize);
      setTotalElements(items.result.totalElements);
    }
  }, [items]);

  const startIndex = useMemo(() => {
    return rowpage ? (activePage - 1) * rowpage : 0;
  }, [activePage, rowpage]);

  const handlerDelete = async (id: number) => {
    try {
      await dispatch(deleteWarrantyService(id));
      await dispatch(fetchWarrantyService({ activePage, searchValue }));
    } catch (error) {
      console.error("Error deleting or fetching:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchWarrantyService({ activePage, searchValue }));
  }, [dispatch, activePage, searchValue]);

  const rows = items?.result?.content?.map(
    (item: string | any, index: number) => (
      <Table.Tr key={item.id} style={{ transition: "background-color 0.2s ease", fontSize: "16px", height: "60px" }}>
        <Table.Td style={{ padding: "10px", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}>
          {startIndex + index + 1}
        </Table.Td>
        <Table.Td style={{ padding: "10px" }}>{item.noiDung}</Table.Td>
        <Table.Td style={{ padding: "10px", borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>
          <Group>
            <Button
              variant="subtle"
              color="blue"
              onClick={() => {
                setEditDialogOpen(true);
                setActiveService({
                  id: item.id,
                  noiDung: item.noiDung,
                  baoHanh: item.baoHanh.id,
                });
              }}
            >
              <IconEdit size={20} />
            </Button>
            <Button
              variant="subtle"
              color="red"
              onClick={() => {
                openCustomConfirmModal({
                  id: item.id,
                  onConfirmAction: async (id: number) => {
                    await handlerDelete(id);
                  },
                });
              }}
            >
              <IconTrash size={20} />
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    )
  );

  return (
    <>
      <FullScreenLoader visible={loading} />
      <Box style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Group mb="md" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Breadcrumbst ArrBreadcrumb={breadcrumbArr} />
          <Box style={{ flexGrow: 1, textAlign: "right" }}>
            <Button
              rightSection={<IconPlus size={16} />}
              style={{ color: "white", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={() => setDialogOpened(true)}
            >
              Thêm
            </Button>
          </Box>
        </Group>

        <Card withBorder shadow="md" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <Table.ScrollContainer minWidth={500}>
            <Table highlightOnHover verticalSpacing="md" horizontalSpacing="lg" striped style={{ borderSpacing: "0 10px" }}>
              <Table.Thead style={{ backgroundColor: "#228be6", color: "white", textAlign: "left", fontSize: "18px", height: "50px" }}>
                <Table.Tr>
                  <Table.Th style={{ padding: "12px", borderRadius: "12px 0 0 12px" }}>STT</Table.Th>
                  <Table.Th>Nội dung</Table.Th>
                  <Table.Th style={{ borderRadius: "0 12px 12px 0" }}>Hành động</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody style={{ backgroundColor: "white", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: "12px" }}>
                {rows} {error && error}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
          <Group style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <Box className="flex items-center">
              Hiển thị
              <Select
                value={rowpage.toString()}
                data={["5", "10", "15", "20"]}
                onChange={(value) => {
                  const newPageSize: string | any = value;
                  setSearchValue(newPageSize);

                  if (totalElements && (activePage - 1) * newPageSize >= totalElements) {
                    setPage(1);
                  }
                }}
                className="w-[20%] mx-2"
              />
              Trên tổng số {totalElements}
            </Box>
            <Pagination value={activePage} onChange={setPage} total={items?.result?.totalPages} />
          </Group>
        </Card>

        <Add_WarrantyService_Dialog opened={dialogOpened} onClose={() => setDialogOpened(false)} activePage={activePage} searchValue={searchValue} />
        <Edit_WarrantyService_Dialog opened={editDialogOpen} onClose={() => setEditDialogOpen(false)} Data={activeService} activePage={activePage} searchValue={searchValue} />
      </Box>
    </>
  );
}
