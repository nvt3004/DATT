"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Collapse, NavLink, Stack, Paper, Box } from "@mantine/core";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import {
  IconNotes,
  IconGauge,
  IconQuote,
  IconChevronDown,
  IconChevronUp,
  IconAB2,
  IconServer,
  IconCategory,
} from "@tabler/icons-react";

export function NavbarManage() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const navItems = [
    { label: "Dashboard", icon: IconGauge, link: "/manage" },
    {
      label: "QL Phần Mềm",
      icon: IconNotes,
      links: [
        { label: "Nhóm thông số", link: "/manage/parameter_group" },
        { label: "Thông số", link: "/manage/parameter" },
        { label: "Máy chủ", link: "/manage/server" },
        // { label: "Phần Mềm - TSKT", link: "/manage/software_specifications" },
      ],
    },
    {
      label: "QL Báo giá",
      icon: IconQuote,
      links: [
        { label: "Nhóm chức năng", link: "/manage/functional_group" },
        { label: "Chức năng", link: "/manage/function" },
        { label: "Đơn Vị Tính", link: "/manage/unit_of_measurement" },
        { label: "Tác nhân sử dụng", link: "/manage/agent_used" },
        { label: "Dịch vụ bảo hành", link: "/manage/warranty_service" },
        { label: "Điều khoản bảo hành", link: "/manage/warranty_terms" },
        { label: "Phương thức bảo hành", link: "/manage/warranty_method" },
        { label: "Phương thức thanh toán", link: "/manage/pay" },
        { label: "Tư vấn", link: "/manage/advise" },
        { label: "Gói sản phẩm", link: "/manage/product_package" },
        { label: "Danh sách báo giá", link: "/manage/quote" },
        { label: "Khách hàng", link: "/manage/client" },
        { label: "Danh mục", link: "/manage/cate" },
        { label: "Hạng mục", link: "/manage/categorys" },
        { label: "Sản phẩm", link: "/manage/products" },
      ],
    },
    { label: "Phần mềm máy chủ", icon: IconServer, link: "/manage/softwaresever" },
    { label: "Sản phẩm hạng mục", icon: IconCategory, link: "/manage/productcategorys" },
  ];

  const handleClick = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  const handleNavigation = (route: string) => {
    startTransition(() => {
      router.push(route);
    });
  };

  const links = navItems.map((item, index) => (
    <Box key={item.label}>
      <NavLink
        label={item.label}
        leftSection={<item.icon size={14} />}
        rightSection={
          item.links ? (
            activeItem === index ? (
              <IconChevronUp size={14} />
            ) : (
              <IconChevronDown size={14} />
            )
          ) : null
        }
        onClick={() =>
          item.links ? handleClick(index) : handleNavigation(item.link)
        }
        active={activeItem === index && !item.links}
        style={{ cursor: "pointer" }}
      />
      {item.links && (
        <Collapse in={activeItem === index}>
          <Box style={{ maxHeight: 350, overflowY: "auto" }}>
            <Stack pl="md">
              {item.links.map((subItem) => (
                <NavLink
                  key={subItem.label}
                  label={subItem.label}
                  onClick={() => handleNavigation(subItem.link)}
                  active={activeSubItem === subItem.link}
                  style={{ paddingLeft: 20, cursor: "pointer" }}
                />
              ))}
            </Stack>
          </Box>
        </Collapse>
      )}
    </Box>
  ));

  return (
    <>
      <FullScreenLoader visible={isPending} />
      <Paper style={{ display: "flex", height: "auto" }}>
        <Box style={{ width: "100%", padding: "10px" }}>
          <Stack mt="sm">{links}</Stack>
        </Box>
      </Paper>
    </>
  );
}
