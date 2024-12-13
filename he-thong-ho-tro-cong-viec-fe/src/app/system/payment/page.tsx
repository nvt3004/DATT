'use client';

import React from 'react';
import { Container, Grid } from '@mantine/core';
import CheckoutForm from './component/CheckoutForm';
import ProductSummary from './component/ProductSummary';

export default function SoftwareCheckout() {
    const [selectedLicense, setSelectedLicense] = React.useState<string>('personal');
    const [paymentMethod, setPaymentMethod] = React.useState<string>('credit-card');

    const softwareProduct = {
        id: '1',
        name: 'Premium Analytics Tool',
        price: 99.99,
        description: 'Công cụ phân tích dữ liệu chuyên nghiệp cho doanh nghiệp',
        features: [
            'Phân tích dữ liệu theo thời gian thực',
            'Tích hợp API không giới hạn',
            'Hỗ trợ xuất báo cáo đa định dạng',
            'Bảo mật dữ liệu cấp độ doanh nghiệp',
        ],
        licenseType: 'personal',
    };

    const licenseTypes = [
        { value: 'personal', label: 'Cá nhân', price: 99.99 },
        { value: 'business', label: 'Doanh nghiệp', price: 199.99 },
        { value: 'enterprise', label: 'Doanh nghiệp lớn', price: 499.99 },
    ];

    const bankAccounts = [
        {
            bankName: 'Vietcombank',
            accountNumber: '1234567890',
            accountHolder: 'NGUYEN VAN A',
        },
        {
            bankName: 'Techcombank',
            accountNumber: '0987654321',
            accountHolder: 'NGUYEN VAN A',
        },
    ];

    const getCurrentPrice = () => {
        const license = licenseTypes.find(l => l.value === selectedLicense);
        return license ? license.price : softwareProduct.price;
    };

    return (
        <Container size="xl" py="xl">
            <Grid>
                <Grid.Col span={7}>
                    <CheckoutForm
                        selectedLicense={selectedLicense}
                        setSelectedLicense={setSelectedLicense}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        licenseTypes={licenseTypes}
                        bankAccounts={bankAccounts}
                        currentPrice={getCurrentPrice()}
                    />
                </Grid.Col>
                <Grid.Col span={5}>
                    <ProductSummary softwareProduct={softwareProduct} currentPrice={getCurrentPrice()} />
                </Grid.Col>
            </Grid>
        </Container>
    );
}
