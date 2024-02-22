import subprocess
import tempfile
import os


class RpiMethods:

    @staticmethod
    def perform(data):
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(data)
            licence_plate = subprocess.run('java -jar license_plate_script.jar ' + temp_file.name,
                                           capture_output=True, text=True).stdout.strip()

        os.remove(temp_file.name)
        return licence_plate
