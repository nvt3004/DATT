import { useState } from "react";
import { Box, Button, ActionIcon, Group } from "@mantine/core";
import {
  IconUser,
  IconSettings,
  IconMenu2,
  IconHome,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function DraggableAside() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [relPosition, setRelPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setRelPosition({
      x: e.pageX - position.x,
      y: e.pageY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.pageX - relPosition.x,
        y: e.pageY - relPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        height: "auto",
        position: "fixed",
        bottom: "150px",
        right: "0px",
        width: "60px",
        padding: "10px",
      }}
    >
      <ActionIcon
        variant="filled"
        size="xl"
        radius="xl"
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          cursor: dragging ? "grabbing" : "grab",
          zIndex: 1000, // Đảm bảo icon nằm trên cùng
        }}
        onMouseDown={handleMouseDown}
        onClick={() => setIsOpen(!isOpen)} // Toggle thanh ngang
      >
        <IconMenu2 />
      </ActionIcon>

      {/* Hiển thị thanh ngang khi icon được nhấp */}
      {isOpen && (
        <Box
          style={{
            position: "absolute",
            top: position.y - 60,
            left: position.x - 85, // Để tránh bị icon che mất, đẩy ra một chút
            display: "flex",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {/* Các thành phần bên trong thanh ngang */}
          <Group>
            <Button variant="filled" onClick={() => router.push("/manage")}>
              <IconHome size={14} style={{ margin: "auto" }} />
            </Button>
            <Button variant="filled">
              <IconSettings size={14} style={{ margin: "auto" }} />
            </Button>
            <Button variant="filled">
              <IconUser size={14} style={{ margin: "auto" }} />
            </Button>
          </Group>
        </Box>
      )}
    </div>
  );
}
