import time
import threading
import circuits
import requests

URL = 'http://172.20.10.2:8000/rpi/'

run_flag = True


def init_parking():
    circuits.load_library('BCM')


def free_parking():
    circuits.unload_library()


class ParkingSlot:

    def __init__(self, trig, echo, motor_en, motor_in1, motor_in2):
        self.distance_sensor = circuits.DistanceSensor(trig, echo)
        self.motor = circuits.MicroMotor(motor_en, motor_in1, motor_in2)

    def open_slot(self):
        self.motor.forward()
        time.sleep(0.6)
        self.motor.stop()

    def close_slot(self):
        self.motor.backward()
        time.sleep(0.6)
        self.motor.stop()

    def move_slot(self, direction, timeout):
        if direction == 'forward':
            self.motor.forward()
        elif direction == 'backward':
            self.motor.backward()
        time.sleep(timeout)
        self.motor.stop()
        
    def is_occupied(self):
        return self.distance_sensor.read_distance() < 9.0
    
    def get_distance(self):
        return self.distance_sensor.read_distance()


class ParkingState:

    def __init__(self, slots):
        self.parking_slots = {}

        for slot, pins in slots.items():
            self.parking_slots[slot] = ParkingSlot(pins[0], pins[1], pins[2], pins[3], pins[4])
            
        print(f'Successfully connected the parking slots')

    def open_slot(self, slot):
        threading.Thread(target=self.parking_slots[slot].open_slot, daemon=True).start()
        self.timeout(slot, 20)

    def close_slot(self, slot):
        threading.Thread(target=self.parking_slots[slot].close_slot, daemon=True).start()
    
    def timeout(self, slot, sec):
        threading.Thread(target=self.timeout_util, args=(slot, sec), daemon=True).start()

    def timeout_util(self, slot, sec):
        time.sleep(sec)
        self.exit_loop(slot)

    def exit_loop(self, slot):
        def exit_loop_util():
            while self.parking_slots[slot].is_occupied():
                time.sleep(1)
            time.sleep(3)
            self.parking_slots[slot].close_slot()
            self.mark_slot(slot)
        threading.Thread(target=exit_loop_util, daemon=True).start()

    def mark_slot(self, slot):
        requests.put(URL + 'free-slot/', data=slot.encode())


class Barrier:
    
    def __init__(self, pins, parking_state: ParkingState=None):
        self.parking_state = parking_state
        self.flags = {}
        self.id = pins['role']
        self.mode = 'entry/' if pins['role'][:3] == 'INP' else 'leave/'

        if pins['role'][:3] == 'INP':
            self.button = circuits.PullUpButton(pins['button_pin'])
            self.flags['button'] = False
        self.ir_sensor = circuits.InfraRed(pins['ir_pin'])
        self.micro_motor = circuits.MicroMotor(pins['motor_en'], pins['motor_in1'], pins['motor_in2'])
        self.flags['barrier'] = False

        self.camera = circuits.Camera(pins['camera_index'])
        if self.camera.fail:
            print('Error: could not open the camera')
            return
        print(f'Successfully connected the ' + pins['role'] + ' camera')

    def run_loop(self):
        try:
            while run_flag:
                frame_data = self.camera.get_transfer_capture().tobytes()

                if self.id[:3] == 'INP':
                    if self.button.is_pressed() and not self.flags['button']:
                        self.delay('button', 3)
                    if (self.flags['button']):
                        status = self.get_image_status(frame_data)
                        if 'OK' in status.keys():
                            if not self.flags['barrier']:
                                self.perform()
                                self.parking_state.open_slot(status['OK'])
                elif self.id[:3] == 'OUT':
                    status = self.get_image_status(frame_data)
                    if status['status'] == 'OK':
                        if not self.flags['barrier']:
                            self.perform()
        except (Exception, KeyboardInterrupt) as e:
            print(e)
        finally:
            print('Camera disconnected', self.id)
            self.camera.end_capture()

    def get_image_status(self, data):
            response = requests.post(URL + self.mode, data=data, headers={'Content-Type': 'application/octet-stream'})
            return response.json()
    
    def perform(self):
        self.flags['barrier'] = True
        threading.Thread(target=self.perform_util, daemon=True).start()

    def perform_util(self):
        self.micro_motor.forward()
        time.sleep(1)
        self.micro_motor.stop()
        while True:
            if self.ir_sensor.has_signal():
                break
        temp = 0
        while True:
            if not self.ir_sensor.has_signal():
                temp += 1
                time.sleep(0.2)
            else:
                temp = 0
            if temp == 7:
                break
        self.micro_motor.backward()
        time.sleep(1)
        self.micro_motor.stop()
        self.flags['barrier'] = False

    def open_barrier(self, timeout=1):
        self.micro_motor.forward()
        time.sleep(timeout)
        self.micro_motor.stop()

    def close_barrier(self, timeout=1):
        self.micro_motor.backward()
        time.sleep(timeout)
        self.micro_motor.stop()

    def get_ir_status(self):
        return self.ir_sensor.has_signal()
    
    def delay(self, flag, sec):
        self.flags[flag] = True
        threading.Thread(target=self.delay_util, args=(flag, sec), daemon=True).start()

    def delay_util(self, flag, sec):
        time.sleep(sec)
        self.flags[flag] = False
