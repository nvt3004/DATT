package com.cusc.toolbaogia.validator.bienbanhop;

import com.cusc.toolbaogia.dto.bienbanhop.request.BienBanHopRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TimeRangeValidator implements ConstraintValidator<ValidTimeRange, BienBanHopRequest> {
    private String message;

    @Override
    public void initialize(ValidTimeRange constraintAnnotation) {
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(BienBanHopRequest request, ConstraintValidatorContext context) {
        if (request == null) {
            return true;
        }

        boolean isValid = request.getGiobatdau() != null
                && request.getGioketthuc() != null
                && request.getGiobatdau().isBefore(request.getGioketthuc());

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(message)
                    .addConstraintViolation();
        }

        return isValid;
    }
}
