# PACS (Portable Accessories for CorpusSearch)
## (unpackaged version)
Note: This is the unpackaged version, which is being tested on Macs with x64 architecture and on a PC running Linux Mint. If you have Mac arm64, you may wish to try the packaged version instead.

## A browser-based graphical interface for running CorpusSearch 2 queries on Penn-style parsed corpora. 

PACS adds the following features to CorpusSearch 2:

- nodes in results trees can be color coded (c. below)
- before the SUMMARY, every hit is repeated only the queried nodes
- texts in the SUMMARY with hits are highlighted yellow 
- a window in PACS can strip lemmata from results sentences (f. below)

### 1.	Prerequisites
a. Install CorpusSearch2 (CS2) https://corpussearch.sourceforge.net/CS.html
   - CS2 requires Java.
    
### 2.	Getting Started  

a. Copying the Files
   - Copy the PACS_unpackaged folder onto your local machine (click "<> Code", then "Download ZIP", then move the PACS_unpackaged folder to a convenient location).
   - In that folder, create a folder called "corpus" and copy the files of the Penn-style corpus you wish to search into the corpus folder.
   - If your corpus files are not .txt (likely .psd), open the file "search" in TextEdit. Locate this line and change .txt at the end to match the file types of your corpus: `java -classpath /Applications/CS_2.003.04.jar csearch/CorpusSearch cs.q *.txt`

b. Create an Automator .app (Read step 8 first!) 
   1. Open Automator. (You can do this from Launchpad by typing “Automator”. Its icon appears to be a robot holding a pipe.)
   2. Under “Choose a type for your document”, select “Application”.
   3. In the long list in the second column, find “Run Shell Script”.
   4. Click-and-drag “Run Shell Script” into the grey area that contains the text “Drag actions or files here to build your workflow”.
   5. In the newly-created “Run Shell Script” box, change the Shell from `/bin/zsh` to `/bin/bash`.
   6. Replace `cat` with `open -a Terminal` followed by the file path of your copied PACS folder and finally PACS. For example, on my computer it is: `open -a Terminal Documents/Utilities/PACS/PACS`
   7. Save (or Export) the workflow, for example as `PACS.app` in the PACS folder.
   8. As an alternative to steps ii-vii, you can open the existing PACS.app in Automator and edit the file path for your local PACS folder.
   - Note: You can change the PACS.app icon. Copy the picture that you wish to use, such as the provided icon.png. Then right-click on PACS.app, click on “Get Info”, click on the image in the top-left corner, and paste.

### 3.	Running PACS
a. Double-click PACS.app. This should launch PACS in Google Chrome. If it does not, or if you wish to use a different browser, go to localhost:3001 in the browser.

b. The interface looks like this:
 <img width="431" height="186" alt="Picture1" src="https://github.com/user-attachments/assets/1e2352ec-1cfc-436c-9794-d4b5ebfcebcc" />
 
c. Enter your CorpusSearch2 query in the top-right box.

   - For example, if you wish to find every instance of a noun phrase inside a noun phrase inside a noun phrase, you can use this query:
`query: ([1]NP* idoms [2]NP*) AND ([2]NP* idoms [3]NP*)`
   - If you wish to have your results color-coded, include numbers in curly brackets, e.g. {1}. Note that curly brackets precede square brackets, hence the reminder in the default text.
`query: ({1}[1]NP* idoms {2}[2]NP*) AND ([2]NP* idoms {3}[3]NP*)`

d.	Click “Search”. Once the search is complete, the results will display in the large box.

e.	The “Download” button will save the results in your PACS folder as "cs_saved#.html. It is plain text but can be opened in a browser if you want to see the color coding.

f.	If you want to copy a sentence from the results, stripping the lemmata, first copy it into the middle box. Click the appropriate “Show” button. (IPCHG lemmatizes with “=”; IcePaHC lemmatizes with “-”.) This creates a copy-able version of the sentence in the lower-right box. 

### 4.	Closing PACS
a.	Click on “Exit”.

