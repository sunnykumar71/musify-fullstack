package in.sunny.musifyapi.document;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeId;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.annotation.Documented;

@Document(collection = "albums")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Album {

    @Id
    @JsonProperty("_id")
    private String id;

    private String name;
    private String desc;
    private String bgColour;
    private String imageUrl; // Cloudinary URL
}
