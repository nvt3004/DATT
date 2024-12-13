package com.cusc.toolbaogia.services;

import com.cusc.toolbaogia.dto.bienbannoidung.request.BienBanNoiDungCreateRequest;
import com.cusc.toolbaogia.dto.bienbannoidung.request.BienBanNoiDungUpdateRequest;
import com.cusc.toolbaogia.dto.bienbannoidung.response.BienBanNoiDungResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.BienBanNoiDungMapper;
import com.cusc.toolbaogia.models.BienBanNoiDung;
import com.cusc.toolbaogia.models.BienBanThanhPhan;
import com.cusc.toolbaogia.repositories.BienBanNoiDungJPA;
import com.cusc.toolbaogia.repositories.BienBanThanhPhanJPA;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BienBanNoiDungService {
    BienBanNoiDungJPA bienBanNoiDungRepository;
    BienBanThanhPhanJPA bienBanThanhPhanRepository;
    BienBanNoiDungMapper bienBanNoiDungMapper;

    public PageImpl<BienBanNoiDungResponse> getAllBienBanNoiDung(int page, int size) {

        if (page < 0 || size <= 0) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<BienBanNoiDung> bienBanNoiDungPage = bienBanNoiDungRepository.findAllByNgayXoaIsNullOrderByIdDesc(pageable);

        var responseList = bienBanNoiDungPage.getContent().stream()
                .map(bienBanNoiDungMapper::toBienBanNoiDungResponse).toList();
        return new PageImpl<>(responseList, pageable, bienBanNoiDungPage.getTotalElements());
    }

    public BienBanNoiDungResponse getBienBanNoiDungById(int id) {
        return bienBanNoiDungMapper.toBienBanNoiDungResponse(bienBanNoiDungRepository.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản nội dung")));
    }

    public BienBanNoiDungResponse createBienBanNoiDung(BienBanNoiDungCreateRequest request){
        BienBanNoiDung bienBanNoiDung = bienBanNoiDungMapper.toBienBanNoiDung(request);
        BienBanThanhPhan bienBanThanhPhan = bienBanThanhPhanRepository.findById(request.getBienBanThanhPhanId())
                .orElseThrow( () -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản thành phần"));
        bienBanNoiDung.setBienBanThanhPhan(bienBanThanhPhan);
        bienBanNoiDung.setNgayTao(LocalDateTime.now());

        return bienBanNoiDungMapper.toBienBanNoiDungResponse(bienBanNoiDungRepository.save(bienBanNoiDung));
    }

    public BienBanNoiDungResponse updateBienBanNoiDung(int id, BienBanNoiDungUpdateRequest request){
        BienBanNoiDung bienBanNoiDung = bienBanNoiDungRepository.findByIdAndNgayXoaIsNull(id).orElseThrow(
                () -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản nội dung"));
        BienBanThanhPhan bienBanThanhPhan = bienBanThanhPhanRepository.findById(request.getBienBanThanhPhanId())
                .orElseThrow( () -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản thành phần"));

        bienBanNoiDung.setBienBanThanhPhan(bienBanThanhPhan);
        bienBanNoiDung.setNgaySua(LocalDateTime.now());

        bienBanNoiDungMapper.upadteBienBanNoiDung(bienBanNoiDung, request);
        return bienBanNoiDungMapper.toBienBanNoiDungResponse(bienBanNoiDungRepository.save(bienBanNoiDung));
    }

    public void deleteBienBanNoiDung(int id) {
        BienBanNoiDung bienBanNoiDung = bienBanNoiDungRepository.findByIdAndNgayXoaIsNull(id).orElseThrow(
                () -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản nội dung"));

        bienBanNoiDung.setNgayXoa(LocalDateTime.now());
        bienBanNoiDungRepository.save(bienBanNoiDung);
    }

}
