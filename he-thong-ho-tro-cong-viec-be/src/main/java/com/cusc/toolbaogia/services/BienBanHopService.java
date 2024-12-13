package com.cusc.toolbaogia.services;

import com.cusc.toolbaogia.dto.bienbanhop.request.BienBanHopRequest;
import com.cusc.toolbaogia.dto.bienbanhop.response.BienBanHopResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.BienBanHopMapper;
import com.cusc.toolbaogia.models.BienBanHop;
import com.cusc.toolbaogia.models.NguoiDung;
import com.cusc.toolbaogia.repositories.BienBanHopJPA;
import com.cusc.toolbaogia.repositories.NguoiDungJPA;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BienBanHopService {
    BienBanHopJPA bienBanHopRepository;
    BienBanHopMapper bienBanHopMapper;
    NguoiDungJPA nguoiDungRepository;

    public PageImpl<BienBanHopResponse> getAllBienBanHop(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<BienBanHop> bienBanHopPage = bienBanHopRepository.findAllByNgayXoaIsNullOrderByIdDesc(pageable);

        var responseList = bienBanHopPage.getContent().stream()
                .distinct()
                .map(bienBanHop -> {
                    bienBanHop.setListBienBanThanhPhan(
                            bienBanHop.getListBienBanThanhPhan().stream()
                                    .filter(bienBanThanhPhan -> bienBanThanhPhan.getNgayXoa() == null)
                                    .map(bienBanThanhPhan -> {
                                        bienBanThanhPhan.setListBienBanNoiDung(
                                                bienBanThanhPhan.getListBienBanNoiDung().stream()
                                                        .filter(bienBanNoiDung -> bienBanNoiDung.getNgayXoa() == null)
                                                        .collect(Collectors.toList())
                                        );
                                        return bienBanThanhPhan;
                                    })
                                    .collect(Collectors.toList())
                    );

                    bienBanHop.setListBienBanKetLuan(
                            bienBanHop.getListBienBanKetLuan().stream()
                                    .filter(bienBanKetLuan -> bienBanKetLuan.getNgayXoa() == null)
                                    .collect(Collectors.toList())
                    );
                    return bienBanHopMapper.toBienBanHopResponse(bienBanHop);
                })
                .distinct()
                .toList();
        return new PageImpl<>(responseList, pageable, bienBanHopPage.getTotalElements());
    }

    public BienBanHopResponse getBienBanHopById(int id) {
        BienBanHop bienBanHop = bienBanHopRepository.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                        "Biên bản họp"));

        bienBanHop.setListBienBanThanhPhan(
                bienBanHop.getListBienBanThanhPhan().stream()
                        .filter(bienBanThanhPhan -> bienBanThanhPhan.getNgayXoa() == null)
                        .map(bienBanThanhPhan -> {
                            bienBanThanhPhan.setListBienBanNoiDung(
                                    bienBanThanhPhan.getListBienBanNoiDung().stream()
                                            .filter(bienBanNoiDung -> bienBanNoiDung.getNgayXoa() == null)
                                            .collect(Collectors.toList())
                            );
                            return bienBanThanhPhan;
                        })
                        .collect(Collectors.toList())
        );

        bienBanHop.setListBienBanKetLuan(
                bienBanHop.getListBienBanKetLuan().stream()
                        .filter(bienBanKetLuan -> bienBanKetLuan.getNgayXoa() == null)
                        .collect(Collectors.toList())
        );
        return bienBanHopMapper.toBienBanHopResponse(bienBanHop);
    }

    public BienBanHopResponse createBienBanHop(BienBanHopRequest request) {
        BienBanHop bienBanHop = bienBanHopMapper.toBienBanHop(request);
        NguoiDung nguoiDung = nguoiDungRepository.findById(request.getNguoiDungId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Người dùng"));
        bienBanHop.setNguoiDung(nguoiDung);
        bienBanHop.setNgayTao(LocalDateTime.now());

        return bienBanHopMapper.toBienBanHopResponse(bienBanHopRepository.save(bienBanHop));
    }


    public BienBanHopResponse updateBienBanHop(int id, BienBanHopRequest request) {
        BienBanHop bienBanHop = bienBanHopRepository.findByIdAndNgayXoaIsNull(id).orElseThrow(() -> new AppException(
                ErrorCode.OBJECT_NOT_EXISTED, "Biên bản họp"
        ));
        NguoiDung nguoiDung = nguoiDungRepository.findById(request.getNguoiDungId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Người dùng"));
        bienBanHop.setNguoiDung(nguoiDung);
        bienBanHop.setNgaySua(LocalDateTime.now());

        bienBanHopMapper.upadteBienBanHop(bienBanHop, request);
        return bienBanHopMapper.toBienBanHopResponse(bienBanHopRepository.save(bienBanHop));
    }

    public void deleteBienBanHop(int id) {
        BienBanHop bienBanHop = bienBanHopRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản họp"));

        bienBanHop.setNgayXoa(LocalDateTime.now());
        bienBanHopRepository.save(bienBanHop);
    }
}
