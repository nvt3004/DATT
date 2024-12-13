package com.cusc.toolbaogia.validator.bienbanthanhphan;

import com.cusc.toolbaogia.dto.bienbanthanhphan.request.BienBanThanhPhanRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class NguoiDungValidator implements ConstraintValidator<ValidNguoiDungInfo, BienBanThanhPhanRequest> {
    private String message;

    @Override
    public void initialize(ValidNguoiDungInfo constraintAnnotation) {
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(BienBanThanhPhanRequest request, ConstraintValidatorContext context) {
        if (request.getNguoiDungId() == 0) {
            boolean valid = request.getTen() != null && !request.getTen().isBlank() &&
                    request.getDonvi() != null && !request.getDonvi().isBlank() &&
                    request.getEmail() != null && !request.getEmail().isBlank();

            if (!valid) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate(message)
                        .addConstraintViolation();
                return false;
            }
        }
        return true;
    }
}
