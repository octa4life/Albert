"""Convertit tous les PNG/JPG de assets/images en WebP (qualité 82).  Usage : python tools/to-webp.py"""
from pathlib import Path
from PIL import Image
for f in Path(__file__).resolve().parent.parent.joinpath("assets/images").glob("*"):
    if f.suffix.lower() in (".png", ".jpg", ".jpeg"):
        im = Image.open(f); im.thumbnail((1600, 1600))
        im.save(f.with_suffix(".webp"), "WEBP", quality=82, method=6); print("OK", f.name)
