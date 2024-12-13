package com.cusc.toolbaogia.validator.bienbanthanhphan;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Constraint(validatedBy = NguoiDungValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidNguoiDungInfo {
    String message() default "Thông tin người dùng không hợp lệ: Tên, Đơn vị và Email không được để trống khi người dùng ID bằng 0";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}