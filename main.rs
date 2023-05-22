#![no_main]
type Pixel = [u8; 4];


struct Video {
    src: String,
    data: Vec<u8>,
    pixels: Pixel
}

impl Video {
    const fn new() -> Self {
        Video {
            src: String::new(),
            data: Vec::new(),
            pixels: [0, 0, 0, 255]
        }
    }
}

static mut VIDEO: Video = Video::new();

#[no_mangle]
fn init(src: &str) {
    unsafe {
        VIDEO.data = src.as_bytes().to_vec();
    }
}

#[no_mangle]
pub extern "C" fn getSize() -> [usize; 2] {
    unsafe {
        [1920, 1080]
    }
}
