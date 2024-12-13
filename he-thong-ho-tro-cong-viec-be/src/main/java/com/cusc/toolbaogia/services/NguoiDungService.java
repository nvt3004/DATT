package com.cusc.toolbaogia.services;

import com.cusc.toolbaogia.dto.request.NguoiDungCreationRequest;
import com.cusc.toolbaogia.dto.request.NguoiDungUpdateRequest;
import com.cusc.toolbaogia.dto.response.NguoiDungResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.NguoiDungMapper;
import com.cusc.toolbaogia.models.NguoiDung;
import com.cusc.toolbaogia.repositories.NguoiDungJPA;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NguoiDungService {
    NguoiDungJPA nguoiDungRepository;
    NguoiDungMapper userMapper;

    public NguoiDungResponse createUser(NguoiDungCreationRequest request) {
        if (nguoiDungRepository.existsNguoiDungByDangnhap(request.getDangnhap()))
            throw new AppException(ErrorCode.OBJECT_EXISTED, "Người dùng");

        NguoiDung nguoiDung = userMapper.toUser(request);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        nguoiDung.setMatkhau(passwordEncoder.encode(request.getMatkhau()));

        return userMapper.toUserResponse(nguoiDungRepository.save(nguoiDung));
    }

    public NguoiDungResponse updateUser(int nguoiDungId, NguoiDungUpdateRequest request) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(nguoiDungId).orElseThrow(
                () -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Người dùng"));
        userMapper.upadteNguoiDung(nguoiDung, request);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        nguoiDung.setMatkhau(passwordEncoder.encode(request.getMatkhau()));

        return userMapper.toUserResponse(nguoiDungRepository.save(nguoiDung));
    }

    public void deleteNguoiDung(int nguoiDungId) {
        nguoiDungRepository.deleteById(nguoiDungId);
    }

    public List<NguoiDungResponse> getAllUsers() {
        return nguoiDungRepository.findAll().stream()
                .map(userMapper::toUserResponse).toList();
    }

    public NguoiDungResponse getUser(int id) {
        return userMapper.toUserResponse(nguoiDungRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Người dùng")
                ));
    }
}
