import React from 'react';
import { Card, Stack, Title, Text, List, ThemeIcon, Divider, Button, Group } from '@mantine/core';
import { IconCheck, IconDownload } from '@tabler/icons-react';

interface ProductSummaryProps {
  softwareProduct: {
    name: string;
    description: string;
    features: string[];
    price: number;
  };
  currentPrice: number;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({ softwareProduct, currentPrice }) => {
  return (
    <Card shadow="sm" padding="lg">
      <Stack gap="md">
        <Title order={2}>{softwareProduct.name}</Title>
        <Text>{softwareProduct.description}</Text>

        <List
          spacing="xs"
          size="sm"
          center
          icon={<ThemeIcon color="teal" size={24} radius="xl"><IconCheck size={16} /></ThemeIcon>}
        >
          {softwareProduct.features.map((feature, index) => (
            <List.Item key={index}>{feature}</List.Item>
          ))}
        </List>

        <Divider my="sm" />

        <Group>
          <Text>Tổng tiền:</Text>
          <Text w={700} size="xl">${currentPrice}</Text>
        </Group>

        <Button variant="light" color="blue" fullWidth leftSection={<IconDownload size={16} />}>
          Tải tài liệu kỹ thuật
        </Button>
      </Stack>
    </Card>
  );
};

export default ProductSummary;
