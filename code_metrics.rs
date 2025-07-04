use std::env;
use std::fs::File;
use std::io::{self, BufRead, BufReader};

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        eprintln!("Usage: cargo run -- <filename>");
        std::process::exit(1);
    }

    let filename = &args[1];
    let file = File::open(filename)?;
    let reader = BufReader::new(file);

    let mut lines = 0;
    let mut chars = 0;

    for line in reader.lines() {
        let line = line?;
        lines += 1;
        chars += line.chars().count();
    }

    println!("File: {}", filename);
    println!("Total lines: {}", lines);
    println!("Total characters: {}", chars);

    Ok(())
}
/* How to use:
Install Rust if you haven’t already: https://rustup.rs/
Run this in your project folder:
*/

rustc code_metrics.rs
./code_metrics <path-to-any-file>

// Or create a Cargo.toml and run via cargo run -- <filename> if you want to expand it later.
