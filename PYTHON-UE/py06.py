#!/usr/bin/env python3

#Author: Christopher Wegl

import threading, time
# b) Multithreading:
#    Create a class to simulate concurrent "downloading of x files with the size of y MB each"
#    return the final amount of MB downloaded.
#    REQUIRED: a thread for each download,
#              (concurrent) waiting 2 secs for each download
#              locking when accessing common memory



def startup(no_of_concurrent_downloads,mb):
#### START of my CODE ####
    downloaded = Downloaded()
    lock = threading.Lock()

    for i in range(0, no_of_concurrent_downloads):
        download = Download(mb, lock, downloaded)
        download.start()

    for i in range(0, no_of_concurrent_downloads):
        download.join()

    return "Downloaded {} MB.".format(downloaded.value)


class Downloaded():
    value = 0

class Download(threading.Thread):
    def __init__(self, mb, lock, downloaded):
        threading.Thread.__init__(self)
        self.mb = mb
        self.lock = lock
        self.downloaded = downloaded

    def run(self):
        self.download()

    def download(self):
        time.sleep(2)
        self.lock.acquire()
        value = self.downloaded.value
        self.downloaded.value = value + self.mb
        self.lock.release()



#### END of my CODE ####


# Just for testing:

# (the moodle-"evaluate" might  use different test data set!)

print('\nTEST "concurrency":')
print( startup(33,3) )
