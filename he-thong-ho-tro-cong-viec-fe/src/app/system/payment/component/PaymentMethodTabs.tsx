import React from 'react';
import {
    Tabs,
    Stack,
    Card,
    Text,
    Grid,
    TextInput,
    Group,
    ActionIcon,
    Tooltip,
    Select,
    Image
} from '@mantine/core';
import { IconCreditCard, IconBuildingBank, IconWallet, IconQrcode, IconCopy } from '@tabler/icons-react';

interface PaymentMethodTabsProps {
    paymentMethod: string;
    onPaymentMethodChange: (value: string) => void;
    bankAccounts: { bankName: string; accountNumber: string; accountHolder: string }[];
}

const PaymentMethodTabs: React.FC<PaymentMethodTabsProps> = ({
    paymentMethod,
    onPaymentMethodChange,
    bankAccounts
}) => {
    const renderPaymentMethod = () => {
        switch (paymentMethod) {
            case 'credit-card':
                return (
                    <Stack gap="md">
                        <TextInput label="Số thẻ" placeholder="1234 5678 9012 3456" required />
                        <Grid>
                            <Grid.Col span={6}>
                                <TextInput label="Ngày hết hạn" placeholder="MM/YY" required />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput label="CVV" placeholder="123" required />
                            </Grid.Col>
                        </Grid>
                    </Stack>
                );
            case 'bank-transfer':
                return (
                    <Stack gap="md">
                        {bankAccounts.map((account, index) => (
                            <Card key={index} withBorder p="sm">
                                <Group grow wrap="nowrap">
                                    <Stack gap={5}>
                                        <Text w={500}>{account.bankName}</Text>
                                        <Text size="sm">Số TK: {account.accountNumber}</Text>
                                        <Text size="sm">Chủ TK: {account.accountHolder}</Text>
                                    </Stack>
                                    <Tooltip label="Sao chép số TK">
                                        <ActionIcon color="gray">
                                            <IconCopy size={16} />
                                        </ActionIcon>
                                    </Tooltip>
                                </Group>
                            </Card>
                        ))}
                    </Stack>
                );
            case 'e-wallet':
                return (
                    <Stack gap="md" style={{ textAlign: 'center' }}>
                        <Select
                            label="Chọn ví điện tử"
                            placeholder="Chọn ví điện tử"
                            data={[
                                { value: 'momo', label: 'MoMo' },
                                { value: 'zalopay', label: 'ZaloPay' },
                                { value: 'vnpay', label: 'VNPay' }
                            ]}
                            required
                            style={{ width: '100%' }}
                        />
                    </Stack>
                );
            case 'qr-code':
                return (
                    <Stack gap="md" style={{ textAlign: 'center' }}>
                        <Card withBorder p="xl" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card.Section style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image
                                    src="/qrcodefb.png"
                                    radius="md"
                                    h={200}
                                    w="auto"
                                    fit="contain"
                                    style={{ display: 'block', margin: '0 auto' }}
                                />
                            </Card.Section>
                        </Card>
                        <Text size="sm" style={{ textAlign: 'center' }}>
                            Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử để thanh toán
                        </Text>
                    </Stack>
                );
        }
    };

    return (
        <Tabs value={paymentMethod} onChange={(value) => value !== null && onPaymentMethodChange(value)}>
            <Tabs.List grow>
                <Tabs.Tab value="credit-card" leftSection={<IconCreditCard size={16} />}>
                    Thẻ tín dụng
                </Tabs.Tab>
                <Tabs.Tab value="bank-transfer" leftSection={<IconBuildingBank size={16} />}>
                    Chuyển khoản
                </Tabs.Tab>
                <Tabs.Tab value="e-wallet" leftSection={<IconWallet size={16} />}>
                    Ví điện tử
                </Tabs.Tab>
                <Tabs.Tab value="qr-code" leftSection={<IconQrcode size={16} />}>
                    Mã QR
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={paymentMethod} pt="xs">
                {renderPaymentMethod()}
            </Tabs.Panel>
        </Tabs>
    );
};

export default PaymentMethodTabs;
