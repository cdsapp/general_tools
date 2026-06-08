# Portable Accessories for CorpusSearch2 _Lite_, version02 (PACS_lite02)
## A browser-based graphical interface for running CorpusSearch 2 queries on Penn-style parsed corpora. 
<img width="144" height="108" alt="a dove with the letters PACS" src="https://github.com/user-attachments/assets/f9516edd-adbe-4406-90f2-f967bb52fdf0" />

### PACS_lite [pæks lajt] adds the following features to CorpusSearch 2 (but unlike PACS is not dependent on a particular MAC architecture):

- queries results are displayed in a web browser
- nodes in results trees can be color coded 
- before the SUMMARY, every hit is repeated, showing only the queried nodes
- texts in the SUMMARY with hits are highlighted yellow 
- a window in PACS can strip lemmata from results sentences
- another window in PACS can give a numerical summary of hits per time bin

PACS_lite was built in the Mac framework. See the bottom of this document for making it compatible with Windows.

###	Prerequisites
a.	CorpusSearch2 (CS2) https://corpussearch.sourceforge.net/CS.html

 -	CS2 requires Java.

### Getting Started
a.	Copying the Files

 -	Download the PACS_lite02 folder onto your local machine.

 -	Copy the files of the corpus you wish to search into a folder called "corpus" inside the PACS folder.

b.	Specify the directory in PACS_lite.app (or see last bullet below)

 -	Open Automator and click Open an Existing Document…

 -	Select PACS_lite.app

 - Change the directory (highlighted in this image) to your directory:
   
<img width="148" height="88" alt="image" src="https://github.com/user-attachments/assets/7a1847c7-25b3-40c2-bef0-451c13bf05a9" />


 -	Save and close Automator.

 -	Note that if you move the PACS_lite folder, you will need to repeat these steps.

 -	If you do not wish to use Automator, you can of course simply execute the script through Terminal: cd files | bash PACS_lite

c.	Specify the file extensions to search

 -	PACS_lite searches .txt by default. If your corpus files have a different extension (such as .psd), you must either:
1.	Change the extensions to .txt.
2.	Open the files folder and open the file search in TextEdit. Locate this line and change .txt (highlighted in this image) at the end to match the file types of your corpus (likely either .txt or .psd):
 <img width="329" height="20" alt="image" src="https://github.com/user-attachments/assets/48518662-3c73-4782-bd47-be717bd0403e" />

 -	Save and close search

d.	Set up PACS_lite

 - Open Terminal and change directory to PACS_lite02/files
 - enter `bash setup`. If successful, you'll see "Setup complete."

###	Running PACS_lite
a.	Double-click PACS_lite.app. This creates a server and opens PACS_lite in Chrome. Depending on your system, it may attempt to open the file in Chrome before the server is created. If it doesn’t load after a few seconds, refresh the page.

b. 	Enter your query into the **Query** box and click `Search`.

1.	To color-code your results, add e.g. {1}. Note that curly brackets precede square brackets, hence the reminder in the default text.

2.	For example, this query will show all dative adjectives inside direct objects:
   
      `query: ({1}NP-OB1 idoms {2}ADJ^D*)`

3.	To color-code a leaf, add e.g. 3leaf at the end of the query:
   
      `query: ({1}NP-OB1 idoms {2}ADJ^D*)`

      `AND (ADJ^D* idoms {3}.*)`

      `3leaf`

c.	The results of the query are displayed in the large frame. At the bottom, the hits are listed and the texts containing hits are highlighted.

d.	The Save button saves the query results currently displayed in the large frame.

e.	The button Exit kills the server and deletes session files. Some functionality of PACS_lite is still available after the server is killed. For full functionality, Double-click PACS_lite.app again.

f.	Below the Query box is a small **Time Bin** box with the default “50” for “50-year time bin” and the button Summary next to it. Clicking on that will cause a window to appear containing the hits per time bin. This function works only if the file names begin with year numbers.

g.	To create an unlemmatized copy of a result, first copy the prose sentence into the **De-Lemmatizer** box, then click the “Show” button. In the small box beside the button, you can change how lemmata are indicated. (IcePaHC lemmatizes with “-”; IPCHG lemmatizes with “=”.) A window will appear with the unlemmatized sentence.

h.	The **Mini-Terminal** box reports messages from PACS_lite (and CorpusSearch2). It is similar to the messages seen in Terminal.


###	For Windows
a.	Change 1:

-  Open the files folder and open the file PACS_lite in Notepad.
  
-  Move the comment character # from the bottom line to the previous line, such that

 <img width="404" height="28" alt="image" src="https://github.com/user-attachments/assets/a51934fc-4c73-42f0-b5e7-78c3187a83eb" />
 
changes to

<img width="402" height="26" alt="image" src="https://github.com/user-attachments/assets/dbf212aa-f3b3-4b73-a661-e074f6a432eb" />
 
b.	Change 2:

-  Create a new file in Notepad with these three lines:
  
`@echo off`

`cmd /c bash files/PACS_lite`

`pause`

-  Save the file as a .cmd (such as PACS_lite.cmd).

c.	Change 3:
-  Download CS_2.003.04.jar from https://sourceforge.net/projects/corpussearch/ and put that file in PACS_lite/corpus.

d.	To run PACS_lite (equivalent to the Mac user double-clicking PACS_lite.app), double click your .cmd file.
