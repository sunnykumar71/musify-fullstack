package in.sunny.musifyapi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.sunny.musifyapi.document.Song;
import in.sunny.musifyapi.dto.SongListResponse;
import in.sunny.musifyapi.dto.SongRequest;
import in.sunny.musifyapi.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;
    private final Cloudinary cloudinary;

    public Song addSong(SongRequest request) throws IOException {
        Map<String, Object>  audioUploadResult=cloudinary.uploader().upload(request.getAudioFile().getBytes(), ObjectUtils.asMap("resource_type", "auto"));
        Map<String, Object> imageUploadResult=cloudinary.uploader().upload(request.getImageFile().getBytes(),ObjectUtils.asMap("resource_type", "image"));

        Double durationSeconds=(Double)audioUploadResult.get("duration");
        String duration=formatDuration(durationSeconds);

        Song newSong = Song.builder()
                .name(request.getName())
                .desc(request.getDesc())
                .album(request.getAlbum())
                .image(imageUploadResult.get("secure_url").toString())
                .file(audioUploadResult.get("secure_url").toString())
                .duration(duration)
                .build();

        return songRepository.save(newSong);
    }

    private String formatDuration(Double durationSeconds)
    {
        if(durationSeconds==null)
        {
            return "0:00";
        }

        int minutes=(int)(durationSeconds/60);
        int seconds=(int)(durationSeconds%60);

        return String.format("%d:%02d", minutes, seconds);
    }


    public SongListResponse getAllSongs(){
        return new SongListResponse(true, songRepository.findAll());
    }


    public Boolean removeSong(String id){
        Song existingSong=songRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("SOng not Found"));
        songRepository.delete(existingSong);
        return true;
    }

}
