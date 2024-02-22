import parking
import threading
from control import event_loop


barriers_pins = [
    {'role': 'INP01',
     'button_pin': 12,
     'ir_pin': 23,
     'motor_en': 4,
     'motor_in1': 26,
     'motor_in2': 18,
     'camera_index': 0
     },
        
    {'role': 'OUT01',
     'ir_pin': 24,
     'motor_en': 22,
     'motor_in1': 17,
     'motor_in2': 27,
     'camera_index': 2
     },
]


parking_slots_pins = {
    'L01': (5, 6, 25, 8, 7),
    'L02': (13, 19, 21, 16, 20),
}


def main():
    parking.init_parking()
    threads, barriers = [], []
    parking_state = parking.ParkingState(parking_slots_pins)

    for barrier in barriers_pins:
        barriers.append(parking.Barrier(barrier, parking_state))

    for barrier in barriers:
        threads.append(threading.Thread(target=barrier.run_loop, daemon=True))

    for th in threads:
        th.start()

    event_loop(barriers, parking_state)


if __name__ == '__main__':
    main()
