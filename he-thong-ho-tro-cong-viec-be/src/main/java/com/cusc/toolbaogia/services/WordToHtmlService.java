package com.cusc.toolbaogia.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.aspose.words.*;

import java.io.*;

@Service
@RequiredArgsConstructor
public class WordToHtmlService {

    private final POITemplateService poiTemplateService;


    public String convertWordToHtml(int bienBanHopId) throws Exception {
        var template = poiTemplateService.generateBienBanHopWordXWPFTemplate(bienBanHopId);

        File tempFile = File.createTempFile("bienbanhop", ".docx");
        try (OutputStream os = new FileOutputStream(tempFile)) {
            template.write(os);
        }

        Document doc = new Document(tempFile.getAbsolutePath());
        ByteArrayOutputStream htmlStream = new ByteArrayOutputStream();
        try {
            doc.save(htmlStream, SaveFormat.HTML);
            return htmlStream.toString("UTF-8");
        } finally {
            htmlStream.close();
            tempFile.delete();
        }
    }
}
