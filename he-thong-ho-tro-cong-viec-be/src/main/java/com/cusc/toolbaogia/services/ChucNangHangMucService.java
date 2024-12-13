package com.cusc.toolbaogia.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.chucnanghangmuc.request.ChucNangHangMucCreateRequest;
import com.cusc.toolbaogia.dto.chucnanghangmuc.request.ChucNangHangMucDeleteRequest;
import com.cusc.toolbaogia.dto.chucnanghangmuc.request.ChucNangHangMucUpdateRequest;
import com.cusc.toolbaogia.dto.chucnanghangmuc.response.ChucNangHangMucResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.ChucNangHangMucMapper;
import com.cusc.toolbaogia.models.BaoGia;
import com.cusc.toolbaogia.models.ChucNang;
import com.cusc.toolbaogia.models.ChucNangHangMuc;
import com.cusc.toolbaogia.models.HangMuc;
import com.cusc.toolbaogia.models.NhomChucNang;
import com.cusc.toolbaogia.models.SanPham;
import com.cusc.toolbaogia.repositories.BaoGiaJPA;
import com.cusc.toolbaogia.repositories.ChucNangHangMucJPA;
import com.cusc.toolbaogia.repositories.ChucNangJPA;
import com.cusc.toolbaogia.repositories.HangMucJPA;
import com.cusc.toolbaogia.repositories.NhomChucNangJPA;
import com.cusc.toolbaogia.repositories.SanPhamJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

@Service
public class ChucNangHangMucService {

        @Autowired
        private ChucNangHangMucJPA chucNangHangMucJPA;

        @Autowired
        private ChucNangHangMucMapper chucNangHangMucMapper;

        @Autowired
        private BaoGiaJPA baoGiaJPA;

        @Autowired
        private SanPhamJPA sanPhamJPA;

        @Autowired
        private HangMucJPA hangMucJPA;

        @Autowired
        private NhomChucNangJPA nhomChucNangJPA;

        @Autowired
        private ChucNangJPA chucNangJPA;

        @Transactional
        public List<ChucNangHangMucResponse> createChucNangHangMuc(ChucNangHangMucCreateRequest request) {
                List<ChucNangHangMucResponse> responseList = new ArrayList<>();
                if (request.getChucNangId() == null) {
                        ChucNangHangMuc chucNangHangMuc = chucNangHangMucMapper.toChucNangHangMuc(request);
                        HangMuc hangMuc = hangMucJPA.findByIdAndNgayXoaIsNull(request.getHangMucId()).get();
                        System.out.println("tim thay hang muc");
                        chucNangHangMuc.setHangMuc(hangMuc);
                        chucNangHangMuc.setGia(hangMuc.getGia());
                        chucNangHangMuc.setNhomChucNang(null);
                        chucNangHangMucJPA.save(chucNangHangMuc);
                        chucNangHangMuc.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
                        responseList.add(chucNangHangMucMapper.toChucNangHangMucResponse(chucNangHangMuc));
                } else {
                        for (Integer chucNangId : request.getChucNangId()) {
                                ChucNangHangMuc chucNangHangMuc = chucNangHangMucMapper.toChucNangHangMuc(request);
                                ChucNang chucNang = chucNangJPA.findById(chucNangId).get();
                                chucNangHangMuc.setChucNang(chucNang);
                                chucNangHangMuc.setGia(chucNang.getGia());
                                chucNangHangMucJPA.save(chucNangHangMuc);
                                chucNangHangMuc.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
                                responseList.add(chucNangHangMucMapper.toChucNangHangMucResponse(chucNangHangMuc));
                        }
                }

                return responseList;
        }

        @Transactional
        public ChucNangHangMucResponse updateChucNangHangMuc(ChucNangHangMucUpdateRequest request) {
                ChucNangHangMuc chucNangHangMuc = chucNangHangMucJPA.findById(request.getId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                                                "Chức năng hạng mục"));

                BaoGia baoGia = baoGiaJPA.findById(request.getBaoGiaId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));
                chucNangHangMuc.setBaoGia(baoGia);

                SanPham sanPham = sanPhamJPA.findById(request.getSanPhamId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm"));
                chucNangHangMuc.setSanPham(sanPham);

                HangMuc hangMuc = hangMucJPA.findById(request.getHangMucId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Hạng mục"));
                chucNangHangMuc.setHangMuc(hangMuc);

                NhomChucNang nhomChucNang = nhomChucNangJPA.findById(request.getNhomChucNangId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm chức năng"));
                chucNangHangMuc.setNhomChucNang(nhomChucNang);

                ChucNang chucNang = chucNangJPA.findById(request.getChucNangId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Chức năng"));
                chucNangHangMuc.setChucNang(chucNang);

                chucNangHangMucMapper.updateChucNangHangMuc(chucNangHangMuc, request);
                chucNangHangMuc.setNgaySua(CurrentDateVietnam.getCurrentDateTime());

                chucNangHangMucJPA.save(chucNangHangMuc);
                return chucNangHangMucMapper.toChucNangHangMucResponse(chucNangHangMuc);
        }

        @Transactional
        public void deleteChucNangHangMucByList(ChucNangHangMucDeleteRequest request) {
                for (Integer id : request.getIds()) {
                        ChucNangHangMuc chucNangHangMuc = chucNangHangMucJPA.findById(id)
                                        .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                                                        "Chức năng hạng mục"));
                        chucNangHangMuc.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
                        chucNangHangMucJPA.save(chucNangHangMuc);
                }
        }

        @Transactional
        public void deleteChucNangHangMucById(int id) {
                ChucNangHangMuc chucNangHangMuc = chucNangHangMucJPA.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                                                "Chức năng hạng mục"));
                chucNangHangMuc.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
                chucNangHangMucJPA.save(chucNangHangMuc);
        }

        public PageImpl<ChucNangHangMucResponse> getAllChucNangHangMuc(int page, int size) {
                Pageable pageable = PageRequest.of(page - 1, size);
                Page<ChucNangHangMuc> chucNangHangMucPage = chucNangHangMucJPA
                                .findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);
                List<ChucNangHangMucResponse> responseList = chucNangHangMucPage.getContent().stream()
                                .map(chucNangHangMucMapper::toChucNangHangMucResponse)
                                .collect(Collectors.toList());
                return new PageImpl<>(responseList, pageable, chucNangHangMucPage.getTotalElements());
        }

        public ChucNangHangMucResponse getChucNangHangMucById(int id) {
                ChucNangHangMuc chucNangHangMuc = chucNangHangMucJPA.findByIdAndNgayXoaIsNull(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                                                "Chức năng hạng mục"));
                return chucNangHangMucMapper.toChucNangHangMucResponse(chucNangHangMuc);
        }
}
