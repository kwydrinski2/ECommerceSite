import pandas as pd

df = pd.read_csv("dataset.csv", encoding="utf-8", error_bad_lines=False)
df.to_csv("clean_songs.csv", index=False, quoting=1)  # quoting=1 => always quote