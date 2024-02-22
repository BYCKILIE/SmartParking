import com.openalpr.jni.AlprException;

import java.nio.file.Files;
import java.nio.file.Paths;

public class Connector {

    public static void main(String[] args) {
        if (args.length > 0) {
            String filePath = args[0];
            try {
                byte[] frame = Files.readAllBytes(Paths.get(filePath));
                interact(frame);
            } catch (Exception e) {
                throw new RuntimeException();
            }
        } else {
            System.out.println("No file path provided.");
        }
    }

    private static void interact(byte[] frame) {
        RecognizeLicencePlate recognizeLicencePlate = new RecognizeLicencePlate();
        try {
            System.out.println(recognizeLicencePlate.run(frame));
        } catch (AlprException e) {
            throw new RuntimeException();
        } finally {
            recognizeLicencePlate.unload();
        }
    }
}
