import React from 'react';
import { Select } from '@mantine/core';

interface LicenseSelectProps {
  selectedLicense: string;
  onLicenseChange: (value: string) => void;
  licenseTypes: { value: string; label: string; price: number }[];
}

const LicenseSelect: React.FC<LicenseSelectProps> = ({
  selectedLicense,
  onLicenseChange,
  licenseTypes
}) => {
  return (
    <Select
      label="Loại giấy phép"
      value={selectedLicense}
      onChange={(value) => onLicenseChange(value || 'personal')}
      data={licenseTypes.map(type => ({
        value: type.value,
        label: `${type.label} - $${type.price}`
      }))}
    />
  );
};

export default LicenseSelect;
