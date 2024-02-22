import circuits
import time

circuits.load_library('BCM')

motor_pins = (
    (4, 26, 18),
    (22, 17, 27),
    (25, 8, 7),
    (21, 16, 20)
)

m1 = circuits.MicroMotor(motor_pins[0][0], motor_pins[0][1], motor_pins[0][2])
m2 = circuits.MicroMotor(motor_pins[1][0], motor_pins[1][1], motor_pins[1][2])
m3 = circuits.MicroMotor(motor_pins[2][0], motor_pins[2][1], motor_pins[2][2])
m4 = circuits.MicroMotor(motor_pins[3][0], motor_pins[3][1], motor_pins[3][2])

# x = circuits.DistanceSensor(5, 6)
# y = circuits.DistanceSensor(13, 19)

# try:
#     while True:
#         print(x.read_distance())
#         print(y.read_distance())
#         time.sleep(1)
# except KeyboardInterrupt:
#     pass

# m1.backward()

# time.sleep(0.3)
# m2.backward()

# time.sleep(0.3)

# m1.stop()

circuits.unload_library()
