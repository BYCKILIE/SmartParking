import com.openalpr.jni.Alpr;
import com.openalpr.jni.AlprException;
import com.openalpr.jni.AlprResults;

public class RecognizeLicencePlate {
    private final Alpr alpr;

    public RecognizeLicencePlate() {
        alpr = new Alpr("eu", "C:\\Program Files\\openalpr_64\\openalpr.conf",
                "C:\\Program Files\\openalpr_64\\runtime_data");
    }

    public String run(byte[] matOfByte) throws AlprException {
        AlprResults results = alpr.recognize(matOfByte);
        if (results.getPlates().size() != 1) {
            return "skip";
        }
        return results.getPlates().get(0).getBestPlate().getCharacters();
    }

    void unload() {
        alpr.unload();
    }

}
