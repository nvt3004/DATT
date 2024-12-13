package com.cusc.toolbaogia.validator.bienbanhop;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = TimeRangeValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidTimeRange {
    String message() default "Thời gian bắt đầu phải trước thời gian kết thúc";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}