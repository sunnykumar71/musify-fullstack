package in.sunny.musifyapi;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.sunny.musifyapi.document.Album;
import in.sunny.musifyapi.dto.AlbumListResponse;
import in.sunny.musifyapi.dto.AlbumRequest;
import in.sunny.musifyapi.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final Cloudinary cloudinary;

    public Album addAlbum(AlbumRequest request) throws IOException {
        if (request.getImageFile() == null || request.getImageFile().isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }

        Map<String, Object> imageUploadResult;
        try {
            imageUploadResult = cloudinary.uploader().upload(request.getImageFile().getBytes(), ObjectUtils.asMap("resource_type", "image"));
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image to Cloudinary", e);
        }

        Album newAlbum = Album.builder()
                .name(request.getName())
                .desc(request.getDesc())
                .bgColour(request.getBgColor())
                .imageUrl(imageUploadResult.get("secure_url").toString())
                .build();

        return albumRepository.save(newAlbum);
    }

    public AlbumListResponse getAllAlbums(){
        return new AlbumListResponse(true, albumRepository.findAll());
    }

    public Boolean removeAlbum(String id){
        Album existingAlbum=albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Album not found"));
        albumRepository.delete(existingAlbum);
        return true;
    }

}

