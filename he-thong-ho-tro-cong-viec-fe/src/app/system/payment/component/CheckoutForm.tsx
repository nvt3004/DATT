import React from 'react';
import { Card, Stack, Title, TextInput, Divider, Checkbox, Button } from '@mantine/core';
import LicenseSelect from './LicenseSelect';
import PaymentMethodTabs from './PaymentMethodTabs';

interface CheckoutFormProps {
    selectedLicense: string;
    setSelectedLicense: (value: string) => void;
    paymentMethod: string;
    setPaymentMethod: (value: string) => void;
    licenseTypes: { value: string; label: string; price: number }[];
    bankAccounts: { bankName: string; accountNumber: string; accountHolder: string }[];
    currentPrice: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    selectedLicense,
    setSelectedLicense,
    paymentMethod,
    setPaymentMethod,
    licenseTypes,
    bankAccounts,
    currentPrice
}) => {
    return (
        <Card shadow="sm" padding="lg">
            <Stack gap="md">
                <Title order={2}>Thông tin thanh toán</Title>

                <TextInput label="Email" placeholder="your@email.com" required />
                <TextInput label="Họ" placeholder="Nguyễn" required />
                <TextInput label="Tên" placeholder="Văn A" required />

                <LicenseSelect
                    selectedLicense={selectedLicense}
                    onLicenseChange={setSelectedLicense}
                    licenseTypes={licenseTypes}
                />

                <Divider my="sm" label="Phương thức thanh toán" labelPosition="center" />

                <PaymentMethodTabs
                    paymentMethod={paymentMethod}
                    onPaymentMethodChange={setPaymentMethod}
                    bankAccounts={bankAccounts}
                />

                <Checkbox label="Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật" />

                <Button size="lg" fullWidth>
                    Thanh toán ${currentPrice}
                </Button>
            </Stack>
        </Card>
    );
};

export default CheckoutForm;
