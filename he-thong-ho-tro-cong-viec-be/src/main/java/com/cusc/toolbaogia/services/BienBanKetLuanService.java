package com.cusc.toolbaogia.services;

import com.cusc.toolbaogia.dto.bienbanketluan.request.BienBanKetLuanCreateRequest;
import com.cusc.toolbaogia.dto.bienbanketluan.request.BienBanKetLuanUpdateRequest;
import com.cusc.toolbaogia.dto.bienbanketluan.response.BienBanKetLuanResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.BienBanKetLuanMapper;
import com.cusc.toolbaogia.models.BienBanHop;
import com.cusc.toolbaogia.models.BienBanKetLuan;
import com.cusc.toolbaogia.repositories.BienBanHopJPA;
import com.cusc.toolbaogia.repositories.BienBanKetLuanJPA;
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
public class BienBanKetLuanService {
    BienBanKetLuanJPA bienBanKetLuanRepository;
    BienBanHopJPA bienBanHopRepository;
    BienBanKetLuanMapper bienBanKetLuanMapper;

    public PageImpl<BienBanKetLuanResponse> getAllBienBanKetLuan(int page, int size) {

        if (page < 0 || size <= 0) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<BienBanKetLuan> bienBanKetLuanPage = bienBanKetLuanRepository.findAllByNgayXoaIsNullOrderByIdDesc(pageable);

        var responseList = bienBanKetLuanPage.getContent().stream()
                .map(bienBanKetLuanMapper::toBienBanKetLuanResponse).toList();
        return new PageImpl<>(responseList, pageable, bienBanKetLuanPage.getTotalElements());
    }

    public BienBanKetLuanResponse getBienBanKetLuanById(int id) {
        return bienBanKetLuanMapper.toBienBanKetLuanResponse(bienBanKetLuanRepository.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản kết luận")));
    }

    public BienBanKetLuanResponse createBienBanKetLuan(BienBanKetLuanCreateRequest request) {
        BienBanKetLuan bienBanKetLuan = bienBanKetLuanMapper.toBienBanKetLuan(request);
        BienBanHop bienBanHop = bienBanHopRepository.findById(request.getBienBanHopId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản họp"));
        bienBanKetLuan.setBienBanHop(bienBanHop);
        bienBanKetLuan.setNgayTao(LocalDateTime.now());

        return bienBanKetLuanMapper.toBienBanKetLuanResponse(bienBanKetLuanRepository.save(bienBanKetLuan));
    }

    public BienBanKetLuanResponse updateBienBanKetLuan(int id, BienBanKetLuanUpdateRequest request) {
        BienBanKetLuan bienBanKetLuan = bienBanKetLuanRepository.findByIdAndNgayXoaIsNull(id).orElseThrow(
                () -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản kết luận"));
        BienBanHop bienBanHop = bienBanHopRepository.findById(request.getBienBanHopId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản họp"));

        bienBanKetLuan.setBienBanHop(bienBanHop);
        bienBanKetLuan.setNgaySua(LocalDateTime.now());

        bienBanKetLuanMapper.upadteBienBanKetLuan(bienBanKetLuan, request);
        return bienBanKetLuanMapper.toBienBanKetLuanResponse(bienBanKetLuanRepository.save(bienBanKetLuan));
    }

    public void deleteBienBanKetLuan(int id) {
        BienBanKetLuan bienBanKetLuan = bienBanKetLuanRepository.findByIdAndNgayXoaIsNull(id).orElseThrow(
                () -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản kết luận"));

        bienBanKetLuan.setNgayXoa(LocalDateTime.now());
        bienBanKetLuanRepository.save(bienBanKetLuan);
    }


}
