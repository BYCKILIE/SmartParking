import RPi.GPIO as GPIO
import cv2
import time


def load_library(mode):
    if mode == 'BOARD':
        GPIO.setmode(GPIO.BOARD)
    else:
        GPIO.setmode(GPIO.BCM)


def unload_library():
    GPIO.cleanup()


class Camera:

    def __init__(self, camera_index):
        self.fail = False
        self.camera_capture = cv2.VideoCapture(camera_index)
        self.camera_capture.set(cv2.CAP_PROP_FPS, 5)

        if not self.camera_capture.isOpened():
            self.fail = True

    def get_transfer_capture(self):
        ret = False
        while not ret:
            try:
                ret, frame = self.camera_capture.read()
                if not ret:
                    print("Failed to retrieve a frame. Retrying...")
            except cv2.error as e:
                print(f"OpenCV error: {e}")
                self.fail = True
                break

        _, frame_data = cv2.imencode('.png', frame)
        return frame_data

    def end_capture(self):
        self.camera_capture.release()


class DistanceSensor:
    
    def __init__(self, trig_pin, echo_pin):
        self.trig_pin = trig_pin
        self.echo_pin = echo_pin

        self.distance = 0

        GPIO.setup(trig_pin, GPIO.OUT)
        GPIO.setup(echo_pin, GPIO.IN)

    def read_distance(self):
        # Trigger pulse
        GPIO.output(self.trig_pin, True)
        time.sleep(0.00001)
        GPIO.output(self.trig_pin, False)

        # Measure time of pulse
        while GPIO.input(self.echo_pin) == 0:
            pulse_start_time = time.time()

        while GPIO.input(self.echo_pin) == 1:
            pulse_end_time = time.time()

        # Calculate distance in centimeters
        pulse_duration = pulse_end_time - pulse_start_time
        distance = pulse_duration * 17150
        distance = round(distance, 2)

        return distance


class MicroMotor:

    def __init__(self, en, in1, in2):
        GPIO.setmode(GPIO.BCM)
        self.motor_enable_pin = en
        self.motor_input1_pin = in1
        self.motor_input2_pin = in2

        GPIO.setup(self.motor_enable_pin, GPIO.OUT)
        GPIO.setup(self.motor_input1_pin, GPIO.OUT)
        GPIO.setup(self.motor_input2_pin, GPIO.OUT)

        GPIO.output(self.motor_enable_pin, GPIO.LOW)
        GPIO.output(self.motor_input1_pin, GPIO.LOW)
        GPIO.output(self.motor_input2_pin, GPIO.LOW)

    def forward(self):
        GPIO.output(self.motor_input1_pin, GPIO.HIGH)
        GPIO.output(self.motor_input2_pin, GPIO.LOW)
        GPIO.output(self.motor_enable_pin, GPIO.HIGH)

    def backward(self):
        GPIO.output(self.motor_input1_pin, GPIO.LOW)
        GPIO.output(self.motor_input2_pin, GPIO.HIGH)
        GPIO.output(self.motor_enable_pin, GPIO.HIGH)

    def stop(self):
        GPIO.output(self.motor_input1_pin, GPIO.LOW)
        GPIO.output(self.motor_input2_pin, GPIO.LOW)
        GPIO.output(self.motor_enable_pin, GPIO.LOW)


class InfraRed:
        
    def __init__(self, ir_pin):
        self.ir_pin = ir_pin
        GPIO.setup(ir_pin, GPIO.IN)

    def has_signal(self):
        return not GPIO.input(self.ir_pin)


class PullUpButton:
    def __init__(self, button_pin):
        self.button_pin = button_pin
        GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    def is_pressed(self):
        return GPIO.input(self.button_pin) == GPIO.LOW
    