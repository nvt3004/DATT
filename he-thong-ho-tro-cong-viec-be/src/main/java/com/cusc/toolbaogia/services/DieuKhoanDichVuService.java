package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.cusc.toolbaogia.dto.dieukhoan.request.DieuKhoanCreateResponse;
import com.cusc.toolbaogia.dto.dieukhoan.request.DieuKhoanUpdateResponse;
import com.cusc.toolbaogia.dto.dieukhoan.response.DieuKhoanResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.DieuKhoanBaoHanhMapper;
import com.cusc.toolbaogia.models.BaoHanh;
import com.cusc.toolbaogia.models.DieuKhoanBaoHanh;
import com.cusc.toolbaogia.repositories.BaoHanhJPA;
import com.cusc.toolbaogia.repositories.DieuKhoanBaoHanhJPA;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DieuKhoanDichVuService {
        @Autowired
        DieuKhoanBaoHanhJPA dieuKhoanBaoHanhJPA;
        @Autowired
        DieuKhoanBaoHanhMapper dieuKhoanBaoHanhMapper;
        @Autowired
        BaoHanhJPA baoHanhJPA;

        public PageImpl<DieuKhoanResponse> getAllDieuKhoan(int page, int size, String key, Integer idbaohanh) {
                List<DieuKhoanBaoHanh> listDieuKhoa = new ArrayList<>();
                List<DieuKhoanResponse> lDieuKhoanMaps = new ArrayList<>();
                if (idbaohanh != null) {
                        BaoHanh baoHanh = baoHanhJPA.findById(idbaohanh)
                                        .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
                        listDieuKhoa = dieuKhoanBaoHanhJPA.findAllByBaoHanhAndNgayXoaIsNull(baoHanh).stream()
                                        .filter(dieukhoan -> key != null
                                                        && (dieukhoan.getNoiDung().contains(key)
                                                                        || dieukhoan.getMoTa().contains(key)))
                                        .collect(Collectors.toList());

                        if (key == null) {
                                listDieuKhoa = dieuKhoanBaoHanhJPA.findAllByBaoHanhAndNgayXoaIsNull(baoHanh);
                        }
                } else {
                        listDieuKhoa = dieuKhoanBaoHanhJPA.findAllByNgayXoaIsNull().stream()
                                        .filter(dichvu -> key != null
                                                        && (dichvu.getNoiDung().contains(key)
                                                                        || dichvu.getMoTa().contains(key)))
                                        .collect(Collectors.toList());
                        if (key == null) {
                                listDieuKhoa = dieuKhoanBaoHanhJPA.findAllByNgayXoaIsNull();
                        }
                }

                lDieuKhoanMaps = listDieuKhoa.stream()
                                .map(dieukhoan -> dieuKhoanBaoHanhMapper.toKhoanResponse(dieukhoan))
                                .collect(Collectors.toList());
                int start = Math.min((page - 1) * size, lDieuKhoanMaps.size());
                int end = Math.min(page * size, lDieuKhoanMaps.size());

                PageImpl<DieuKhoanResponse> pageImpl = new PageImpl<>(lDieuKhoanMaps.subList(start, end),
                                PageRequest.of(page - 1, size, Sort.by(Direction.DESC, "id")),
                                lDieuKhoanMaps.size());
                return pageImpl;
        }

        public DieuKhoanResponse getDieuKhoan(Integer id) {
                DieuKhoanBaoHanh dieuKhoanBaoHanh = dieuKhoanBaoHanhJPA.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                                                "Điều khoản bảo hành"));
                return dieuKhoanBaoHanhMapper.toKhoanResponse(dieuKhoanBaoHanh);
        }

        public DieuKhoanResponse create(DieuKhoanCreateResponse dieuKhoan) {
                BaoHanh baoHanh = baoHanhJPA.findById(dieuKhoan.getBaoHanhId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
                DieuKhoanBaoHanh entity = new DieuKhoanBaoHanh();
                entity.setNgayTao(LocalDateTime.now());
                entity.setBaoHanh(baoHanh);
                entity.setNoiDung(dieuKhoan.getNoiDung());
                entity.setMoTa(dieuKhoan.getMoTa());
                return dieuKhoanBaoHanhMapper.toKhoanResponse(dieuKhoanBaoHanhJPA.save(entity));
        }

        public DieuKhoanResponse update(DieuKhoanUpdateResponse dieuKhoan) {
                DieuKhoanBaoHanh entity = dieuKhoanBaoHanhJPA.findById(dieuKhoan.getId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                                                "Điều khoản bảo hành"));
                BaoHanh baoHanh = baoHanhJPA.findById(dieuKhoan.getBaoHanhId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
                dieuKhoanBaoHanhMapper.toDieuKhoanUpdate(entity, dieuKhoan);
                entity.setNgaySua(LocalDateTime.now());
                entity.setBaoHanh(baoHanh);
                return dieuKhoanBaoHanhMapper.toKhoanResponse(dieuKhoanBaoHanhJPA.save(entity));
        }

        public void delete(Integer id) {
                DieuKhoanBaoHanh entity = dieuKhoanBaoHanhJPA.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                                                "Điều khoản bảo hành"));
                entity.setNgayXoa(LocalDateTime.now());
                dieuKhoanBaoHanhJPA.save(entity);
        }
}
