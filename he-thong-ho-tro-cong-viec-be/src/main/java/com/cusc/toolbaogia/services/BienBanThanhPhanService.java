package com.cusc.toolbaogia.services;

import com.cusc.toolbaogia.dto.bienbanthanhphan.request.BienBanThanhPhanRequest;
import com.cusc.toolbaogia.dto.bienbanthanhphan.response.BienBanThanhPhanResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.BienBanThanhPhanMapper;
import com.cusc.toolbaogia.models.BienBanHop;
import com.cusc.toolbaogia.models.BienBanThanhPhan;
import com.cusc.toolbaogia.models.NguoiDung;
import com.cusc.toolbaogia.repositories.BienBanHopJPA;
import com.cusc.toolbaogia.repositories.BienBanThanhPhanJPA;
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
public class BienBanThanhPhanService {
    BienBanThanhPhanJPA bienBanThanhPhanRepository;
    BienBanHopJPA bienBanHopRepository;
    NguoiDungJPA nguoiDungRepository;
    BienBanThanhPhanMapper bienBanThanhPhanMapper;

    public PageImpl<BienBanThanhPhanResponse> getAllBienBanThanhPhan(int page, int size) {
        if (page < 0 || size <= 0) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }
        Pageable pageable = PageRequest.of(page, size);
        Page<BienBanThanhPhan> bienBanThanhPhanPage = bienBanThanhPhanRepository.findAllByNgayXoaIsNullOrderByIdDesc(pageable);

        var responseList = bienBanThanhPhanPage.getContent().stream()
                .map(bienBanThanhPhan -> {
                    bienBanThanhPhan.setListBienBanNoiDung(
                            bienBanThanhPhan.getListBienBanNoiDung().stream()
                                    .filter(bienBanNoiDung -> bienBanNoiDung.getNgayXoa() == null)
                                    .collect(Collectors.toList())
                    );
                    return bienBanThanhPhanMapper.toBienBanThanhPhanResponse(bienBanThanhPhan);
                }).toList();

        return new PageImpl<>(responseList, pageable, bienBanThanhPhanPage.getTotalElements());
    }

    public BienBanThanhPhanResponse getBienBanThanhPhanById(int id) {
        BienBanThanhPhan bienBanThanhPhan = bienBanThanhPhanRepository.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản thành phần"));

        bienBanThanhPhan.setListBienBanNoiDung(
              bienBanThanhPhan.getListBienBanNoiDung().stream()
                      .filter(bienBanNoiDung -> bienBanNoiDung.getNgayXoa() == null)
                      .collect(Collectors.toList())
        );

        return bienBanThanhPhanMapper.toBienBanThanhPhanResponse(bienBanThanhPhan);
    }

    public BienBanThanhPhanResponse createBienBanThanhPhan(BienBanThanhPhanRequest request) {
        BienBanThanhPhan bienBanThanhPhan = new BienBanThanhPhan();

        bienBanThanhPhan.setBienBanHop(getBienBanHop(request.getBienBanHopId()));
        bienBanThanhPhan.setNgayTao(LocalDateTime.now());

        updateNguoiDungInfo(bienBanThanhPhan, request.getNguoiDungId(), request.getTen(), request.getDonvi(), request.getEmail());

        return bienBanThanhPhanMapper.toBienBanThanhPhanResponse(bienBanThanhPhanRepository.save(bienBanThanhPhan));
    }

    public BienBanThanhPhanResponse updateBienBanThanhPhan(int id, BienBanThanhPhanRequest request) {
        BienBanThanhPhan bienBanThanhPhan = bienBanThanhPhanRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản thành phần"));
        bienBanThanhPhan.setBienBanHop(getBienBanHop(request.getBienBanHopId()));
        bienBanThanhPhan.setNgayTao(LocalDateTime.now());

        updateNguoiDungInfo(bienBanThanhPhan, request.getNguoiDungId(), request.getTen(), request.getDonvi(), request.getEmail());

        return bienBanThanhPhanMapper.toBienBanThanhPhanResponse(bienBanThanhPhanRepository.save(bienBanThanhPhan));
    }

    public void deleteBienBanThanhPhan(int id) {
        BienBanThanhPhan bienBanThanhPhan = bienBanThanhPhanRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản thành phần"));

        bienBanThanhPhan.setNgayXoa(LocalDateTime.now());
        bienBanThanhPhanRepository.save(bienBanThanhPhan);
    }

    private BienBanHop getBienBanHop(int bienBanHopId) {
        return bienBanHopRepository.findById(bienBanHopId)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Biên bản họp"));
    }

    private void updateNguoiDungInfo(BienBanThanhPhan bienBanThanhPhan, int nguoiDungId, String ten, String donvi, String email) {
        if (nguoiDungId == 0) {
            bienBanThanhPhan.setTen(ten);
            bienBanThanhPhan.setDonvi(donvi);
            bienBanThanhPhan.setEmail(email);
            bienBanThanhPhan.setNguoiDung(null);
        } else {
            NguoiDung nguoiDung = nguoiDungRepository.findById(nguoiDungId)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Người dùng"));
            bienBanThanhPhan.setNguoiDung(nguoiDung);
            bienBanThanhPhan.setTen(nguoiDung.getTen());
            bienBanThanhPhan.setDonvi(nguoiDung.getDonvi());
            bienBanThanhPhan.setEmail(nguoiDung.getEmail());
        }
    }
}
