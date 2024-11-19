package com.cloudbox.backend.file.service.impl;

import com.cloudbox.backend.common.dto.MemberSessionDto;
import com.cloudbox.backend.file.domain.File;
import com.cloudbox.backend.file.dto.response.FileDownloadResponse;
import com.cloudbox.backend.file.service.interfaces.command.FileCommandService;
import com.cloudbox.backend.file.service.interfaces.query.FileQueryService;
import com.cloudbox.backend.file.service.interfaces.query.FolderQueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class S3StorageService {

    private final S3Client s3Client;
    private final FileCommandService fileCommandService;
    private final FileQueryService fileQueryService;

    private final FolderQueryService folderQueryService;


    @Value("${aws.bucket-name}")
    private String bucketName;
    
    public Long fileUpload(MemberSessionDto memberSessionDto, MultipartFile uploadFile, Long folderId) {
//        String fullFolderPath = folderQueryService.getFullFolderPathById(folderId);

        String savedRealFilePath = memberSessionDto.getUsername() + "/" + UUID.randomUUID().toString() + uploadFile.getOriginalFilename();

        Long savedFileId = fileCommandService.createFile(memberSessionDto, uploadFile.getOriginalFilename(), savedRealFilePath, folderId);

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(savedRealFilePath)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(uploadFile.getBytes()));

            log.debug("파일 업로드 성공: fileId={}", savedFileId);

            return savedFileId;

        } catch (IOException e) {
            throw new RuntimeException("Error reading file data", e);
        }
    }

    @Transactional(readOnly = true)
    public FileDownloadResponse downloadFile(Long fileId) {
        File file = fileQueryService.getFileEntityById(fileId);

        try {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(file.getFilePath())
                    .build();

            ResponseInputStream<GetObjectResponse> s3Object = s3Client.getObject(getObjectRequest);

            return new FileDownloadResponse(new InputStreamResource(s3Object), file.getFileName());

        } catch (S3Exception e) {
            throw new RuntimeException("다운로드 중 에러가 발생했습니다.", e);
        }
    }
}
