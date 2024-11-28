package com.cloudbox.backend.file.controller;

import com.cloudbox.backend.common.argumentResolver.annotation.Login;
import com.cloudbox.backend.common.dto.MemberSessionDto;
import com.cloudbox.backend.common.dto.Response;
import com.cloudbox.backend.file.dto.response.FileDownloadResponse;
import com.cloudbox.backend.file.service.interfaces.command.FileCommandService;
import com.cloudbox.backend.file.service.interfaces.query.FileQueryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "파일 관리", description = "파일 관련 API")
public class FileController {

    private final FileCommandService fileCommandService;
    private final FileQueryService fileQueryService;

    @Operation(summary = "파일 업로드", description = "지정된 폴더에 파일을 업로드합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "파일 업로드 성공"),
    })
    @PostMapping(value = "/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response<?>> upload(@Parameter(description = "업로드할 파일 (form-data 형식으로 전송)") @RequestParam("file") MultipartFile uploadFile,
                                              @RequestParam(required = false) Long folderId,
                                              @Login MemberSessionDto memberSessionDto) {

        fileCommandService.createFile(memberSessionDto, uploadFile, folderId);

        return new ResponseEntity<>(Response.createResponseWithoutData(HttpServletResponse.SC_CREATED, "파일 업로드에 성공하였습니다."), HttpStatus.CREATED);
    }

    @Operation(summary = "파일 다운로드", description = "지정된 파일을 다운로드 합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "파일 다운로드 성공")
    })
    @GetMapping("/file/{fileId}")
    public ResponseEntity<InputStreamSource> downloadFile(@Login MemberSessionDto memberSessionDto, @Parameter(description = "다운로드할 파일의 고유 ID") @PathVariable Long fileId) {
        FileDownloadResponse fileDownloadResponse = fileQueryService.downloadFile(memberSessionDto, fileId);

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDownloadResponse.getFileName() + "\"")
                .body(fileDownloadResponse.getInputStreamSource());
    }

    @Operation(summary = "파일 삭제", description = "지정된 파일을 삭제합니다.\n" + "삭제하려는 파일의 ID를 경로 변수로 전달해야 합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "파일 삭제 성공")
    })
    @DeleteMapping("/file/{fileId}")
    public ResponseEntity<Response<?>> removeFile(@Login MemberSessionDto memberSessionDto,
                                                  @Parameter(description = "삭제할 파일의 고유 ID") @PathVariable Long fileId) {
        fileCommandService.deleteFile(memberSessionDto, fileId);

        return new ResponseEntity<>(Response.createResponseWithoutData(HttpServletResponse.SC_OK, "파일 삭제에 성공했습니다."), HttpStatus.OK);
    }
}
