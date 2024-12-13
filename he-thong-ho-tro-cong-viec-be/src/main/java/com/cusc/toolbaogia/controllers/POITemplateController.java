package com.cusc.toolbaogia.controllers;

import com.cusc.toolbaogia.services.BaoGiaTemplateService;
import com.cusc.toolbaogia.services.POITemplateService;
import com.deepoove.poi.XWPFTemplate;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.OutputStream;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/cusc-quote/v1/word")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class POITemplateController {
    POITemplateService poiTemplateService;
    BaoGiaTemplateService baoGiaTemplateService;

    @GetMapping("/bienbanhop")
    public void downloadBienBanHop(HttpServletResponse response, int bienBanHopId) {
        try {
            XWPFTemplate document = poiTemplateService.generateBienBanHopWordXWPFTemplate(bienBanHopId);
            response.reset();
            response.setContentType("application/octet-stream");
            response.setHeader("Content-disposition",
                    "attachment;filename=user_word_" + System.currentTimeMillis() + ".docx");

            OutputStream os = response.getOutputStream();
            document.write(os);
            os.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/bangbaogia")
    public void downloadBangBaoGia(HttpServletResponse response, int baoGiaId) {
        try {
            XWPFTemplate document = baoGiaTemplateService.generateBaoGiaWordXWPFTemplate(baoGiaId);
            response.reset();
            response.setContentType("application/octet-stream");
            response.setHeader("Content-disposition",
                    "attachment;filename=user_word_" + System.currentTimeMillis() + ".docx");

            OutputStream os = response.getOutputStream();
            document.write(os);
            os.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
