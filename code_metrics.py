import sys

def count_lines(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()
    print(f"File: {filepath}")
    print(f"Total lines: {len(lines)}")
    print(f"Non-empty lines: {len([line for line in lines if line.strip()])}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python code_metrics.py <filename>")
    else:
        count_lines(sys.argv[1])
