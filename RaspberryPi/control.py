import parking
import requests
import time
import threading

RUN = True


def event_loop(barriers, parking_state):
    threading.Thread(target=cleanup, daemon=True)
    while True:
        command = input().split(' ')

        if command[0] == 'abort':
            parking.run_flag = False
            parking.free_parking()
            break
        elif command[0] == 'slot':
            slot_manager(parking_state.parking_slots[command[1]], command[2:])
        elif command[0] == 'barrier':
            for barrier in barriers:
                if barrier.id == command[1]:
                    barrier_manager(barrier, command[2:])
                    RUN = False
                    break


def cleanup():
    while RUN:
        requests.delete(parking.URL + 'cleanup/')
        time.sleep(30 * 60)


def slot_manager(slot: parking.ParkingSlot, command):
    if command[0] == 'open':
        if len(command) == 1:
            slot.open_slot()
        else:
            slot.move_slot('forward', float(command[1]))
    elif command[0] == 'close':
        if len(command) == 1:
            slot.close_slot()
        else:
            slot.move_slot('backward', float(command[1]))
    elif command[0] == 'distance':
        print('Distance:', slot.get_distance(), 'CM')
    elif command[0] == 'status':
        print('Occupied =', slot.is_ocupied())


def barrier_manager(barrier: parking.Barrier, command):
    if command[0] == 'perform':
        barrier.perform()
    elif command[0] == 'open':
        if len(command) == 1:
            barrier.open_barrier()
        else:
            barrier.open_barrier(float(command[1]))
    elif command[0] == 'close':
        if len(command) == 1:
            barrier.close_barrier()
        else:
            barrier.close_barrier(float(command[1]))
    elif command[0] == 'status':
        print('Obstacle:', barrier.get_ir_status())
