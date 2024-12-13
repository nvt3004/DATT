"use client"

import { Group, Grid, Card, Text, Button, Avatar, Box } from "@mantine/core";

function Service() {
  return (
    <>
      <Group>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Box style={{ display: "flex", alignItems: "center", gap: "16px", width:"100%", height:"100%" }}>
              {/* Hình ảnh tròn */}
              <Avatar
                src="https://coolmax-pc.com/wp-content/uploads/2023/09/lap-rap.png"
                radius="xl"
                size="lg"
                alt="Placeholder"
              />

              {/* Nội dung */}
              <div>
                <Text size="md" color="orange">
                  Dịch vụ bảo hành
                </Text>
                <Button variant="filled" className="mt-2">
                  Tìm hiểu
                </Button>
              </div>
            </Box>
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Hình ảnh tròn */}
              <Avatar
                src="https://png.pngtree.com/png-vector/20220929/ourmid/pngtree-woman-operators-in-headset-advising-customers-flat-style-design-png-image_6223204.png"
                radius="xl"
                size="lg"
                alt="Placeholder"
              />

              {/* Nội dung */}
              <div>
                <Text size="md" color="orange">
                  Tư vấn khách hàng
                </Text>
                <Button variant="filled" className="mt-2">
                  Tìm hiểu
                </Button>
              </div>
            </div>
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Hình ảnh tròn */}
              <Avatar
                src="https://photo.salekit.com/uploads/fchat_5b4872d13803896dd77125af/chatbot-dich-vu-khach-hang.jpg"
                radius="xl"
                size="lg"
                alt="Placeholder"
              />

              {/* Nội dung */}
              <div>
                <Text size="md" color="orange">
                  Về dịch vụ
                </Text>
                <Button variant="filled" className="mt-2">
                  Tìm hiểu
                </Button>
              </div>
            </div>
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Hình ảnh tròn */}
              <Avatar
                src="https://marketing-center.net/wp-content/uploads/2020/11/uu_diem_cskh_truc_tuyen.jpg"
                radius="xl"
                size="lg"
                alt="Placeholder"
              />

              {/* Nội dung */}
              <div>
                <Text size="md" color="orange">
                  Về chuyên môn
                </Text>
                <Button variant="filled" className="mt-2">
                  Tìm hiểu
                </Button>
              </div>
            </div>
          </Card>
        </Grid.Col>

      </Group>
    </>
  )
}

export default Service;