package com.cusc.toolbaogia.services;

import com.cusc.toolbaogia.dto.request.PTThanhToanCreationRequest;
import com.cusc.toolbaogia.dto.request.PTThanhToanUpdateRequest;
import com.cusc.toolbaogia.dto.response.PTThanhToanResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.PTThanhToanMapper;
import com.cusc.toolbaogia.models.PhuongThucThanhToan;
import com.cusc.toolbaogia.repositories.PhuongThucThanhToanJPA;
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
public class PTThanhToanService {
    PhuongThucThanhToanJPA pTThanhToanRepository;
    PTThanhToanMapper pTThanhToanMapper;

    public PageImpl<PTThanhToanResponse> getAllPTThanhToan(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PhuongThucThanhToan> pTTHanhToan = pTThanhToanRepository.findAllByNgayXoaIsNull(pageable);

        var responseList = pTTHanhToan.getContent().stream()
                .map(pTThanhToanMapper::toPTThanhToanResponse).toList();
        return new PageImpl<>(responseList, pageable, pTTHanhToan.getTotalElements());
    }

    public PTThanhToanResponse getPTThanhToanById(int id) {
        return pTThanhToanMapper.toPTThanhToanResponse(pTThanhToanRepository.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Phương thức thanh toán")));
    }

    public PTThanhToanResponse createPTThanhToan(PTThanhToanCreationRequest request){
        PhuongThucThanhToan phuongThucThanhToan = pTThanhToanMapper.toPhuongThucThanhToan(request);
        phuongThucThanhToan.setNgayTao(LocalDateTime.now());
        phuongThucThanhToan = pTThanhToanRepository.save(phuongThucThanhToan);
        return pTThanhToanMapper.toPTThanhToanResponse(phuongThucThanhToan);
    }

    public PTThanhToanResponse updatePTThanhToan(int id, PTThanhToanUpdateRequest request){
        PhuongThucThanhToan phuongThucThanhToan = pTThanhToanRepository.findByIdAndNgayXoaIsNull(id).orElseThrow(
                () -> new AppException(ErrorCode.OBJECT_EXISTED, "Phương thức thanh toán")
        );
        phuongThucThanhToan.setNgaySua(LocalDateTime.now());
        pTThanhToanMapper.updatePTThanhToan(phuongThucThanhToan, request);
        return pTThanhToanMapper.toPTThanhToanResponse(pTThanhToanRepository.save(phuongThucThanhToan));
    }

    public void deleteBienBanHop(int id) {
        PhuongThucThanhToan phuongThucThanhToan = pTThanhToanRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_EXISTED, "Phương thức thanh toán"));

        phuongThucThanhToan.setNgayXoa(LocalDateTime.now());
        pTThanhToanRepository.save(phuongThucThanhToan);
    }
}
