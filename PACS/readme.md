# PACS (Portable Accessories for CorpusSearch)
## A browser-based graphical interface for running CorpusSearch 2 queries on Penn-style parsed corpora. 
<img width="144" height="108" alt="a dove with the letters PACS" src="https://github.com/user-attachments/assets/f9516edd-adbe-4406-90f2-f967bb52fdf0" />

### PACS [pæks] adds the following features to CorpusSearch 2:

- queries can be typed, and results displayed, in a web browser
- nodes in results trees can be color coded 
- before the SUMMARY, every hit is repeated, showing only the queried nodes
- texts in the SUMMARY with hits are highlighted yellow 
- a window in PACS can strip lemmata from results sentences 

### PACS currently exists in three versions: 
- PACS_arm64 is a package that runs on Macs with arm64.
- PACS_unpackaged should work on a variety of machines, but is difficult to install 
- PACS_lite requires a bit more clicking to operate, but should work on a variety of machines (has been tested on Macs with x64 architecture)

To determine your architecture, open Terminal and enter `uname -m` 
